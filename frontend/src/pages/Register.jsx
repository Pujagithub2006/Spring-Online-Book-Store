import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Register({ onNavigate }) {
  const { register, loading, authError, setAuthError } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const calculatePasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculatePasswordStrength(formData.password);

  const getStrengthLabel = () => {
    switch (strength) {
      case 1: return { label: 'Weak', color: '#ef4444', width: '25%' };
      case 2: return { label: 'Fair', color: '#f59e0b', width: '50%' };
      case 3: return { label: 'Good', color: '#3b82f6', width: '75%' };
      case 4: return { label: 'Strong', color: '#10b981', width: '100%' };
      default: return { label: '', color: 'transparent', width: '0%' };
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.address.trim()) {
      errors.address = 'Shipping address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    if (!validate()) return;

    try {
      const user = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
      });

      setSuccessMsg(`Welcome aboard, ${user.fullName}! Account created successfully.`);
      setTimeout(() => {
        onNavigate('catalogue');
      }, 1400);
    } catch (err) {
      // Error is set in AuthContext
    }
  };

  return (
    <div className="auth-page-container animate-fade-in">
      <div className="auth-card register-card glass-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-badge">
            <UserPlus size={26} className="text-primary" />
          </div>
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-subtitle">Join thousands of readers and enjoy exclusive member perks.</p>
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

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div className="input-with-icon">
              <User className="input-icon" size={18} />
              <input
                type="text"
                className={`form-input has-icon ${formErrors.fullName ? 'error' : ''}`}
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: null });
                }}
              />
            </div>
            {formErrors.fullName && <div className="form-error">{formErrors.fullName}</div>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className={`form-input has-icon ${formErrors.email ? 'error' : ''}`}
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                }}
              />
            </div>
            {formErrors.email && <div className="form-error">{formErrors.email}</div>}
          </div>

          {/* Password & Confirm Password Grid */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input has-icon ${formErrors.password ? 'error' : ''}`}
                  placeholder="Min 6 characters"
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
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && <div className="form-error">{formErrors.password}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input has-icon ${formErrors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (formErrors.confirmPassword) setFormErrors({ ...formErrors, confirmPassword: null });
                  }}
                />
              </div>
              {formErrors.confirmPassword && <div className="form-error">{formErrors.confirmPassword}</div>}
            </div>
          </div>

          {/* Password Strength Meter */}
          {formData.password && (
            <div className="strength-meter-box">
              <div className="strength-bar-track">
                <div 
                  className="strength-bar-fill" 
                  style={{ width: getStrengthLabel().width, backgroundColor: getStrengthLabel().color }}
                ></div>
              </div>
              <span className="strength-label" style={{ color: getStrengthLabel().color }}>
                Strength: {getStrengthLabel().label}
              </span>
            </div>
          )}

          {/* Phone & Address */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Phone Number (Optional)</label>
              <div className="input-with-icon">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  className="form-input has-icon"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Default Shipping Address *</label>
              <div className="input-with-icon">
                <MapPin className="input-icon" size={18} />
                <input
                  type="text"
                  className={`form-input has-icon ${formErrors.address ? 'error' : ''}`}
                  placeholder="Street, City, Country"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    if (formErrors.address) setFormErrors({ ...formErrors, address: null });
                  }}
                />
              </div>
              {formErrors.address && <div className="form-error">{formErrors.address}</div>}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>{' '}
          <button className="auth-switch-link" onClick={() => onNavigate('login')}>
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}
