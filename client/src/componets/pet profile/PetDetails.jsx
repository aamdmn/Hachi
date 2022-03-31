import React from 'react';

function PetDetails(pet) {
  return (
    <div>
      <div className="m-6">
        <h1 className="text-4xl font-bold">Popis.</h1>
        <p className="text-xl">{pet.data.details}</p>
      </div>
    </div>
  );
}

export default PetDetails;
