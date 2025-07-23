import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import OTPPage from '../pages/auth/OTPPage';
import Unauthorized from '../pages/shared/Unauthorized';

import Dashboard from '../pages/user/Dashboard';
import TransferPage from '../pages/user/TransferPage';
import TransactionsPage from '../pages/user/TransactionsPage';
import LoanPage from '../pages/user/LoanPage';
import AccountDetails from '../pages/user/AccountDetails';

import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagementPage from '../pages/admin/UserManagementPage';
import LoanManagementPage from '../pages/admin/LoanManagementPage';
import AuditLogsPage from '../pages/admin/AuditLogsPage';

import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';
import UserLayout from '../components/layout/UserLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/verify-otp" element={<OTPPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Customer Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transfer" element={<TransferPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="loan" element={<LoanPage />} />
        <Route path="accounts/:id" element={<AccountDetails />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="loans" element={<LoanManagementPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
