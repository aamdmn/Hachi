import React, { useEffect, useState } from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '450px',
};
const center = {
  lat: 48.148598,
  lng: 17.107748,
};

const optionsMarker = {
  circle: {
    radius: 500,
    fillColor: '#FF0000',
    strokeColor: '#ff0000',
    strokeOpacity: 0.35,
    strokeWeight: 0.5,
    fillOpacity: 0.35,
    draggable: false,
  },
  marker: {
    fillColor: 'yellow',
  },
};

function Lostpet() {
  const [markers, setMarkers] = useState([]);

  const onMapClick = (e, props) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);

    if (markers.length > 0) {
      setMarkers(markers.slice(0, 1));
      setMarkers(markers.slice(1));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      ownerName: e.target.ownerName.value,
      email: e.target.email.value,
      tel: e.target.tel.value,
      petName: e.target.petName.value,
      details: e.target.details.value,
      lostDate: e.target.lostDate.value,
      lat: markers[0].lat,
      lng: markers[0].lng,
    };
    fetch('/handleSubmit', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   fetchItems();
  // }, []);

  // const [items, setItems] = useState([]);

  // const fetchItems = async () => {
  //   const data = await fetch('/pets');
  //   const items = await data.json();
  //   setItems(items);
  // };

  const [libraries] = useState(['places']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    libraries,
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div>
      <h1 className="text-3xl m-20">Lostpet</h1>
      <section>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col ml-36">
            <h1 className="text-3xl font-bold">Osobné údaje</h1>
            <div className="mt-6">
              <p>Vaše meno a priezvisko</p>
              <input
                type="text"
                name="ownerName"
                className="border-2 border-black w-80 p-1"
              />
            </div>
            <div className="mt-6">
              <p>Tel. číslo</p>
              <input
                type="text"
                name="tel"
                className="border-2 border-black p-1 w-80"
              />
            </div>
            <div className="mt-6">
              <p>Email</p>
              <input
                type="email"
                name="email"
                className="border-2 border-black p-1 w-80 text-lg"
              />
            </div>
            <h1 className="mt-16 text-3xl font-bold">
              Informácie o Vašom maznáčikovi
            </h1>
            <div className="mt-6">
              <p>Meno</p>
              <input
                type="text"
                name="petName"
                className="border-2 border-black p-1 w-80"
              />
            </div>
            <div className="mt-6">
              <p>Popisok</p>
              <textarea
                type="text"
                name="details"
                className="border-2 border-black p-1 w-80"
              />
            </div>
            <div className="mt-6">
              <p>Dátum kedy sa stratiľ</p>
              <input
                type="datetime-local"
                className="border-2 border-black p-1 w-80"
                name="lostDate"
              />
            </div>
          </div>

          <div className="m-20">
            <h1 className="text-4xl font-bold mb-5">
              Kde bol naposledy videný/á?
            </h1>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={center}
              onClick={onMapClick}
            >
              <div id="mapMarkers">
                {markers.map((marker) => (
                  <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                    name="marker"
                  />
                ))}
                {markers.map((marker) => (
                  <Circle
                    center={{ lat: marker.lat, lng: marker.lng }}
                    options={optionsMarker.circle}
                    name="marker"
                  />
                ))}
              </div>
            </GoogleMap>
          </div>

          <div className="m-20">
            <input
              type="submit"
              value="Vytvoriť profil"
              className="py-4 px-16 bg-yellow-500 text-2xl font-semibold rounded-lg"
            />
          </div>
        </form>
      </section>

      {/* {items.map((item) => (
        <div className="flex flex-col ml-36">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <div className="mt-6">
            <p>{item.details}</p>
          </div>
          <div className="mt-6">
            <p>{item.lost_date}</p>
          </div>
          <div className="mt-6">
            <p>{item.owner.name}</p>
          </div>
          <div className="mt-6">
            <p>{item.owner.tel}</p>
          </div>
          <div className="mt-6">
            <p>{item.owner.email}</p>
          </div>
        </div>
      ))} */}

      <section className="m-20">
        <h1 className="text-4xl font-bold mb-5">Fotky maznáčika</h1>
        <input type="file" id="petPhotos" name="petPhotos" />
      </section>
    </div>
  );
}

export default Lostpet;
