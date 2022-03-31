import React from 'react';

import MapComponent from '../MapComponent';

function LastSeen(pet) {
  const date = new Date(pet.data.lost_date);

  const d = date.getDay();
  const m = date.getMonth();
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();

  return (
    <div>
      <div className="m-6">
        <h1 className="text-4xl font-bold">Naposledy videný/á.</h1>
        <div className="m-6">
          <div className="m-5">
            <MapComponent />
          </div>
          <p>
            {`${d}.${m} ${y}`} <br /> {`${h}:${min}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LastSeen;
