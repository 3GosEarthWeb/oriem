// src/services/authService.js
import { supabase } from '../lib/supabaseClient';

// Sign up
export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });
  if (error) throw new Error(error.message);
  return data;
};

// Login
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw new Error(error.message);
  return data;
};

// Send Reset Link
export const sendResetLink = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  if (error) throw new Error(error.message);
  return true;
};

// Reset Password (after user clicks email link)
export const resetPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw new Error(error.message);
  return data;
};

// OTP Verification (if you're using email OTP)
export const verifyOtp = async ({ email, token, type = 'email' }) => {
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type });
  if (error) throw new Error(error.message);
  return data;
};
