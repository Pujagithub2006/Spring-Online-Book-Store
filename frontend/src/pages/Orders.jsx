import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Package, Clock, MapPin, CreditCard, ChevronRight, BookOpen } from 'lucide-react';

export default function Orders({ onNavigate }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      try {
        const data = await api.getUserOrders(user.id);
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="orders-page container animate-fade-in text-center py-20">
        <div className="glass-card auth-prompt-box">
          <Package size={48} className="text-primary mb-3 mx-auto" />
          <h2>Please Sign In</h2>
          <p className="text-secondary mb-6">You must be logged in to view your past orders and tracking.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('login')}>
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page container animate-fade-in py-10">
      <div className="page-header mb-8">
        <span className="badge badge-primary mb-2">Order History</span>
        <h1 className="text-3xl font-bold">My Purchased Books & Orders</h1>
        <p className="text-secondary">Track live delivery status and view detailed invoices.</p>
      </div>

      {loading ? (
        <div className="loading-spinner-container">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="glass-card empty-orders-card text-center py-16">
          <Package size={54} className="empty-cart-icon mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">No Orders Placed Yet</h3>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            You haven't purchased any books yet. Explore our bestsellers and find your next favorite read!
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('catalogue')}>
            Browse Books
          </button>
        </div>
      ) : (
        <div className="orders-list-wrapper">
          {orders.map((order) => (
            <div key={order.id} className="order-item-card glass-card mb-6">
              <div className="order-header-row">
                <div>
                  <span className="order-num-label">Order #</span>
                  <strong className="order-num-val">{order.orderNumber}</strong>
                  <span className="order-date-tag">
                    <Clock size={14} /> {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="order-status-badge">
                  <span className={`badge ${order.status === 'DELIVERED' ? 'badge-success' : 'badge-warning'}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-summary-row">
                <div className="order-meta-info">
                  <div className="meta-subitem">
                    <MapPin size={15} />
                    <span>{order.shippingAddress || '742 Evergreen Terrace'}</span>
                  </div>
                  <div className="meta-subitem">
                    <CreditCard size={15} />
                    <span>{order.paymentMethod || 'Credit Card'}</span>
                  </div>
                </div>

                <div className="order-total-box">
                  <span className="text-xs text-secondary">Total Amount</span>
                  <span className="order-price-val">${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="order-items-sublist">
                  <h5>Items in this shipment:</h5>
                  <div className="order-items-chips">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="order-book-chip">
                        <BookOpen size={14} />
                        <span>{it.book?.title || 'Book Title'} × {it.quantity} (${it.subtotal?.toFixed(2)})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
