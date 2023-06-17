import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import fetchMovieDetails from '../components/APi/fetchMovieDetails';
import defaultPoster from "./img/Frame770814.png"
import { GoBack, Wrapper, LinkMovie, WrapperUl } from './MovieDetails.styled';
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [statusPending, setStatusPending] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [linkBack, setLinkBack] = useState("/")
  const { movieId } = useParams();
  const location = useLocation();


  useEffect(() => {
if(!location.state?.from){
  return
}
    const goBack = location.state?.from ?? '/';
    setLinkBack(goBack)
    fetchMovieDetails(movieId).then(result => {
      if (result) {
        setMovie(result.data);
        setStatusPending(true);
        return;
      } else if (!result) setMovie(null);
      setErrorServer(true);
    });

    return () => {
      setErrorServer(false);
    };
  }, [location.state?.from, movieId]);

  const getImg = movie => {
    const { backdrop_path, poster_path } = movie;
    if (poster_path) {
      return `https://image.tmdb.org/t/p/original/${poster_path}`;
    } else if (backdrop_path) {
      return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    }else{return defaultPoster}
  };
  const getTitle = movie => {
    const { title, name } = movie;
    if (title) {
      return title;
    } else if (name) {
      return name;
    } else {
      return 'No name';
    }
  };
  const getUserScore = userScore => {
    if (userScore) {
      return `${(userScore * 10).toFixed()}%`;
    } else {
      return 'No user score';
    }
  };
  const getOwerviev = overview => {
    if (overview) {
      return overview;
    } else {
      return 'No owerview';
    }
  };
  const getGenre = genres => {
    if (genres) {
      const genresMovie = genres.map(genre => genre.name);
      return genresMovie.join(', ');
    } else {
      return 'No genre';
    }
  };
  const getYear = ({ release_date, first_air_date }) => {
    if (release_date) {
      return release_date.split('').slice(0, 4).join('');
    } else if (first_air_date) {
      return first_air_date.split('').slice(0, 4).join('');
    } else {
      return 'No date';
    }
  };
  return (
    <div>
      <GoBack to={linkBack}>← go back</GoBack>
      {statusPending ? (
        <Wrapper>
          <div>
            <img
              src={getImg(movie)}
              alt={getTitle(movie)}
              width={160}
              height={180}
            ></img>
          </div>
          <h2>
            {getTitle(movie)} <span>({getYear(movie)})</span>
          </h2>
          <p>User Score: {getUserScore(movie.vote_average)}</p>
          <h3>Owerview</h3>
          <p>{getOwerviev(movie.overview)}</p>
          <h3>Genre</h3>
          <p>{getGenre(movie.genres)}</p>
        </Wrapper>
      ) : (
        <Wrapper>
          <div>
            <img src={defaultPoster} alt="poster" width={160} height={180}></img>
          </div>
          <h2>
            Title <span>(....)</span>
          </h2>
          <p>User Score: ...%</p>
          <h3>Owerview</h3>
          <p>...</p>
          <h3>Genre</h3>
          <p>...</p>
        </Wrapper>
      )}
      {errorServer && <h2>Server response error</h2>}
      <WrapperUl>
        <h3>Additional information</h3>
        <li>
          <LinkMovie to="cast">Cast</LinkMovie>
        </li>
        <li>
          <LinkMovie to="reviews">Reviews</LinkMovie>
        </li>
      </WrapperUl>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
