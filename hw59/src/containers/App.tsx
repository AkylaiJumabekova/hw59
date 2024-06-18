import React, { useState, useEffect } from 'react';
import MovieItem from '../components/MovieItem/MovieItem';
import JokeItem from '../components/JokeItem/JokeItem';
import NextJokeButton from '../components/NextJokeButton/NextJokeButton';
import { Movie, Joke } from '../types';
import './App.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [newMovieTitle, setNewMovieTitle] = useState('');

  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const fetchJokes = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        Array.from({ length: 5 }).map(() =>
          fetch('https://v2.jokeapi.dev/joke/Programming')
        )
      );
      const jokesData = await Promise.all(responses.map(res => res.json()));
      const jokesArray = jokesData.map(joke =>
        joke.type === 'single' ? joke.joke : `${joke.setup} - ${joke.delivery}`
      );
      setJokes(jokesArray.map(joke => ({ id: Math.random().toString(), value: joke })));
    } catch (error) {
      console.error('Error fetching jokes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

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

  const deleteMovie = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <div className="App">
      <h1>Movie Tracker</h1>
      <div className="add-movie">
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <button className="add-button" onClick={addMovie}>Add</button>
      </div>
      <div>
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
            updateMovie={updateMovie}
            deleteMovie={deleteMovie}
          />
        ))}
      </div>
      <h2>Jokes</h2>
      <NextJokeButton fetchJokes={fetchJokes} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {jokes.map(joke => (
            <JokeItem key={joke.id} joke={joke} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
