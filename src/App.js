import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  function fetchMoviesHandler(){
    setIsLoading(true);
    setError(null);
    fetch('https://swapi.dev/api/film').then(response => {
             return response.json();
    }).then(data => {
      const transformMovies = data.results.map(movieData => {
           return {
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.release_date
           }
      });
      setMovies(transformMovies);
      setIsLoading(false);
    });
  }
  return (
    <React.Fragment>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

      {!isLoading && movies.length === 0 && <p>No Movies Found</p>}
      {isLoading && <p>Loading......</p>}
    </section>
  </React.Fragment>
  );
  
}

export default App;
