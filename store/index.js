import api from '~/api'

export const state = () => ({
  sidebar: false,
  user: null
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}

export const actions = {
  login ({commit}, data) {
    return api.auth.login(data)
      .then(response => {
        commit('SET_USER', response.data)
        return response
      })
  }
}
