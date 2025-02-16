import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesById } from "../../tmdb-api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMoviesById(movieId, "reviews");
        setReviews(data.reviews.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      {error && <p>ERROR</p>}
      {loading && <p>Loading reviews...</p>}
      <ul>
        {reviews.length !== 0 ? (
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })
        ) : (
          <p>Any reviews yet</p>
        )}
      </ul>
    </div>
  );
}
