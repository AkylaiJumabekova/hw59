import React from 'react';
import { Joke } from '../../types';

interface Props {
  joke: Joke;
}

const JokeItem: React.FC<Props> = ({ joke }) => {
  return (
    <div className="JokeItem">
      <p>{joke.value}</p>
    </div>
  );
}

export default React.memo(JokeItem);
