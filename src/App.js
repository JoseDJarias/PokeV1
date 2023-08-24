import './App.css';
import Home from './components/Home';
import PokeData from './components/PokeData';
import Pokedex from './components/Pokedex';
import AppRouter from './router/AppRouter';


function App() {
  return (
    <div className="App">
      <AppRouter/>
      <PokeData/>
    </div>

  );
}

export default App;
