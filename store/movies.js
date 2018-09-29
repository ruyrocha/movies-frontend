import merge from 'lodash.merge'
import axios from '~/plugins/axios'

export const state = () => ({
  list: [],
  movie: {}
})

export const mutations = {
  set (state, movies) {
    state.list = movies
  },
  add (state, value) {
    merge(state.list, value)
  },
  remove (state, {movie}) {
    state.list.splice(state.list.indexOf(movie), 1)
  },
  setMovie (state, movie) {
    state.movie = movie
  }
}

export const actions = {
  async get ({commit}) {
    const response = await axios.get('/movies')
    commit('set', response.data)
  },
  async show ({commit}, params) {
    const response = await axios.get(`movies/${params.id}`)
    commit('setMovie', response.data)
  },
  delete ({commit}, params) {
    const { token, id } = params
    return axios.delete(`/movies/${id}`, { headers: { Authorization: 'Bearer ' + token } })
  }
}
