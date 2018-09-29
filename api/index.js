import axios from '~/plugins/axios'

export default {
  auth: {
    login: (data) => axios.post('auth', data)
  }
}
