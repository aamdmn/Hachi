import React from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70%',
  height: '500px',
};
const center = {
  lat: 48.148598,
  lng: 17.107748,
};

function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  // const onMapLoad = require('../pages/MapPage.jsx');

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        className="float-right"
        // onLoad={onMapLoad}
      ></GoogleMap>
    </div>
  );
}

export default MapComponent;
