import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="h-screen w-screen bg-slate-700">
        <h2 className="text-black">This is home page</h2>
        <Link to="/map">
          <p className="text-yellow-500 text-4xl font-bold flex justify-center align-center">
            Go to map
          </p>
        </Link>
      </section>
    </div>
  );
}

export default Home;
