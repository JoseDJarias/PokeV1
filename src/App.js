import './App.css';
import Header from './components/Header';
import Pokedex from './components/Pokedex';
import AppRouter from './router/AppRouter';


function App() {
  return (
    <div className="App">
      <AppRouter/>

      {/* <Pokedex /> */}
    </div>

  );
}

export default App;
