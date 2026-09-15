import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import BookDetailModal from './components/BookDetailModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import './App.css';

function MainApp() {
  const [currentTab, setCurrentTab] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleNavigate = (tab, category = 'All') => {
    setCurrentTab(tab);
    setCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      {/* Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Routed Content */}
      <main className="main-content">
        {currentTab === 'home' && (
          <Home 
            onNavigate={handleNavigate} 
            onSelectBook={setSelectedBook} 
          />
        )}

        {currentTab === 'catalogue' && (
          <Catalogue 
            initialCategory={categoryFilter} 
            onSelectBook={setSelectedBook} 
          />
        )}

        {currentTab === 'login' && (
          <Login onNavigate={handleNavigate} />
        )}

        {currentTab === 'register' && (
          <Register onNavigate={handleNavigate} />
        )}

        {currentTab === 'orders' && (
          <Orders onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}

      {/* Global Cart Slide-Over Drawer */}
      <CartDrawer 
        onNavigateToAuth={(tab) => handleNavigate(tab)}
        onNavigateToOrders={() => handleNavigate('orders')}
      />

      {/* Dynamic Toast Alerts */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
