import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendMovies } from "../../tmdb-api";
import LoadMore from "../../components/LoadMore/LoadMore";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getTrendMovies(page);
        setTotalPages(data.total_pages);
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page]);

  return (
    <div>
      <h1>Trending today</h1>
      {error && <p>ERROR</p>}
      {loading && <p>Loading trending movies...</p>}
      <MovieList movies={movies} />
      {movies.length > 0 && !loading && !error && page < totalPages && (
        <LoadMore onClick={loadMore} />
      )}
    </div>
  );
}
