import { useEffect, useState } from 'react'
import './index.css'
import pokedexLogo from '/pokedex.png'

function App() {
  // Arreglo const
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/pokemons')
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [])

  function getTipoClass(types) {
    // Puedes ajustar esto según tus necesidades
    const tipoClassMap = {
      'Planta': 'tipo-planta',
      'Fuego': 'tipo-fuego',
      'Veneno': 'tipo-veneno',
      'Volador': 'tipo-volador',
      'Electrico': 'tipo-electrico'
    };
  
    // Aplica la clase del primer tipo y, si hay un segundo tipo, también la del segundo tipo
    return types.map(type => `tipo-${type.toLowerCase()}`).join(' ');
  }

  console.log(pokemons)

  return (
  <>
    <div className='navbar'>
      <nav>
        <img src={pokedexLogo} alt='Logo de Pokedex' className='pokedex-logo' />
      </nav>
    </div>

    <div className='pokemon-list'>
  {pokemons.map((pokemon) => (
    <div key={pokemon._id} className='pokemon-card'>
      <div className='pokemon-imagen'>
        <img src={pokemon.image} alt={pokemon.name} />
        <p className='pokemon-number-back'>{pokemon.number}</p>
      </div>
      <div className='pokemon-info'>
        <h2 className='pokemon-nombre'>{pokemon.name}</h2>
        <div className='pokemon-contenedor'>
          <div className='pokemon-tipo'>
            {pokemon.types.map((type, index) => (
              <div key={index} className={`pokemon-tipo tipo-${type.toLowerCase()}`}>
                {type}
              </div>  
            ))}
            <p className='pokemon-power'>{pokemon.power}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
  </>
  )
}

export default App
