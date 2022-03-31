import React, { useRef, useCallback, useState } from 'react';

// react router
import { Link, useParams } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import { Icon } from '@iconify/react';

import useFetch from '../hooks/useFetch';

import { format } from 'date-fns';

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
  Circle,
  InfoWindow,
} from '@react-google-maps/api';
import Navbar from '../componets/Navbar';
import Footer from '../componets/Footer';

const libraries = ['places'];
const mapContainerStyle = {
  width: '70%',
  height: '500px',
};
const center = {
  lat: 48.148598,
  lng: 17.107748,
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

function MapPage() {
  const { data, loading, error } = useFetch('/pets');
  const [selected, setSelected] = useState(null);

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

  if (loading) {
    return (
      <div className="flex h-screen margin-0-auto justify-center align-center">
        <Spinner animation="border" variant="dark" className="">
          Loading...
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-screen w-screen dark font-sora overflow-x-hidden">
      <Navbar />
      <section className="mt-2">
        <div className="float-left ml-6 mt-16 mr-11">
          <Search panTo={panTo} />
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={{ mapId: '1c4d7153cf0a085e' }}
          className="float-right"
          onLoad={onMapLoad}
        >
          <div id="mapMarkers">
            {data &&
              data.map((marker) => (
                <Marker
                  position={{ lat: marker.map.lat, lng: marker.map.lng }}
                  name="marker"
                  key={marker._id}
                  onClick={() => {
                    setSelected(marker);
                  }}
                />
              ))}
            {data &&
              data.map((marker) => (
                <Circle
                  center={{ lat: marker.map.lat, lng: marker.map.lng }}
                  options={optionsMarker.circle}
                  name="marker"
                  key={marker._id}
                  onClick={() => {
                    setSelected(marker);
                  }}
                />
              ))}{' '}
            {data && selected ? (
              <InfoWindow
                position={{ lat: selected.map.lat, lng: selected.map.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h1 className="text-xl font-normal">{selected.name}</h1>
                  <p>
                    Naposledy videný:{' '}
                    {format(new Date(selected.lost_date), 'yyyy/MM/dd-HH:mm')}
                  </p>
                  <div className="flex justify-center mt-3">
                    <Link to={`/petpage/${selected._id}`}>
                      <Icon
                        icon="akar-icons:info"
                        color="#081e3f"
                        height="30"
                      />{' '}
                    </Link>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </div>
        </GoogleMap>
      </section>

      <div className="flex">
        <div className="h-20 text-start bg-yellow-500 ml-6 mt-32 shadow-xl hover:bg-gray-400 hover:text-white duration-300">
          <Link to="/lostpet">
            <div className="flex">
              <div className="p-3 mt-1 pr-0 pb-0">
                <Icon icon="ep:help" color="#081e3f" height="22" />
              </div>
              <p className="p-3 pl-1 pb-0 w-96 text-xl font-bold">
                Stratil sa mi môj maznáčik
              </p>
            </div>
            <span className="text-sm font-light opacity-70 p-3 pt-0 ml-6 text-black block">
              Vytvorte profil pre vašeho strateného maznáčika
            </span>
          </Link>
        </div>
        <div className="w-max flex justify-end">
          <PetCardComponent />
        </div>
      </div>

      <Footer />
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
      location: { lat: () => 48.148598, lng: () => 17.107748 },
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
        placeholder="Hľadajte miesto"
        className="p-3 text-xl w-96 drop-shadow-xl rounded-lg"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ id, description }) => (
              <ComboboxOption
                key={id}
                value={description}
                className="p-3 text-xl w-96 drop-shadow-xl rounded-lg"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

function PetCardComponent() {
  const { data, loading, error } = useFetch('/pets');

  const maxLenght = 40;

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
    <div className="ml-32 mt-20 mb-20 w-fit grid grid-cols-3 gap-x-20 gap-y-16">
      {data &&
        data.map((pet) => (
          <div className="w-60 relative max-h-min rounded overflow-hidden shadow-xl bg-dark-blue text-white">
            <div className="mb-16">
              <div className="flex flex-col items-center">
                <img
                  src={pet.image.image}
                  alt="charlesdeluvio-Mv9hjn-EUHR4-unsplash"
                  border="0"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <h1 className="font-bold text-4xl mb-2 p-3">{pet.name}</h1>
                {pet.details.length > maxLenght ? (
                  <p className="p-3 mb-5">
                    {' '}
                    {pet.details.substring(0, maxLenght)}...
                  </p>
                ) : (
                  <p className="p-3 mb-5"> {pet.details}</p>
                )}
              </div>
            </div>
            <div className="flex w-20 h-11 justify-center items-center bg-yellow-400 absolute bottom-6 shadow-2xl right-1/2 left-1/3 hover:bg-gray-400 hover:text-white duration-300">
              <Link to={`/petpage/${pet._id}`}>
                <Icon icon="akar-icons:info" color="#081e3f" height="35" />{' '}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MapPage;
