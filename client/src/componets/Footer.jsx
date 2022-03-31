import React from 'react';

import hachiLogo from '../imgs/logo.png';

function Footer() {
  return (
    <footer className="bg-black text-white w-100%">
      <div className="py-10 flex items-center justify-between mx-10">
        <div className="flex items-center">
          <img src={hachiLogo} alt="Logo" className="h-16" />
          <p className="ml-5 opacity-80">Copyright © 2022</p>
        </div>
        <p>Vyrobil Adam Demian</p>
      </div>
    </footer>
  );
}

export default Footer;
