package com.example.demo.service;

import com.example.demo.dto.OrderItemRequest;
import com.example.demo.dto.OrderRequest;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Book;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.model.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Transactional
    public Order createOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Order must have at least one book item.");
        }

        Order order = Order.builder()
                .orderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(user)
                .orderDate(LocalDateTime.now())
                .status("PLACED")
                .shippingAddress(request.getShippingAddress() != null && !request.getShippingAddress().isBlank() 
                        ? request.getShippingAddress() 
                        : user.getAddress())
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "Credit Card")
                .items(new ArrayList<>())
                .totalAmount(0.0)
                .build();

        double total = 0.0;

        for (OrderItemRequest itemReq : request.getItems()) {
            Book book = bookRepository.findById(itemReq.getBookId())
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + itemReq.getBookId()));

            if (book.getStockQuantity() < itemReq.getQuantity()) {
                throw new BadRequestException("Insufficient stock for book: " + book.getTitle() + " (Available: " + book.getStockQuantity() + ")");
            }

            // Deduct stock
            book.setStockQuantity(book.getStockQuantity() - itemReq.getQuantity());
            bookRepository.save(book);

            double subtotal = book.getPrice() * itemReq.getQuantity();
            total += subtotal;

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .book(book)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(book.getPrice())
                    .subtotal(subtotal)
                    .build();

            order.getItems().add(orderItem);
        }

        order.setTotalAmount(Math.round(total * 100.0) / 100.0);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
    }
}
