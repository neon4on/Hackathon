import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Landing from "src/pages/Landing";
import Home from "src/pages/Home";
import Bills from "src/pages/Bills";
import Objects from "src/pages/Objects";
import Control from "src/pages/Control";
import Forecast from "src/pages/Forecast";
import Distribution from "src/pages/Distribution";

import Header from "src/components/Header";
import Sidebar from "src/components/Sidebar";
import ProtectedRoute from "./ProtectedRoute";

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
  const hideHeaderAndSidebar = location.pathname === "/" || location.pathname === "/reset-password";

  return (
    <>
      {!hideHeaderAndSidebar && <Header />}
      <div style={{ display: "flex" }}>
        {!hideHeaderAndSidebar && <Sidebar />}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path='/bills'
              element={
                <ProtectedRoute>
                  <Bills />
                </ProtectedRoute>
              }
            />
            <Route
              path='/objects'
              element={
                <ProtectedRoute>
                  <Objects />
                </ProtectedRoute>
              }
            />
            <Route
              path='/control'
              element={
                <ProtectedRoute>
                  <Control />
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
            <Route
              path='/distribution'
              element={
                <ProtectedRoute>
                  <Distribution />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
