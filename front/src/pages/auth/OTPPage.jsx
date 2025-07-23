import React, { useState } from 'react';
import { verifyOtp } from '../../services/authService';
import '../../styles/auth.css';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await verifyOtp(otp);
      setMessage(res.message || 'OTP verified successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">OTP Verification</h2>

      <form onSubmit={handleVerify} className="auth-form">
        <label htmlFor="otp">Enter the OTP code sent to your email</label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
          required
        />

        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}

        <button type="submit" className="auth-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPPage;
