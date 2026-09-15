import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { BookOpen, ShoppingBag, User, LogOut, Menu, X, Sparkles, BookMarked } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab }) {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div className="navbar-logo" onClick={() => handleNav('home')}>
          <div className="logo-icon-wrap">
            <BookOpen className="logo-icon" size={22} />
          </div>
          <span className="logo-text">
            Lumina<span className="gradient-text">Books</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button 
            className={`nav-link ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${currentTab === 'catalogue' ? 'active' : ''}`}
            onClick={() => handleNav('catalogue')}
          >
            <BookMarked size={17} />
            Catalogue
          </button>
          {user && (
            <button 
              className={`nav-link ${currentTab === 'orders' ? 'active' : ''}`}
              onClick={() => handleNav('orders')}
            >
              My Orders
            </button>
          )}
        </nav>

        {/* Right Actions: Cart & Auth */}
        <div className="navbar-actions">
          <button 
            className="cart-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {user ? (
            <div className="user-pill">
              <div className="user-avatar">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.fullName.split(' ')[0]}</span>
              <button 
                className="logout-icon-btn" 
                onClick={logout}
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className={`btn btn-secondary auth-nav-btn ${currentTab === 'login' ? 'active' : ''}`}
                onClick={() => handleNav('login')}
              >
                Sign In
              </button>
              <button 
                className={`btn btn-primary auth-nav-btn ${currentTab === 'register' ? 'active' : ''}`}
                onClick={() => handleNav('register')}
              >
                Join Free
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer glass-card animate-fade-in">
          <button 
            className={`mobile-nav-item ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home')}
          >
            Home
          </button>
          <button 
            className={`mobile-nav-item ${currentTab === 'catalogue' ? 'active' : ''}`}
            onClick={() => handleNav('catalogue')}
          >
            Browse Catalogue
          </button>
          {user && (
            <button 
              className={`mobile-nav-item ${currentTab === 'orders' ? 'active' : ''}`}
              onClick={() => handleNav('orders')}
            >
              My Orders
            </button>
          )}

          <div className="mobile-auth-section">
            {user ? (
              <button className="btn btn-secondary w-full" onClick={logout}>
                <LogOut size={16} /> Sign Out ({user.fullName})
              </button>
            ) : (
              <div className="mobile-auth-grid">
                <button className="btn btn-secondary" onClick={() => handleNav('login')}>
                  Sign In
                </button>
                <button className="btn btn-primary" onClick={() => handleNav('register')}>
                  Join Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
