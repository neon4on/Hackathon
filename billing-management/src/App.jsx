import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Header from 'components/Header';
import Home from 'pages/Home';
import Bills from 'pages/Bills';
import Distribution from 'pages/Distribution';
import Forecast from 'pages/Forecast';
import CreateBill from 'components/CreateBill';
import DistributionObjects from 'pages/DistributionObjects';
import MLComponent from 'components/MLComponent';

// import Comp from 

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Header />
        <div style={{ display: 'flex' }}>
          {/* <Sidebar /> */}
          <main style={{ flexGrow: 1, padding: '1rem' }}>
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
      </Router>
    </SnackbarProvider>
  );
};

export default App;
