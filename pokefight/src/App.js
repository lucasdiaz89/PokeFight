import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Ranking from './pages/Ranking';
import SearchPokemon from './pages/SearchPokemon';
import Battle from './pages/Battle';
import Favorites from './pages/Favorites';
import './styles/App.css';


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