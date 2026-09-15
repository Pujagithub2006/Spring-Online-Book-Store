import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Shield, CreditCard, Truck } from 'lucide-react';

export default function CartDrawer({ onNavigateToAuth, onNavigateToOrders }) {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(user?.address || '123 Main Street, Suite 400, NY');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderError, setOrderError] = useState(null);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      setIsCartOpen(false);
      onNavigateToAuth('login');
      return;
    }

    if (cart.length === 0) return;

    setIsSubmitting(true);
    setOrderError(null);

    try {
      const orderPayload = {
        userId: user.id || 2,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        items: cart.map(item => ({
          bookId: item.book.id,
          quantity: item.quantity
        }))
      };

      const createdOrder = await api.placeOrder(orderPayload);
      setOrderSuccess(createdOrder);
      clearCart();
    } catch (err) {
      setOrderError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    setOrderSuccess(null);
    setOrderError(null);
  };

  return (
    <div className="cart-backdrop" onClick={closeDrawer}>
      <div className="cart-drawer glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag className="cart-header-icon" size={22} />
            <h3>Your Shopping Bag</h3>
            <span className="cart-items-count">({cart.length} items)</span>
          </div>
          <button className="cart-close-btn" onClick={closeDrawer}>
            <X size={20} />
          </button>
        </div>

        {orderSuccess ? (
          /* Order Confirmation Screen */
          <div className="order-success-view animate-fade-in">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="text-success" />
            </div>
            <h3>Order Placed Successfully!</h3>
            <p className="order-number-tag">
              Order #{orderSuccess.orderNumber || 'ORD-984210'}
            </p>
            <p className="success-desc">
              Thank you for shopping with LuminaBooks. We've sent a detailed confirmation to your registered email.
            </p>

            <div className="order-details-card glass-card">
              <div className="order-row">
                <span>Shipping To:</span>
                <strong>{orderSuccess.shippingAddress || shippingAddress}</strong>
              </div>
              <div className="order-row">
                <span>Payment:</span>
                <strong>{orderSuccess.paymentMethod || paymentMethod}</strong>
              </div>
              <div className="order-row total">
                <span>Total Paid:</span>
                <strong>${orderSuccess.totalAmount ? orderSuccess.totalAmount.toFixed(2) : cartTotal.toFixed(2)}</strong>
              </div>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-primary w-full"
                onClick={() => {
                  closeDrawer();
                  if (onNavigateToOrders) onNavigateToOrders();
                }}
              >
                View Order History
              </button>
              <button 
                className="btn btn-secondary w-full"
                onClick={closeDrawer}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="cart-items-scroll">
              {cart.length === 0 ? (
                <div className="empty-cart-state">
                  <div className="empty-cart-icon">
                    <ShoppingBag size={48} />
                  </div>
                  <h4>Your bag is empty</h4>
                  <p>Explore our catalog to discover bestsellers, fiction, technology & more.</p>
                  <button className="btn btn-primary" onClick={closeDrawer}>
                    Start Browsing
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.book.id} className="cart-item-card">
                    <img 
                      src={item.book.coverImageUrl} 
                      alt={item.book.title} 
                      className="cart-item-thumb" 
                    />
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.book.title}</h4>
                      <p className="cart-item-author">{item.book.author}</p>
                      <div className="cart-item-price">
                        ${(item.book.price * item.quantity).toFixed(2)}
                        <span className="unit-rate"> (${item.book.price.toFixed(2)} each)</span>
                      </div>

                      <div className="cart-item-controls">
                        <div className="cart-qty-counter">
                          <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)}>+</button>
                        </div>

                        <button 
                          className="cart-remove-btn" 
                          onClick={() => removeFromCart(item.book.id)}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer / Checkout Form */}
            {cart.length > 0 && (
              <div className="cart-footer">
                {orderError && (
                  <div className="cart-error-banner">
                    {orderError}
                  </div>
                )}

                <div className="checkout-inputs">
                  <div className="form-group mb-2">
                    <label className="form-label text-xs">Shipping Address</label>
                    <input 
                      type="text" 
                      className="form-input text-sm"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter street address, city, zip"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label text-xs">Payment Method</label>
                    <select 
                      className="form-input text-sm"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="Credit Card">Credit / Debit Card</option>
                      <option value="PayPal">PayPal Instant</option>
                      <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                    </select>
                  </div>
                </div>

                <div className="cart-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Shipping</span>
                    <span className="text-success font-semibold">FREE</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Estimated Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary w-full checkout-submit-btn"
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Processing Order...'
                  ) : user ? (
                    <>
                      <span>Complete Checkout</span>
                      <ArrowRight size={18} />
                    </>
                  ) : (
                    'Sign In to Checkout'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
