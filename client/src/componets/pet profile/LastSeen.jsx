import React from 'react';

import MapComponent from '../MapComponent';

import { format } from 'date-fns';

function LastSeen(pet) {
  const date = new Date(pet.data.lost_date);

  return (
    <div className="overflow-hidden">
      <div className="mt-28 relative">
        <h1 className="text-4xl ml-32 mb-8 font-bold">Naposledy videný/á.</h1>
        <div className="">
          <div className="w-1/2 ml-32">
            <MapComponent />
          </div>
          <p className="font-bold text-3xl absolute top-1/2 right-48">
            {format(date, 'dd/MM/yyyy-HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LastSeen;
