import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import BookCard from '../components/BookCard';
import { Search, Filter, SlidersHorizontal, BookX, Sparkles } from 'lucide-react';

export default function Catalogue({ initialCategory, onSelectBook }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [booksData, catsData] = await Promise.all([
          api.getBooks(),
          api.getCategories()
        ]);
        setBooks(booksData);
        setCategories(['All', ...catsData]);
      } catch (err) {
        console.error('Failed to load catalogue data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter and sort computation
  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(book => 
        book.category && book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(book =>
        (book.title && book.title.toLowerCase().includes(q)) ||
        (book.author && book.author.toLowerCase().includes(q)) ||
        (book.category && book.category.toLowerCase().includes(q)) ||
        (book.isbn && book.isbn.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [books, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="catalogue-page animate-fade-in">
      {/* Catalogue Header */}
      <section className="catalogue-header-section">
        <div className="container">
          <div className="catalogue-header-content">
            <span className="badge badge-primary mb-2">Book Collection</span>
            <h1 className="catalogue-title">Explore Our Curated Library</h1>
            <p className="catalogue-desc">
              Browse our comprehensive collection across computer science, literature, science fiction, personal finance, and beyond.
            </p>

            {/* Search and Control Bar */}
            <div className="search-control-bar glass-card">
              <div className="search-input-wrap">
                <Search className="search-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Search books by title, author, category, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="catalogue-search-input"
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                    Clear
                  </button>
                )}
              </div>

              <div className="sort-control-wrap">
                <SlidersHorizontal size={18} className="sort-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="featured">Featured / Bestsellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="category-pills-scroll">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`category-pill ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Main Content */}
      <section className="catalogue-grid-section">
        <div className="container">
          <div className="catalogue-status-bar">
            <span className="results-count">
              Showing <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'book' : 'books'}
              {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
            </span>
            {searchQuery && (
              <span className="search-query-indicator">
                matching "{searchQuery}"
              </span>
            )}
          </div>

          {loading ? (
            <div className="loading-spinner-container">
              <div className="spinner"></div>
              <p>Fetching book catalog from Spring Boot...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="catalogue-empty-state glass-card">
              <div className="empty-icon-wrap">
                <BookX size={48} />
              </div>
              <h3>No Books Found</h3>
              <p>We couldn't find any books matching your search or category filters.</p>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid-responsive">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
