import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RenderSearchMovie from '../components/RenderSearchMovie/RenderSearchMovie';
import fetchSearchMovies from 'api/fetchSearchMovies';

const Movies = () => {
  
  const [query, setQuery] = useState('');
  const [foundMovies, setFoundMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusPending, setStatusPending] = useState(false);
  const [statusErrorServer, setStatusErrorServer] = useState(false);
  const [statusNotFaund, setStatusNotFound] = useState(false);

  useEffect(() => {
    const value = searchParams.get('query');
    if (value === null) {
      setStatusPending(false);
      setStatusNotFound(false);
      return;
    }

    fetchSearchMovies(value).then(response => {
      if (response && response.data.results.length !== 0) {
        setFoundMovies(response.data.results);
        setStatusPending(true);
        setStatusNotFound(false);
      } else if (response.data.results.length === 0) {
        setStatusNotFound(true);
      } else if (!response) {
        setStatusErrorServer(true);
      }
    });

    return () => {
      setStatusPending(false);
      setStatusNotFound(false);
      setStatusErrorServer(false);
    };
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();

    updateQueryString(query.trim());
    setQuery('');
  };

  const handleInput = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const updateQueryString = query => {
    const currentParams = query !== '' ? { query } : {};
    setSearchParams(currentParams);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={query} onChange={handleInput}></input>
        </label>
        <button type="submit">Search</button>
      </form>
      {statusPending && <RenderSearchMovie movies={foundMovies} />}
      {statusNotFaund && (
        <h2>
          We don't have any movies by string "{searchParams.get('query')}"
        </h2>
      )}
      {statusErrorServer && <h2>Server response error</h2>}
    </>
  );
};

export default Movies;
