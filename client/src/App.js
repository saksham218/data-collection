import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          <Route path="/" eaxct element={<Home />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
