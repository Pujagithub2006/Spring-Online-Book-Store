import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BookCard from '../components/BookCard';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck, Truck, Headphones, Star, TrendingUp } from 'lucide-react';

export default function Home({ onNavigate, onSelectBook }) {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await api.getFeaturedBooks();
        setFeaturedBooks(data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured books:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const categories = [
    { name: 'Technology', count: '45+ Titles', icon: '💻' },
    { name: 'Science Fiction', count: '38+ Titles', icon: '🚀' },
    { name: 'Self-Help', count: '52+ Titles', icon: '🌱' },
    { name: 'Finance', count: '29+ Titles', icon: '📈' },
    { name: 'Fiction', count: '64+ Titles', icon: '✨' },
    { name: 'Mystery & Thriller', count: '30+ Titles', icon: '🔍' },
  ];

  const testimonials = [
    {
      name: 'Sophia Reynolds',
      role: 'Avid Reader & Designer',
      comment: 'LuminaBooks has revolutionized my reading journey. The curation is impeccable, and deliveries arrive crisp and fast!',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Software Architect',
      comment: 'Finding genuine software engineering classics with instant dispatch was never this smooth. Beautiful UI and experience.',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Literary Critic',
      comment: 'The best bookstore experience on the modern web. Every recommendation is spot on and customer care is extraordinary.',
      rating: 5,
    },
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="text-primary" />
              <span>Over 10,000+ Curated Titles Available</span>
            </div>

            <h1 className="hero-title">
              Expand Your Universe, <br />
              <span className="gradient-text">One Page at a Time.</span>
            </h1>

            <p className="hero-subtitle">
              Dive into our handpicked collection of timeless classics, groundbreaking non-fiction, 
              and contemporary bestsellers designed to spark your curiosity.
            </p>

            <div className="hero-cta-group">
              <button className="btn btn-primary hero-btn" onClick={() => onNavigate('catalogue')}>
                <span>Browse Full Catalogue</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-secondary hero-btn" onClick={() => onNavigate('catalogue')}>
                View Bestsellers
              </button>
            </div>

            {/* Micro Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Readers</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Reader Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Original Prints</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / 3D Book Showcase */}
          <div className="hero-visual">
            <div className="hero-card-floating glass-card animate-float">
              <div className="hero-book-preview">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" 
                  alt="Featured Book Showcase"
                  className="hero-book-img"
                />
                <div className="floating-badge-top">
                  <Star size={14} className="star-icon filled" />
                  <span>Editor's Pick</span>
                </div>
                <div className="floating-card-bottom glass-card">
                  <div className="preview-book-info">
                    <h4>The Pragmatic Programmer</h4>
                    <p>David Thomas & Andrew Hunt</p>
                  </div>
                  <div className="preview-price">$49.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-wrap">
                <Truck size={24} />
              </div>
              <h4>Express Free Shipping</h4>
              <p>Lightning-fast global dispatch with tracked express packaging on every order.</p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrap">
                <ShieldCheck size={24} />
              </div>
              <h4>100% Genuine Editions</h4>
              <p>Direct authentic prints certified directly from verified global publishers.</p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrap">
                <BookOpen size={24} />
              </div>
              <h4>Curated Collections</h4>
              <p>Hand-selected titles crafted by experienced literary critics and scholars.</p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-wrap">
                <Headphones size={24} />
              </div>
              <h4>24/7 Dedicated Support</h4>
              <p>Friendly expert support ready to assist with orders, tracking, and advice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag">
                <TrendingUp size={15} /> Trending Now
              </div>
              <h2 className="section-title">Featured Bestsellers</h2>
              <p className="section-desc">The most celebrated and captivating reads of this season.</p>
            </div>

            <button className="btn btn-secondary view-all-btn" onClick={() => onNavigate('catalogue')}>
              Explore All Books <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="loading-spinner-container">
              <div className="spinner"></div>
              <p>Loading handpicked books...</p>
            </div>
          ) : (
            <div className="grid-responsive">
              {featuredBooks.map(book => (
                <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="categories-section">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="section-title">Explore by Genre</h2>
            <p className="section-desc">Find precisely what stimulates your mind and imagination.</p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="category-card glass-card"
                onClick={() => onNavigate('catalogue', cat.name)}
              >
                <div className="category-emoji">{cat.icon}</div>
                <h3 className="category-name">{cat.name}</h3>
                <span className="category-count">{cat.count}</span>
                <span className="category-arrow"><ArrowRight size={16} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reader Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="section-title">Loved by Avid Readers Everywhere</h2>
            <p className="section-desc">Hear what our worldwide community of book lovers has to say.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card glass-card">
                <div className="test-stars">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon filled" />
                  ))}
                </div>
                <p className="test-comment">"{test.comment}"</p>
                <div className="test-user">
                  <div className="test-avatar">{test.name.charAt(0)}</div>
                  <div>
                    <h4 className="test-name">{test.name}</h4>
                    <span className="test-role">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card glass-card">
            <div className="newsletter-content">
              <h3>Join the Lumina Reader's Club</h3>
              <p>Receive weekly literary recommendations, author interviews, and exclusive 20% discounts.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to LuminaBooks newsletter!'); }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input" 
                required 
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
