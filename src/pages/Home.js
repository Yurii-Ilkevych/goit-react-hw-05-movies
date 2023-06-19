import { useState, useEffect } from 'react';
import RenderTrendsMovie from '../components/RenderTrendsMovie/RenderTrendsMovie';
import fetchTrandingMovies from '../components/APi/fetchTrandingMovies';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [statusPending, setStatusPending] = useState(false);
  const [statusErrorServer, setStatusErrorServer] = useState(false);
  const [statusNotFaund, setStatusNotFound] = useState(false);
  useEffect(() => {
    fetchTrandingMovies().then(response => {
      if (response) {
        setStatusPending(true);
        setTrendingMovies(response.data.results);
      } else if (!response) {
        setStatusErrorServer(true);
      } else if (response.data.results.length === 0) {
        setStatusNotFound(true);
      }
    });

    return () => {
      setStatusPending(false);
      setStatusNotFound(false);
      setStatusErrorServer(false);
    };
  }, []);

  return (
    <div>
      <h2>Treding Today</h2>
      {statusPending && <RenderTrendsMovie movies={trendingMovies} />}
      {statusNotFaund && <h2>We don't have any trends movies"</h2>}
      {statusErrorServer && <h2>Server response error</h2>}
    </div>
  );
};

export default Home;
