import React from 'react';
import { Movie } from '../../../types';
import '../../../containers/Movies.css';

interface Props {
  movie: Movie;
  updateMovie: (id: string, title: string) => void;
  deleteMovie: (id: string) => void;
}

const MovieItem: React.FC<Props> = ({ movie, updateMovie, deleteMovie }) => {
  return (
    <div className="MovieItem">
      <input 
        type="text" 
        value={movie.title} 
        onChange={(e) => updateMovie(movie.id, e.target.value)} 
      />
      <button onClick={() => deleteMovie(movie.id)}>Delete</button>
    </div>
  );
}

export default React.memo(MovieItem);
