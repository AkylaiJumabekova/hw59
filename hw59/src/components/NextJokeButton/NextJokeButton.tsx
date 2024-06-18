import React from 'react';

interface Props {
  fetchJokes: () => void;
}

const NextJokeButton: React.FC<Props> = ({ fetchJokes }) => {
  return (
    <button onClick={fetchJokes} className="fetch-button">
      Fetch New Jokes
    </button>
  );
};

export default React.memo(NextJokeButton);
