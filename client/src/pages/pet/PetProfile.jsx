import React, { useEffect, useState } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { useParams } from 'react-router-dom';

//componets
import PetDetails from '../../componets/pet profile/PetDetails';
import PetPhotos from '../../componets/pet profile/PetPhotos';
import LastSeen from '../../componets/pet profile/LastSeen';
import Navbar from '../../componets/Navbar';
import Contact from '../../componets/pet profile/Contact';

//hooks
import useFetch from '../../hooks/useFetch';

function PetProfile() {
  const { id } = useParams();

  const { data, loading, error } = useFetch('/pets/' + id);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <div className="dark">
        <div className="overflow-hidden">
          <Navbar />
        </div>
        {data && (
          <section>
            <div className="justify-center h-screen font-sora">
              <h1 className="text-4xl font-bold ml-32 mt-20 ">
                {data[0].name}.
              </h1>
              <PetPhotos data={data[0]} />
              <LastSeen data={data[0]} />
              <PetDetails data={data[0]} />
              <Contact data={data[0]} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default PetProfile;
