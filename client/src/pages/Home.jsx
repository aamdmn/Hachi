import { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Footer from '../componets/Footer';
import Navbar from '../componets/Navbar';

import petImage from '../imgs/pet1.jpg';

function Home() {
  return (
    <div className="overflow-hidden flex flex-col font-sora">
      <section className="bg-slate-700  text-white pb-80">
        <Navbar />

        <section className="flex mt-72 ml-36">
          <div className="flex-col">
            <h1 className="text-6xl font-extrabold">
              <i className="text-yellow-300 not-italic">Nájdi</i> svojho
              maznáčika.
            </h1>
            <p className="text-xl mt-16 w-96 font-light">
              Hachi je web applikácia ktorá pomáha nájsť domácich maznáčikov.{' '}
            </p>
            <Link
              to="/map"
              className="w-52 h-16 bg-yellow-300 text-black flex justify-center items-center font-bold mt-28"
            >
              <p className="text-3xl">Mapa</p>
            </Link>
          </div>

          {/* <p>Sitting pet</p> */}
        </section>
      </section>

      <section className="">
        <section className="flex items-center justify-center">
          <img src={petImage} alt="Dog" className="h-96 mt-80" />
          <div className="ml-32 mt-80 w-96">
            <h2 className="text-3xl font-semibold">
              Stratil sa Vám váš domáci maznáčik?
            </h2>
            <p className="mt-5 font-extralight">
              Nechajte pômocť Vám nájsť ho a priviesť naspäť k vám domov.
            </p>
          </div>
        </section>

        <section className="mt-80 flex items-center justify-center flex-col mb-80">
          <h1 className="text-5xl font-semibold">Tak na čo ešte čakáte?</h1>
          <p className="font-extralight text-lg mt-8">
            {' '}
            Vytvorte profil pre Vášho strateného maznáčika.
          </p>
          <Link
            to="/lostpet"
            className="w-60 h-16 bg-yellow-300 text-black flex justify-center items-center font-bold mt-16 "
          >
            <p className="text-2xl">Vytvoriť profil</p>
          </Link>
        </section>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
