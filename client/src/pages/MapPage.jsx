import React from 'react';

// componets
import MapComponent from '../componets/MapComponent';

function MapPage() {
  return (
    <div className="h-screen w-screen">
      <p className="text-xl w-30persent float-left">Search Bar</p>
      <MapComponent></MapComponent>
      <p className="text-3xl">Random Text</p>
    </div>
  );
}

export default MapPage;
