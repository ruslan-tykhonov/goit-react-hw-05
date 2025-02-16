import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getSearchMovies } from "../../tmdb-api";
import { useSearchParams } from "react-router-dom";
import LoadMore from "../../components/LoadMore/LoadMore";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const query = searchParams.get("query") ?? "";

  const handleChangeQuery = (value) => {
    searchParams.set("query", value);
    setSearchParams(searchParams);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getSearchMovies(query, page);
        setTotalPages(data.total_pages);
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [query, page]);

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {error && <p>ERROR</p>}
      {loading && <p>Loading trending movies...</p>}
      <MovieList movies={movies} />
      {movies.length > 0 && !loading && !error && page < totalPages && (
        <LoadMore onClick={loadMore} />
      )}
    </div>
  );
}
