import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Login({ onNavigate }) {
  const { login, loading, authError, setAuthError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    if (!validate()) return;

    try {
      const user = await login(formData.email, formData.password);
      setSuccessMsg(`Welcome back, ${user.fullName}! Redirecting...`);
      setTimeout(() => {
        onNavigate('catalogue');
      }, 1200);
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  const handleDemoFill = () => {
    setFormData({
      email: 'alex@example.com',
      password: 'password123',
    });
    setFormErrors({});
    if (setAuthError) setAuthError(null);
  };

  return (
    <div className="auth-page-container animate-fade-in">
      <div className="auth-card glass-card">
        {/* Card Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <LogIn size={26} className="text-primary" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to access your orders, wishlist, and recommendations.</p>
        </div>

        {/* Demo Account Quick-Fill Button */}
        <div className="demo-account-box">
          <button type="button" className="demo-fill-btn" onClick={handleDemoFill}>
            <Sparkles size={16} /> Auto-fill Demo Account (Alex Morgan)
          </button>
        </div>

        {/* Alerts */}
        {authError && (
          <div className="auth-alert error animate-fade-in">
            <AlertCircle size={18} />
            <span>{authError}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert success animate-fade-in">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className={`form-input has-icon ${formErrors.email ? 'error' : ''}`}
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                }}
              />
            </div>
            {formErrors.email && <div className="form-error">{formErrors.email}</div>}
          </div>

          {/* Password field */}
          <div className="form-group">
            <div className="password-label-row">
              <label className="form-label">Password</label>
            </div>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-input has-icon ${formErrors.password ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (formErrors.password) setFormErrors({ ...formErrors, password: null });
                }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.password && <div className="form-error">{formErrors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In to Account'}
          </button>
        </form>

        {/* Footer link */}
        <div className="auth-footer">
          <span>Don't have an account?</span>{' '}
          <button className="auth-switch-link" onClick={() => onNavigate('register')}>
            Create one here
          </button>
        </div>
      </div>
    </div>
  );
}
