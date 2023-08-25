


          // const [randomPokemons, setRandomPokemons ] = useState ([]);
          // useEffect ( () =>{
          //     const fetchRandomPokemon = async () => {
          //         try {
          //             const getRandomPokemonId = () => Math.floor(Math.random() * 200) + 1; // funcion que trae aleatorios
          //             //[100, 4,30,25]
          //             const pokemonIds = Array.from({length: 4},getRandomPokemonId ); // Array .from(tamañ, contenido o como llenar el contenido) 
      
          //             // [ { name : Pikachu, img:""}, { name : Charmander, img:""}]
          //             const fetchedPokemons = [];
      
          //             for (const id of pokemonIds ){
          //                 const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
          //                 const data = await response.json();
          //                 fetchedPokemons.push(data);
          //             }
      
          //             setRandomPokemons(fetchedPokemons);
      
          //         } catch (error) {
          //             console.error("Error capturando Pokemon data", error);
          //         }
      
          //     };
          // fetchRandomPokemon();
          // }, [])