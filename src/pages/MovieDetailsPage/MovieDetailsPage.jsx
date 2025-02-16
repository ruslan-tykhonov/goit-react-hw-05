import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMoviesById } from "../../tmdb-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackUrl = useRef(location.state ?? "/movies");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const defaultImage =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  return (
    <div>
      <NavLink to={goBackUrl.current}>Go back</NavLink>
      {error && <p>ERROR</p>}
      {loading && <p>Loading movies...</p>}
      {!loading && !error && (
        <div>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImage
            }
            alt={movie.title}
            width="240"
          />
          <h2>{movie.title}</h2>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          {movie.genres.length !== 0 ? (
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          ) : (
            <p>No information</p>
          )}
          <nav>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </nav>
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
