package com.example.demo.config;

import com.example.demo.model.Book;
import com.example.demo.model.User;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        // Seed users if none exist
        if (userRepository.count() == 0) {
            log.info("Seeding initial users...");
            User admin = User.builder()
                    .fullName("Admin User")
                    .email("admin@bookstore.com")
                    .password("admin123")
                    .phone("+1 555-0199")
                    .address("42 Silicon Valley Blvd, CA")
                    .role("ADMIN")
                    .createdAt(LocalDateTime.now())
                    .build();

            User customer = User.builder()
                    .fullName("Alex Morgan")
                    .email("alex@example.com")
                    .password("password123")
                    .phone("+1 555-0142")
                    .address("742 Evergreen Terrace, Springfield")
                    .role("CUSTOMER")
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.saveAll(Arrays.asList(admin, customer));
        }

        // Seed books if none exist
        if (bookRepository.count() == 0) {
            log.info("Seeding curated books collection...");
            List<Book> books = Arrays.asList(
                    Book.builder()
                            .title("Clean Code: A Handbook of Agile Software Craftsmanship")
                            .author("Robert C. Martin")
                            .isbn("978-0132350884")
                            .category("Technology")
                            .price(42.99)
                            .stockQuantity(35)
                            .rating(4.8)
                            .publicationYear(2008)
                            .featured(true)
                            .description("Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. This classic guide teaches you how to write software that is elegant and maintainable.")
                            .coverImageUrl("https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("The Pragmatic Programmer: Your Journey to Mastery")
                            .author("David Thomas & Andrew Hunt")
                            .isbn("978-0135957059")
                            .category("Technology")
                            .price(49.50)
                            .stockQuantity(28)
                            .rating(4.9)
                            .publicationYear(2019)
                            .featured(true)
                            .description("One of the most significant books in computer science. Examines the core of modern software development, covering career development, architectural choices, and responsibility.")
                            .coverImageUrl("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Atomic Habits: An Easy & Proven Way to Build Good Habits")
                            .author("James Clear")
                            .isbn("978-0735211292")
                            .category("Self-Help")
                            .price(18.99)
                            .stockQuantity(60)
                            .rating(4.9)
                            .publicationYear(2018)
                            .featured(true)
                            .description("No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies to form good habits and break bad ones.")
                            .coverImageUrl("https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Project Hail Mary")
                            .author("Andy Weir")
                            .isbn("978-0593135204")
                            .category("Science Fiction")
                            .price(22.50)
                            .stockQuantity(40)
                            .rating(4.9)
                            .publicationYear(2021)
                            .featured(true)
                            .description("Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself are doomed. An interstellar adventure of science and friendship.")
                            .coverImageUrl("https://images.unsplash.com/photo-1618609377864-68609b857e90?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Dune: The Graphic Novel & Epic Saga")
                            .author("Frank Herbert")
                            .isbn("978-0441172719")
                            .category("Science Fiction")
                            .price(24.99)
                            .stockQuantity(30)
                            .rating(4.7)
                            .publicationYear(1965)
                            .featured(false)
                            .description("Set on the desert planet Arrakis, Dune is the story of Paul Atreides—who will inherit a destiny far grander than he could have ever imagined amid politics, spice, and giant sandworms.")
                            .coverImageUrl("https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Design Patterns: Elements of Reusable Object-Oriented Software")
                            .author("Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides")
                            .isbn("978-0201633610")
                            .category("Technology")
                            .price(54.00)
                            .stockQuantity(15)
                            .rating(4.8)
                            .publicationYear(1994)
                            .featured(false)
                            .description("Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring problems.")
                            .coverImageUrl("https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("The Psychology of Money")
                            .author("Morgan Housel")
                            .isbn("978-0857197689")
                            .category("Finance")
                            .price(19.95)
                            .stockQuantity(45)
                            .rating(4.8)
                            .publicationYear(2020)
                            .featured(true)
                            .description("Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.")
                            .coverImageUrl("https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("The Silent Patient")
                            .author("Alex Michaelides")
                            .isbn("978-1250301696")
                            .category("Mystery & Thriller")
                            .price(17.99)
                            .stockQuantity(38)
                            .rating(4.6)
                            .publicationYear(2019)
                            .featured(false)
                            .description("Alicia Berenson's life is seemingly perfect. Then, one evening, she shoots her husband five times in the face and never speaks another word. Theo Faber is determined to unravel the mystery.")
                            .coverImageUrl("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("The Midnight Library")
                            .author("Matt Haig")
                            .isbn("978-0525559474")
                            .category("Fiction")
                            .price(16.50)
                            .stockQuantity(50)
                            .rating(4.5)
                            .publicationYear(2020)
                            .featured(true)
                            .description("Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.")
                            .coverImageUrl("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Thinking, Fast and Slow")
                            .author("Daniel Kahneman")
                            .isbn("978-0374533557")
                            .category("Psychology")
                            .price(21.00)
                            .stockQuantity(25)
                            .rating(4.7)
                            .publicationYear(2011)
                            .featured(false)
                            .description("Nobel Prize winner Daniel Kahneman takes us on an intellectual journey explaining the two systems that drive the way we think: fast intuitive thinking, and slow deliberate thinking.")
                            .coverImageUrl("https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Sapiens: A Brief History of Humankind")
                            .author("Yuval Noah Harari")
                            .isbn("978-0062316097")
                            .category("History")
                            .price(23.99)
                            .stockQuantity(40)
                            .rating(4.8)
                            .publicationYear(2014)
                            .featured(false)
                            .description("From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us.")
                            .coverImageUrl("https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80")
                            .build(),

                    Book.builder()
                            .title("Deep Work: Rules for Focused Success in a Distracted World")
                            .author("Cal Newport")
                            .isbn("978-1455586691")
                            .category("Self-Help")
                            .price(18.50)
                            .stockQuantity(30)
                            .rating(4.7)
                            .publicationYear(2016)
                            .featured(false)
                            .description("Deep work is the ability to focus without distraction on a cognitively demanding task. A guide on cultivating a deep work habit in an age of constant connectivity.")
                            .coverImageUrl("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80")
                            .build()
            );

            bookRepository.saveAll(books);
            log.info("Successfully seeded {} books.", books.size());
        }
    }
}
