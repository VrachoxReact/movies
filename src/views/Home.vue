<template>
  <div class="home">
    <h1>Movie Explorer</h1>
    <div class="search-filter-container">
      <input
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Search movies..."
        class="search-input"
      />
      <select v-model="sortBy" @change="fetchMovies" class="filter-select">
        <option value="popularity.desc">Popularity (Descending)</option>
        <option value="popularity.asc">Popularity (Ascending)</option>
        <option value="vote_average.desc">Rating (Descending)</option>
        <option value="vote_average.asc">Rating (Ascending)</option>
        <option value="release_date.desc">Release Date (Descending)</option>
        <option value="release_date.asc">Release Date (Ascending)</option>
      </select>
      <input
        v-model="year"
        @input="debouncedSearch"
        placeholder="Filter by year"
        class="year-input"
        type="number"
      />
    </div>
    <Suspense>
      <template #default>
        <MovieList :movies="movies" />
      </template>
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import MovieList from "../components/MovieList.vue";
import { useMovies } from "../composables/useMovies";

interface SearchParams {
  sort_by: string;
  year: string;
  query: string;
}

const searchQuery = ref("");
const sortBy = ref("popularity.desc");
const year = ref("");

const { movies, error, fetchMovies } = useMovies();

const params = computed<SearchParams>(() => ({
  sort_by: sortBy.value,
  year: year.value,
  query: searchQuery.value,
}));

let timeout: number | null = null;

function debouncedSearch() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    fetchMovies(params.value);
  }, 300);
}

watch([sortBy], () => {
  fetchMovies(params.value);
});

// Initial fetch
fetchMovies(params.value);
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input,
.filter-select,
.year-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-input {
  flex-grow: 1;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>
