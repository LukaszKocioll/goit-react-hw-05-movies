import React, { lazy, Suspense } from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navigation from './Navigation/Navigation';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
