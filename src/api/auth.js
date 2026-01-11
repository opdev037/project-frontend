import apiClient from './axios'

export const authAPI = {
  login(credentials) {
    return apiClient.post('/api/login', credentials)
  },

  register(userData) {
    return apiClient.post('/api/register', userData)
  },

  googleLogin(googleUser) {
    return apiClient.post('/api/auth/google', googleUser)
  },

  logout() {
    return apiClient.post('/api/logout')
  },

  getUser() {
    return apiClient.get('/api/me')
  }
}
