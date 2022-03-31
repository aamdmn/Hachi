import React from 'react';

function PetDetails(pet) {
  return (
    <div>
      <div className="ml-32 mt-28">
        <h1 className="text-4xl font-bold">Popis.</h1>
        <p className="text-xl mt-8">{pet.data.details}</p>
      </div>
    </div>
  );
}

export default PetDetails;
