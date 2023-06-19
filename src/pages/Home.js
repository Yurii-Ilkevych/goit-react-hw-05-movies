import { useState, useEffect } from 'react';
import RenderTrendsMovie from '../components/RenderTrendsMovie/RenderTrendsMovie';
import fetchTrandingMovies from '../components/APi/fetchTrandingMovies';
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [statusPending, setStatusPending] = useState(false);
  const [notFaund, setNotFound] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  useEffect(() => {
    fetchTrandingMovies()
      .then(response => {
        if (response) {
          setStatusPending(true);
          setTrendingMovies(response.data.results);
        }else if(!response){
          setErrorServer(true)
        }else if(response.data.results.length === 0){
          setNotFound(true)
        }

      })

      return ()=> {
        setStatusPending(false)
        setNotFound(false)
        setErrorServer(false)
    }
  }, []);

  return (
    <div>
      <h2>Treding Today</h2>
      {statusPending && <RenderTrendsMovie movies={trendingMovies} />}
      {notFaund && <h2>We don't have any trends movies"</h2>}
      {errorServer && <h2>Server response error</h2>}
    </div>
  );
};

export default Home;
