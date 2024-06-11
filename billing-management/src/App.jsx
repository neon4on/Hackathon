import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Landing from "src/pages/Landing";
import Home from "src/pages/Home";
import Bills from "src/pages/Bills";
import ObjectDistributionPage from "src/pages/ObjectDistributionPage";
import Forecast from "src/pages/Forecast";
import ResetPassword from "src/pages/ResetPassword";
import DistributedPaymentInvoices from "src/pages/DistributedPaymentInvoices";
import DistributionManagement from "src/pages/DistributionManagement";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/Layout";

import "@fontsource/inter/800.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/400.css";
import "./styles/globals.scss";

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
  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/' element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route
            path='/bills'
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          <Route
            path='/objectdistributionpage'
            element={
              <ProtectedRoute>
                <ObjectDistributionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/DistributionManagement'
            element={
              <ProtectedRoute>
                <DistributionManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path='/distributedpaymentinvoices'
            element={
              <ProtectedRoute>
                <DistributedPaymentInvoices />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forecast'
            element={
              <ProtectedRoute>
                <Forecast />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
