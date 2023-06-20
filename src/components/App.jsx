import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { SharedLayout } from './SharedLayout/SharedLayout';

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Rewievs = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />

        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="reviews" element={<Rewievs />} />
          <Route path="cast" element={<Cast />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
