import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookCard({ book, onSelectBook }) {
  const { addToCart } = useCart();

  return (
    <div className="book-card glass-card">
      <div className="book-cover-container" onClick={() => onSelectBook(book)}>
        <img 
          src={book.coverImageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=80'} 
          alt={book.title}
          className="book-cover-img"
          loading="lazy"
        />
        <div className="book-overlay">
          <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); onSelectBook(book); }}>
            <Eye size={18} /> Quick View
          </button>
        </div>
        {book.featured && <span className="featured-ribbon">Bestseller</span>}
      </div>

      <div className="book-card-body">
        <div className="book-meta-top">
          <span className="badge badge-primary">{book.category}</span>
          <div className="book-rating">
            <Star size={14} className="star-icon filled" />
            <span>{book.rating ? book.rating.toFixed(1) : '4.5'}</span>
          </div>
        </div>

        <h3 className="book-title" title={book.title} onClick={() => onSelectBook(book)}>
          {book.title}
        </h3>
        <p className="book-author">by {book.author}</p>

        <div className="book-card-footer">
          <div className="book-price-box">
            <span className="currency">$</span>
            <span className="amount">{book.price ? book.price.toFixed(2) : '19.99'}</span>
          </div>

          <button 
            className="btn btn-primary add-cart-btn"
            onClick={() => addToCart(book, 1)}
            disabled={book.stockQuantity <= 0}
            title={book.stockQuantity <= 0 ? "Out of Stock" : "Add to Cart"}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
