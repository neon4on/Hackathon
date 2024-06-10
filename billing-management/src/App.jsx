import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Landing from 'src/pages/Landing';
import Home from 'src/pages/Home';
import Bills from 'src/pages/Bills';
import ObjectDistributionPage from 'src/pages/ObjectDistributionPage';
import Forecast from 'src/pages/Forecast';
import ResetPassword from 'src/pages/ResetPassword';
import DistributedPaymentInvoices from 'src/pages/DistributedPaymentInvoices';
import DistributionManagement from 'src/pages/DistributionManagement';

import Header from 'src/components/Header';
import Sidebar from 'src/components/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import './styles/globals.scss'; // Убедитесь, что вы импортируете глобальные стили

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AppContent />
      </Router>
    </SnackbarProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/' || location.pathname === '/reset-password';

  return (
    <div className="app-container">
      {!hideHeaderAndSidebar && <Sidebar />}
      <main className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          {/* 1 */}
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          {/* 2 */}
          <Route
            path="/objectdistributionpage"
            element={
              <ProtectedRoute>
                <ObjectDistributionPage />
              </ProtectedRoute>
            }
          />
          {/* 3 */}
          <Route
            path="/DistributionManagement"
            element={
              <ProtectedRoute>
                <DistributionManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/distributedpaymentinvoices"
            element={
              <ProtectedRoute>
                <DistributedPaymentInvoices />
              </ProtectedRoute>
            }
          />
          {/* 5 */}
          <Route
            path="/forecast"
            element={
              <ProtectedRoute>
                <Forecast />
              </ProtectedRoute>
            }
          />
          {/* 6 */}
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
