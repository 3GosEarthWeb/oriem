import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
          <Route path="*" element={<Navigate to="/unauthorized" />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
