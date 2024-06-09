import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Bills from './pages/Bills';
import Distribution from './pages/Distribution';
import Forecast from './pages/Forecast';
import CreateBill from './components/CreateBill';
import DistributionObjects from './pages/DistributionObjects';
import MLComponent from './components/MLComponent';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './ProtectedRoute';

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
    <>
      {!hideHeaderAndSidebar && <Header />}
      <div style={{ display: 'flex' }}>
        {!hideHeaderAndSidebar && <Sidebar />}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/ml" element={<ProtectedRoute><MLComponent /></ProtectedRoute>} />
            <Route path="/" element={<Home />} />
            <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
            <Route path="/distribution" element={<ProtectedRoute><Distribution /></ProtectedRoute>} />
            <Route path="/forecast" element={<ProtectedRoute><Forecast /></ProtectedRoute>} />
            <Route path="/create-bill" element={<ProtectedRoute><CreateBill /></ProtectedRoute>} />
            <Route path="/distribution-objects" element={<ProtectedRoute><DistributionObjects /></ProtectedRoute>} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
