import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesById } from "../../tmdb-api";

export default function MovieCast() {
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cast, setCast] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoviesById(movieId, "credits");
        setCast(data.credits.cast);
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
      {error && <p>ERROR</p>}
      {loading && <p>Loading cast...</p>}
      {cast ? (
        <ul>
          {cast.map((part) => {
            return (
              <li key={part.id}>
                <img
                  src={
                    part.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${part.profile_path}`
                      : defaultImage
                  }
                  alt={part.name}
                  width="120"
                />
                <h4>{part.name}</h4>
                <p>{part.character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No information</p>
      )}
    </div>
  );
}
