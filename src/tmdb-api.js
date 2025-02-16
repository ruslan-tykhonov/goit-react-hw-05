import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const KEY_API =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGZhMTY5M2I5ZDE4MmVmOGZmY2M4MTVmODA5MWQ3NSIsIm5iZiI6MTczODk0NzM2Ny4wNzEsInN1YiI6IjY3YTYzYjI3NGQ1MzZjYjkzMjY2ZWQzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uNBU1ySOjevLflQlIWPvmHn6N4eQ6rb23DgoKO96Gio";

const axiosOptions = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${KEY_API}`,
  },
});

export async function getTrendMovies(page) {
  const { data } = await axiosOptions.get("/trending/movie/day", {
    params: { page },
  });
  return data;
}

export async function getSearchMovies(query, page) {
  const { data } = await axiosOptions.get("/search/movie", {
    params: { query, page },
  });
  return data;
}

export async function getMoviesById(movieId, appendResponse = "") {
  const { data } = await axiosOptions.get(`/movie/${movieId}`, {
    params: {
      append_to_response: appendResponse,
    },
  });
  return data;
}
