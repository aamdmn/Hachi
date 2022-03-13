import { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState({});

  const formInfo = {
    name: 'Adam',
    email: 'adam@example.com',
  };

  useEffect(() => {
    fetch('/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <section className="h-screen w-screen bg-slate-700 text-white">
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
