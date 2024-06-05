import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Bills from './pages/Bills';
import Distribution from './pages/Distribution';
import Forecast from './pages/Forecast';
import CreateBill from './components/CreateBill';

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/distribution" element={<Distribution />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/create-bill" element={<CreateBill />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
