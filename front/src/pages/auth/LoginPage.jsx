import React, { useState, useContext } from 'react';
import { supabase } from '../../lib/supabaseClient';  // adjust path
import { AuthContext } from '../../context/AuthContext';
import "../../styles/auth.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Supabase
      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      // Fetch user profile/role from your users table if needed
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      // Use context login to store user and trigger redirect
      login(userData);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Login to ORiem Capital</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-input-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="auth-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="auth-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <a href="/signup" className="auth-link">Don't have an account? Sign up</a>
        <a href="/forgot-password" className="auth-link">Forgot your password? Reset it</a>
      </div>
    </div>
  );
};

export default LoginPage;
