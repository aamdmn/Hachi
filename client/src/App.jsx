import React from 'react';
import { Route, Routes } from 'react-router-dom';

//componets
import MapPage from './pages/MapPage';
import Home from './pages/Home';
import Lostpet from './pages/user/Lostpet';
import Findpet from './pages/user/Findpet';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/lostpet" element={<Lostpet />} />
        <Route path="/findpet" element={<Findpet />} />
      </Routes>
    </div>
  );
}

export default App;
