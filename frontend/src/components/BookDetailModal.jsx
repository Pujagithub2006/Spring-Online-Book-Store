import React, { useState } from 'react';
import { X, Star, ShoppingBag, CheckCircle, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BookDetailModal({ book, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!book) return null;

  const handleAddToCart = () => {
    addToCart(book, quantity);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-grid">
          {/* Cover image container */}
          <div className="modal-image-col">
            <div className="modal-cover-wrapper">
              <img 
                src={book.coverImageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'} 
                alt={book.title} 
                className="modal-cover-img"
              />
            </div>
            {book.stockQuantity > 0 ? (
              <div className="stock-pill in-stock">
                <CheckCircle size={15} /> In Stock ({book.stockQuantity} copies)
              </div>
            ) : (
              <div className="stock-pill out-of-stock">
                Out of Stock
              </div>
            )}
          </div>

          {/* Details column */}
          <div className="modal-info-col">
            <div className="modal-badge-row">
              <span className="badge badge-primary">{book.category}</span>
              {book.publicationYear && (
                <span className="badge badge-warning">Published {book.publicationYear}</span>
              )}
            </div>

            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by <strong>{book.author}</strong></p>

            <div className="modal-rating-row">
              <div className="stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`star-icon ${i < Math.floor(book.rating || 5) ? 'filled' : ''}`} 
                  />
                ))}
              </div>
              <span className="rating-score">{book.rating ? book.rating.toFixed(1) : '4.8'} / 5.0</span>
              <span className="dot-divider">•</span>
              <span className="isbn-tag">ISBN: {book.isbn || '978-0132350884'}</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">${book.price ? book.price.toFixed(2) : '19.99'}</span>
              <span className="free-ship-tag"><Truck size={14} /> Free Express Delivery</span>
            </div>

            <div className="modal-description">
              <h4>Overview</h4>
              <p>{book.description || "An extraordinary literary achievement offering profound insights, elegant writing, and captivating storytelling that resonates with readers across the world."}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="modal-actions-box">
              <div className="quantity-selector">
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => setQuantity(Math.min(book.stockQuantity || 10, quantity + 1))}
                >
                  +
                </button>
              </div>

              <button 
                className="btn btn-primary modal-add-btn" 
                onClick={handleAddToCart}
                disabled={book.stockQuantity <= 0}
              >
                <ShoppingBag size={18} />
                <span>Add {quantity} to Cart • ${(book.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Perks */}
            <div className="modal-perks">
              <div className="perk-item">
                <ShieldCheck size={16} /> 100% Genuine Print
              </div>
              <div className="perk-item">
                <RotateCcw size={16} /> 30-Day Easy Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
