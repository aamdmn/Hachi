import React, { useRef, useCallback } from 'react';

// Searchbar
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

// Google maps
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

// componets

const libraries = ['places'];
const mapContainerStyle = {
  width: '70%',
  height: '500px',
};
const center = {
  lat: 48.148598,
  lng: 17.107748,
};

function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div className="h-screen w-screen">
      <div className="text-xl w-30persent float-left ml-6 mt-8 p-3 border-2 border-black">
        <Search panTo={panTo} />
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        className="float-right"
        onLoad={onMapLoad}
      ></GoogleMap>
      <p className="text-3xl">Random Text</p>
    </div>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -33.8688, lng: () => 151.2195 },
      radius: 100 * 1000,
    },
  });

  return (
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Search for a place"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default MapPage;
