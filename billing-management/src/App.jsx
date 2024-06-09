import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Landing from "src/pages/Landing";
import Home from "src/pages/Home";
import Bills from "src/pages/Bills";
import Objects from "src/pages/Objects";
import Control from "src/pages/Control";
import Forecast from "src/pages/Forecast";
import Distribution from "src/pages/Distribution";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/bills' element={<Bills />} />
          <Route path='/objects' element={<Objects />} />
          <Route path='/control' element={<Control />} />
          <Route path='/forecast' element={<Forecast />} />
          <Route path='/distribution' element={<Distribution />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
