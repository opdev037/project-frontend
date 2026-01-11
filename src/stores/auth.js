import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await authAPI.login(credentials)
      token.value = response.data.access_token
      user.value = response.data.user
      localStorage.setItem('auth_token', response.data.access_token)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '登入失敗'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null

    try {
      const response = await authAPI.register(userData)
      token.value = response.data.access_token
      user.value = response.data.user
      localStorage.setItem('auth_token', response.data.access_token)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || '註冊失敗'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function googleLogin(googleUser) {
    loading.value = true
    error.value = null

    try {
      const response = await authAPI.googleLogin(googleUser)
      token.value = response.data.access_token
      user.value = response.data.user
      localStorage.setItem('auth_token', response.data.access_token)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Google 登入失敗'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('auth_token')
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      const response = await authAPI.getUser()
      user.value = response.data
    } catch (err) {
      console.error('Fetch user error:', err)
      logout()
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    googleLogin,
    logout,
    fetchUser,
  }
})
