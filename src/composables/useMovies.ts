import { ref, Ref } from "vue";
import tmdbApi from "../services/tmdbApi";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface SearchParams {
  sort_by: string;
  year: string;
  query: string;
}

export function useMovies() {
  const movies: Ref<Movie[]> = ref([]);
  const error: Ref<string | null> = ref(null);

  async function fetchMovies(params: SearchParams) {
    try {
      error.value = null;
      let response;

      if (params.query) {
        response = await tmdbApi.searchMovies(params.query);
      } else {
        response = await tmdbApi.discoverMovies(params);
      }

      movies.value = response.data.results;
    } catch (err) {
      error.value =
        "An error occurred while fetching movies. Please try again.";
      console.error(err);
    }
  }

  return {
    movies,
    error,
    fetchMovies,
  };
}
