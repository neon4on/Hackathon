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

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <div style={{ display: 'flex' }}>
        {location.pathname !== '/' && <Sidebar />}
        <main style={{ flexGrow: 1}}>
          <Routes>
            <Route path="/ml" element={<MLComponent />} />
            <Route path="/" element={<Home />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/distribution" element={<Distribution />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/create-bill" element={<CreateBill />} />
            <Route path="/distribution-objects" element={<DistributionObjects />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
