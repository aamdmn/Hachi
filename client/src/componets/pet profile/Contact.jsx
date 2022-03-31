import React from 'react';

function Contact(pet) {
  return (
    <div>
      <div className="m-6">
        <h1 className="text-4xl font-bold">Kontakt</h1>

        <div className="m-3">
          <p>{pet.data.owner.name}</p>
        </div>
        <div className="m-3">
          <p>{pet.data.owner.tel}</p>
        </div>
        <div className="m-3">
          <p>{pet.data.owner.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
