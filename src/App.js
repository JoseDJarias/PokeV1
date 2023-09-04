import './App.css';
import Pokedex from './components/Pokedex';
import AppRouter from './router/AppRouter';


function App() {
  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      <AppRouter/>
    </div>

  );
}

export default App;
