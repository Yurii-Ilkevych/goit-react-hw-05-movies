import { useState, useEffect } from 'react';
import RenderTrendsMovie from '../components/RenderTrendsMovie/RenderTrendsMovie';
import fetchTrandingMovies from '../components/APi/fetchTrandingMovies';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [statusPending, setStatusPending] = useState(false);

  useEffect(() => {
    fetchTrandingMovies()
      .then(trendMovies => {
        if (trendMovies) {
          setStatusPending(true);
        }
        setTrendingMovies(trendMovies);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Treding Today</h2>
      {statusPending && <RenderTrendsMovie movies={trendingMovies} />}
    </div>
  );
};

export default Home;
