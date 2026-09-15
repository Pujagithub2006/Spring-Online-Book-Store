package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(unique = true)
    private String isbn;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String category;

    @Column(length = 1000)
    private String coverImageUrl;

    @Builder.Default
    private Integer stockQuantity = 50;

    @Builder.Default
    private Double rating = 4.5;

    private Integer publicationYear;

    @Builder.Default
    private Boolean featured = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
