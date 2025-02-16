import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<p>Loading information...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
