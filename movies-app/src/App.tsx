import React, { useState } from 'react';
import MovieItem from './components/MovieItem/MovieItem';
import { Movie } from './types';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState('');

  const addMovie = () => {
    const newMovie: Movie = {
      id: Math.random().toString(),
      title: newMovieTitle,
    };
    setMovies([...movies, newMovie]);
    setNewMovieTitle('');
  };

  const updateMovie = (id: string, title: string) => {
    setMovies(movies.map(movie => movie.id === id ? { ...movie, title } : movie));
  };

  return (
    <div className="App">
      <h1>Movie Tracker</h1>
      <div>
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <button onClick={addMovie}>Add</button>
      </div>
      <div>
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
            updateMovie={updateMovie}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
