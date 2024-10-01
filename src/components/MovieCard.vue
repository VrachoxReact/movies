<template>
  <router-link
    :to="{ name: 'MovieDetails', params: { id: movie.id } }"
    class="movie-card card"
  >
    <img :src="posterUrl" :alt="movie.title" />
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <p>Release Date: {{ movie.release_date }}</p>
      <p>Rating: {{ movie.vote_average.toFixed(1) }}/10</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const posterUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${props.movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Poster";
});
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.movie-card img {
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.movie-info {
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-info h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
}

.movie-info p {
  margin: 5px 0;
  font-size: 0.9rem;
}
</style>
