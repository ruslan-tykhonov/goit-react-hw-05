import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import { nanoid } from "nanoid";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.movieList}>
        {movies.map((movie) => {
          return (
            <li key={nanoid()}>
              <NavLink to={`/movies/${movie.id.toString()}`} state={location}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width="240"
                />
                <h2>{movie.title}</h2>
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
