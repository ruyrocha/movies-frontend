<template>
  <v-container>
    <h3>{{$store.state.movies.movie.title}}</h3>
  </v-container>
</template>

<script>
export default {
  async fetch ({store, params}) {
    await store.dispatch('movies/show', {id: params.id})
  }
}
</script>
