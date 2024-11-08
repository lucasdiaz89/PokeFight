import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Ranking from './Components/Pages/Ranking';
import SearchPokemon from './Components/Pages/SearchPokemon';
import Battle from './Components/Pages/Battle';
import Favorites from './Components/Pages/Favorites';
import './Css/App.css';


const App = () => {
  const year = new Date(); 

  return (
    <div className="App">
      <NavBar />
      <main className="App-body">
        <Routes>
          <Route path="/" element={<Ranking />} />
          <Route path="/search" element={<SearchPokemon />} />
          <Route path="/battle/:pokemon1/:pokemon2" element={<Battle />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <footer className="App-footer">
        <p>Derechos reservados ®HeliodCompany {year.getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;