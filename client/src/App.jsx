import React from 'react';
import { Route, Routes } from 'react-router-dom';

//componets
import MapPage from './pages/MapPage';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
