import React from 'react';

import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Spinner from 'react-bootstrap/Spinner';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '800px',
  height: '350px',
};

const optionsMarker = {
  circle: {
    radius: 500,
    fillColor: '#63C7FF',
    strokeColor: '#63C7FF',
    strokeOpacity: 0.35,
    strokeWeight: 0.5,
    fillOpacity: 0.35,
    draggable: false,
  },
  marker: {
    fillColor: 'yellow',
  },
};

function MapComponent() {
  const { id } = useParams();

  const { data, loading, error } = useFetch('/pets/' + id);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  if (loading) {
    return (
      <Spinner animation="border" variant="primary">
        Loading...
      </Spinner>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={{ lat: data[0].map.lat, lng: data[0].map.lng }}
        options={{ mapId: '1c4d7153cf0a085e' }}
        className="float-right"
      >
        <div id="mapMarkers">
          {data && (
            <Marker
              position={{ lat: data[0].map.lat, lng: data[0].map.lng }}
              name="marker"
            />
          )}
          {data && (
            <Circle
              center={{ lat: data[0].map.lat, lng: data[0].map.lng }}
              options={optionsMarker.circle}
              name="marker"
            />
          )}
        </div>
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
