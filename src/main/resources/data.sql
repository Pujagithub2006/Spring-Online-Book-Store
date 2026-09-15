-- ==========================================================
-- Online Book Store - Seed Data (MySQL)
-- ==========================================================

USE `bookstore_db`;

-- Users
INSERT IGNORE INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `address`, `role`) VALUES
(1, 'Admin User', 'admin@bookstore.com', 'admin123', '+1 555-0199', '42 Silicon Valley Blvd, CA', 'ADMIN'),
(2, 'Alex Morgan', 'alex@example.com', 'password123', '+1 555-0142', '742 Evergreen Terrace, Springfield', 'CUSTOMER');

-- Books
INSERT IGNORE INTO `books` (`id`, `title`, `author`, `isbn`, `description`, `price`, `category`, `cover_image_url`, `stock_quantity`, `rating`, `publication_year`, `featured`) VALUES
(1, 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', '978-0132350884', 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees.', 42.99, 'Technology', 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80', 35, 4.8, 2008, TRUE),
(2, 'The Pragmatic Programmer: Your Journey to Mastery', 'David Thomas & Andrew Hunt', '978-0135957059', 'Examines the core of modern software development, covering career development and architecture.', 49.50, 'Technology', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', 28, 4.9, 2019, TRUE),
(3, 'Atomic Habits: An Easy & Proven Way to Build Good Habits', 'James Clear', '978-0735211292', 'Practical strategies that teach you exactly how to form good habits, break bad ones, and master tiny behaviors.', 18.99, 'Self-Help', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80', 60, 4.9, 2018, TRUE),
(4, 'Project Hail Mary', 'Andy Weir', '978-0593135204', 'Ryland Grace is the sole survivor on a desperate, last-chance mission—an interstellar journey of science and suspense.', 22.50, 'Science Fiction', 'https://images.unsplash.com/photo-1618609377864-68609b857e90?auto=format&fit=crop&w=600&q=80', 40, 4.9, 2021, TRUE),
(5, 'Dune: The Graphic Novel & Epic Saga', 'Frank Herbert', '978-0441172719', 'Set on the desert planet Arrakis, Dune is the story of Paul Atreides who will inherit a destiny beyond imagination.', 24.99, 'Science Fiction', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80', 30, 4.7, 1965, FALSE),
(6, 'The Psychology of Money', 'Morgan Housel', '978-0857197689', 'Timeless lessons on wealth, greed, and happiness doing well with money is about how you behave.', 19.95, 'Finance', 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80', 45, 4.8, 2020, TRUE),
(7, 'The Silent Patient', 'Alex Michaelides', '978-1250301696', 'A woman\'s act of violence against her husband, and the therapist obsessed with uncovering her motive.', 17.99, 'Mystery & Thriller', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80', 38, 4.6, 2019, FALSE),
(8, 'The Midnight Library', 'Matt Haig', '978-0525559474', 'Between life and death there is a library where every book offers a chance to try another life.', 16.50, 'Fiction', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80', 50, 4.5, 2020, TRUE);
