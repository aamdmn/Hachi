import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import hachiLogo from '../imgs/logo.png';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex w-screen overflow-hidden">
      <section className="flex">
        <div
          className="flex-col ml-36 space-y-2 mt-24 h-32"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-8  bg-white dark:bg-black"></span>
          <span className="block h-0.5 w-8  bg-white dark:bg-black"></span>
          <span className="block h-0.5 w-8  bg-white dark:bg-black"></span>
        </div>
        <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
            <Link to="/map" className="border-b border-gray-400 my-8 uppercase">
              <p>Mapa</p>
            </Link>
            <Link
              to="/lostpet"
              className="border-b border-gray-400 my-8 uppercase"
            >
              <p>Vytvoriť profil</p>
            </Link>
            <Link to="/" className="border-b border-gray-400 my-8 uppercase">
              <p>Domov</p>
            </Link>
          </ul>
        </div>
      </section>
      <img src={hachiLogo} alt="Hachi logo" className="h-20 m-auto mt-16" />
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        color: black;
        display: block;
        position: absolute;
        width: 100%;
        height: 30%;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}

export default Navbar;
