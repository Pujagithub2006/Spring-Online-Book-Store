const API_BASE_URL = 'http://localhost:8080/api';

// Realistic fallback books in case backend is starting or offline
const FALLBACK_BOOKS = [
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Technology",
    price: 42.99,
    stockQuantity: 35,
    rating: 4.8,
    publicationYear: 2008,
    featured: true,
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Learn how to write maintainable code.",
    coverImageUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas & Andrew Hunt",
    isbn: "978-0135957059",
    category: "Technology",
    price: 49.50,
    stockQuantity: 28,
    rating: 4.9,
    publicationYear: 2019,
    featured: true,
    description: "Examines the core of modern software development, covering personal responsibility and career development to architectural techniques.",
    coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    category: "Self-Help",
    price: 18.99,
    stockQuantity: 60,
    rating: 4.9,
    publicationYear: 2018,
    featured: true,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day with practical strategies for lasting habit formation.",
    coverImageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn: "978-0593135204",
    category: "Science Fiction",
    price: 22.50,
    stockQuantity: 40,
    rating: 4.9,
    publicationYear: 2021,
    featured: true,
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself are doomed.",
    coverImageUrl: "https://images.unsplash.com/photo-1618609377864-68609b857e90?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Dune: The Graphic Novel & Epic Saga",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    category: "Science Fiction",
    price: 24.99,
    stockQuantity: 30,
    rating: 4.7,
    publicationYear: 1965,
    featured: false,
    description: "Set on the desert planet Arrakis, Dune is the story of Paul Atreides who will inherit a destiny far grander than he could have ever imagined.",
    coverImageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    isbn: "978-0857197689",
    category: "Finance",
    price: 19.95,
    stockQuantity: 45,
    rating: 4.8,
    publicationYear: 2020,
    featured: true,
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave with wealth, greed, and risk.",
    coverImageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "978-1250301696",
    category: "Mystery & Thriller",
    price: 17.99,
    stockQuantity: 38,
    rating: 4.6,
    publicationYear: 2019,
    featured: false,
    description: "Alicia Berenson shoots her husband five times in the face and never speaks another word. Theo Faber seeks to unravel her silence.",
    coverImageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-0525559474",
    category: "Fiction",
    price: 16.50,
    stockQuantity: 50,
    rating: 4.5,
    publicationYear: 2020,
    featured: true,
    description: "Between life and death there is a library where every book provides a chance to try another life you could have lived.",
    coverImageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"
  }
];

async function handleRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || 'Server error occurred');
    }
    return data.data !== undefined ? data.data : data;
  } catch (error) {
    console.warn(`API request to ${url} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Books API
  async getBooks(category) {
    try {
      const url = category && category !== 'All' 
        ? `${API_BASE_URL}/books?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/books`;
      return await handleRequest(url);
    } catch {
      let books = FALLBACK_BOOKS;
      if (category && category !== 'All') {
        books = books.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }
      return books;
    }
  },

  async getBookById(id) {
    try {
      return await handleRequest(`${API_BASE_URL}/books/${id}`);
    } catch {
      return FALLBACK_BOOKS.find(b => b.id === Number(id)) || null;
    }
  },

  async getFeaturedBooks() {
    try {
      return await handleRequest(`${API_BASE_URL}/books/featured`);
    } catch {
      return FALLBACK_BOOKS.filter(b => b.featured);
    }
  },

  async getCategories() {
    try {
      return await handleRequest(`${API_BASE_URL}/books/categories`);
    } catch {
      return ['Technology', 'Science Fiction', 'Self-Help', 'Finance', 'Fiction', 'Mystery & Thriller'];
    }
  },

  async searchBooks(query) {
    try {
      return await handleRequest(`${API_BASE_URL}/books/search?query=${encodeURIComponent(query)}`);
    } catch {
      const q = query.toLowerCase();
      return FALLBACK_BOOKS.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        (b.isbn && b.isbn.toLowerCase().includes(q))
      );
    }
  },

  // Auth API
  async login(email, password) {
    try {
      return await handleRequest(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      // Offline fallback mock demo check
      if (email.toLowerCase() === 'alex@example.com' && password === 'password123') {
        return {
          id: 2,
          fullName: 'Alex Morgan',
          email: 'alex@example.com',
          role: 'CUSTOMER',
          address: '742 Evergreen Terrace, Springfield',
          phone: '+1 555-0142',
          token: 'mock-session-alex'
        };
      }
      throw err;
    }
  },

  async register(userData) {
    try {
      return await handleRequest(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (err) {
      throw err;
    }
  },

  // Orders API
  async placeOrder(orderData) {
    try {
      return await handleRequest(`${API_BASE_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    } catch {
      // Mock order creation when offline
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        orderNumber: 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        totalAmount: orderData.totalAmount || 49.99,
        status: 'PLACED',
        orderDate: new Date().toISOString(),
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod || 'Credit Card'
      };
    }
  },

  async getUserOrders(userId) {
    try {
      return await handleRequest(`${API_BASE_URL}/orders/user/${userId}`);
    } catch {
      return [];
    }
  }
};
