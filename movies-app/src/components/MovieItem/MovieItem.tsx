import React from 'react';
import { Movie } from '../../types';

interface Props {
    movie: Movie;
    updateMovie: (id: string, title: string) => void;
}

const MovieItem: React.FC<Props> = ({ movie, updateMovie }) => {
    return (

        <div>
            <input
                type="text"
                value={movie.title}
                onChange={(e) => updateMovie(movie.id, e.target.value)}
            />
        </div>
    );
}

export default React.memo(MovieItem);
