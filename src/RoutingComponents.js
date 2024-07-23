import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import ErrorBoundary from './ErrorBoundary';
import LanDT from './pages/language/LanDT';
import LanPage from './pages/language/LanPage';
import MoviePage from './pages/movie/MoviePage'
import MovieDT from './pages/movie/MovieDT'
import ReviewDT from './pages/reviews/ReviewDT';
import ReviewPage from './pages/reviews/ReviewPage'
import AboutUsDT from './pages/aboutus/AboutUsDT'
import AboutUsPage from './pages/aboutus/AboutUsPage'

export default function RoutingComponents() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<ErrorBoundary key={location.pathname} componentName="WelcomePage"><WelcomePage /></ErrorBoundary>} >
      </Route>
      <Route path="movielanguage" element={<ErrorBoundary key={location.pathname} componentName="LanPage"><LanPage /></ErrorBoundary>}>
        <Route index element={<LanDT />} />
        <Route path="movielanguage" element={<ErrorBoundary key={location.pathname} componentName="LanDT"><LanDT /></ErrorBoundary>} />
      </Route>

      <Route path="movies" element={<ErrorBoundary key={location.pathname} componentName="MoviePage"><MoviePage /></ErrorBoundary>}>
        <Route index element={<MovieDT />} />
        <Route path="movies1" element={<ErrorBoundary key={location.pathname} componentName="MovieDT"><MovieDT /></ErrorBoundary>} />
      </Route>

      <Route path="moviereviews" element={<ErrorBoundary key={location.pathname} componentName="ReviewPage"><ReviewPage /></ErrorBoundary>}>
        <Route index element={<ReviewDT />} />
        <Route path="moviereviews1" element={<ErrorBoundary key={location.pathname} componentName="ReviewDT"><ReviewDT /></ErrorBoundary>} />
      </Route>
      
      <Route path="aboutus" element={<ErrorBoundary key={location.pathname} componentName="AboutUsPage"><AboutUsPage /></ErrorBoundary>}>
        <Route index element={<AboutUsDT />} />
        <Route path="aboutus1" element={<ErrorBoundary key={location.pathname} componentName="AboutUsDT"><AboutUsDT /></ErrorBoundary>} />
      </Route>

    </Routes>
  );
}
