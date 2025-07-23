import React, { useState } from 'react';
import { sendResetLink } from '../../services/authService';
import "../../styles/auth.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await sendResetLink(email);
      setMessage(res.message || 'Reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-error" style={{ color: '#28a745' }}>{message}</div>}

          <button type="submit" className="auth-button">Send Reset Link</button>
        </form>

        <a href="/login" className="auth-link">Back to login</a>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
