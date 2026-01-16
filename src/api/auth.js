import apiClient from './axios'

export const authAPI = {
  login(credentials) {
    return apiClient.post('/login', credentials)
  },

  register(userData) {
    return apiClient.post('/register', userData)
  },

  googleLogin(googleUser) {
    return apiClient.post('/auth/google', googleUser)
  },

  logout() {
    return apiClient.post('/logout')
  },

  getUser() {
    return apiClient.get('/me')
  }
}
