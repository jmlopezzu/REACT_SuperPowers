import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useState, useEffect, useRef } from 'react'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

    useEffect(() => {
      if (isFirstInput.current){
        isFirstInput.current = search == ''
        return
      }

      if (search == '') {
        setError('No se puede buscar una pelicula vacía')
        return
      }

      if (search.match(/^\d+$/)) {
        setError('No se puede buscar una pelicula con un numero')
        return
      }

      if (search.length < 3) {
        setError('La consulta debe tener al menos 3 letras')
        return
      }

    setError(null)
    }, [search])

  return { search, updateSearch, error }
  }

  function App() {
    const { search, updateSearch, error } = useSearch()
    const { movies, getMovies } = useMovies({ search })

    const handleSubmit = (event) => {
      event.preventDefault()
      getMovies()
    }
  
      const handleChange = (event) => {
        updateSearch(event.target.value)
      }
  

  return (
  <div className ='page'>

    <header>
      <h3>JMLZ DEV</h3>
      <h1>Buscador de películas en React</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input style={{ 
          border: '1px solid transparent', 
          borderColor: error ? 'red' : 'transparent'}} 
          required 
          onChange={handleChange} 
          value = {search} 
          name='query' 
          placeholder='Avengers, Star wars, The Matrix...' />     
        <button type='submit'>Buscar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </header>

    <main>
      <Movies movies={movies} />
    </main>
    </div>
  )
}

export default App
