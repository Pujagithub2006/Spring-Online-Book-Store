import React from 'react';
import { BookOpen, Heart, Globe, Share2, Send, Mail } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="main-footer">
      <div className="container footer-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="footer-logo" onClick={() => onNavigate('home')}>
              <div className="logo-icon-wrap">
                <BookOpen size={20} />
              </div>
              <span className="logo-text">
                Lumina<span className="gradient-text">Books</span>
              </span>
            </div>
            <p className="footer-tagline">
              Curating exceptional reading experiences. A modern full-stack web application powered by React, Spring Boot, and MySQL.
            </p>
            <div className="footer-social-links">
              <a href="#globe" className="social-icon" aria-label="Website"><Globe size={18} /></a>
              <a href="#share" className="social-icon" aria-label="Community"><Share2 size={18} /></a>
              <a href="#send" className="social-icon" aria-label="Telegram"><Send size={18} /></a>
              <a href="#mail" className="social-icon" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('home')}>Home</button></li>
              <li><button onClick={() => onNavigate('catalogue')}>All Books</button></li>
              <li><button onClick={() => onNavigate('catalogue', 'Technology')}>Tech & Coding</button></li>
              <li><button onClick={() => onNavigate('catalogue', 'Science Fiction')}>Science Fiction</button></li>
              <li><button onClick={() => onNavigate('catalogue', 'Self-Help')}>Self Improvement</button></li>
            </ul>
          </div>

          {/* Account */}
          <div className="footer-col">
            <h4 className="footer-heading">Account & Orders</h4>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('login')}>Sign In</button></li>
              <li><button onClick={() => onNavigate('register')}>Register</button></li>
              <li><button onClick={() => onNavigate('orders')}>My Order History</button></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Tech Stack Badge */}
          <div className="footer-col">
            <h4 className="footer-heading">Architecture</h4>
            <div className="tech-stack-badges">
              <span className="tech-badge">React 18</span>
              <span className="tech-badge">Spring Boot 3/4</span>
              <span className="tech-badge">MySQL Database</span>
              <span className="tech-badge">Spring Data JPA</span>
              <span className="tech-badge">RESTful APIs</span>
              <span className="tech-badge">Vite</span>
            </div>
            <p className="tech-desc">
              Designed with responsive glassmorphism, responsive grids, and enterprise REST architectural principles.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LuminaBooks. All rights reserved.</p>
          <p className="built-with">
            Crafted with <Heart size={14} className="text-rose-500 fill-rose-500 inline" /> for Web Technology Project Submission
          </p>
        </div>
      </div>
    </footer>
  );
}
