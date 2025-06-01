// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import FormRegister from './pages/auth/FormRegister';
import DashboardHome from './pages/DashboardHome';
import Login from './pages/Login';
import CreateInvoice from './pages/Invoice/CreateInvoice';
import ListInvoice from './pages/Invoice/ListInvoice';

export default function App() {
  const accessToken = localStorage.getItem('access_token');
  return (
    <Router>
      <Routes>
        {accessToken ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<FormRegister />} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="/invoice/new" element={<CreateInvoice />} />
            <Route path="/invoice/list" element={<ListInvoice />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}
