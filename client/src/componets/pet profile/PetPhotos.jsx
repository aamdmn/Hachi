import React from 'react';

function PetPhotos(data) {
  console.log(data.data.image.image);

  return (
    <div>
      <div className="mt-20 m-6 flex flex-row">
        <img
          src={data.data.image.image}
          alt="tolga-ahmetler-glz-Qf-LG0s-WE-unsplash"
          border="0"
          className="h-80 m-6"
        />
        {/* <img
          src={data.data.image.image}
          alt="tolga-ahmetler-glz-Qf-LG0s-WE-unsplash"
          border="0"
          className="h-80 m-6"
        />
        <img
          src={data.data.image.image}
          alt="tolga-ahmetler-glz-Qf-LG0s-WE-unsplash"
          border="0"
          className="h-80 m-6"
        /> */}
      </div>
    </div>
  );
}

export default PetPhotos;
