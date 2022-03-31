import React from 'react';
import Footer from '../Footer';

function Contact(pet) {
  return (
    <div>
      <div className="ml-32 mt-20 mb-36">
        <h1 className="text-4xl font-bold">Kontakt</h1>
        <div className="mt-8">
          <p className="text-xl font-bold opacity-50">meno majitela:</p>
          <div className="flex ">
            <p className="text-2xl font-bold mt-2">{pet.data.owner.name}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xl font-bold opacity-50">tel. číslo:</p>
          <div className="flex ">
            <p className="text-2xl font-bold mt-2">{pet.data.owner.tel}</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xl font-bold opacity-50">email:</p>
          <div className="flex ">
            <p className="text-2xl font-bold mt-2">{pet.data.owner.email}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
