import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export default {
  getPopularMovies(page = 1) {
    return apiClient.get("/movie/popular", { params: { page } });
  },
  searchMovies(query, page = 1) {
    return apiClient.get("/search/movie", { params: { query, page } });
  },
  discoverMovies(params) {
    return apiClient.get("/discover/movie", { params });
  },
  getMovieDetails(movieId) {
    return apiClient.get(`/movie/${movieId}`, {
      params: { append_to_response: "images,videos" },
    });
  },
};
