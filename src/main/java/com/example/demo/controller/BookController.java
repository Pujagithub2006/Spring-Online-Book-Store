package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Book>>> getAllBooks(@RequestParam(required = false) String category) {
        List<Book> books;
        if (category != null && !category.isBlank() && !"all".equalsIgnoreCase(category)) {
            books = bookService.getBooksByCategory(category);
        } else {
            books = bookService.getAllBooks();
        }
        return ResponseEntity.ok(ApiResponse.success("Books retrieved successfully", books));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(ApiResponse.success("Book retrieved successfully", book));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Book>>> getFeaturedBooks() {
        List<Book> books = bookService.getFeaturedBooks();
        return ResponseEntity.ok(ApiResponse.success("Featured books retrieved", books));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = bookService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success("Categories retrieved", categories));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Book>>> searchBooks(@RequestParam String query) {
        List<Book> books = bookService.searchBooks(query);
        return ResponseEntity.ok(ApiResponse.success("Search results retrieved", books));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Book>> createBook(@RequestBody Book book) {
        Book savedBook = bookService.saveBook(book);
        return new ResponseEntity<>(ApiResponse.success("Book created successfully", savedBook), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok(ApiResponse.success("Book deleted successfully", null));
    }
}
