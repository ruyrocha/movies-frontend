<template>
  <v-container>
    <h2><nuxt-link to="/movies">Movies</nuxt-link></h2>

    <v-data-table
      :headers="headers"
      :items="list"
      class="elevation-1"
      hide-actions
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>
          <nuxt-link :to="'/movies/'+props.item.id">
            {{ props.item.title }}
          </nuxt-link>
        </td>
        <td class="text-xs-right">{{ props.item.release_date }}</td>
        <td>
          <v-btn v-if="isAuthenticated" color="error" @click="destroy(props.item.id)" flat icon>
            <v-icon>remove</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch ({store, params}) {
    await store.dispatch('movies/get')
  },
  data () {
    return {
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Title', align: 'left', value: 'title' },
        { text: 'Release Date', value: 'release_date' },
        { text: 'Actions', value: '' }
      ]
    }
  },
  computed: {
    ...mapState({
      list: state => {
        return state.movies.list
      }
    }),
    isAuthenticated () { return this.$store.getters.isAuthenticated }
  },
  methods: {
    destroy (id) {
      const store = this.$store
      store.dispatch('movies/delete', {
        id: id, token: store.getters.loggedUser.token || null
      }).then(() => store.dispatch('movies/get'))
    }
  }
}
</script>
