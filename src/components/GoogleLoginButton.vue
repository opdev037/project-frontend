<template>
  <div class="google-login-wrapper">
    <div class="divider">
      <span>或</span>
    </div>
    <button @click="handleGoogleLogin" class="google-login-button" :disabled="loading">
      <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>{{ loading ? '登入中...' : '使用 Google 帳號登入' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)

const handleGoogleLogin = () => {
  loading.value = true

  // Google OAuth Client ID (需要在 .env 設置)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    alert('請在 .env 檔案中設置 VITE_GOOGLE_CLIENT_ID')
    loading.value = false
    return
  }

  const redirectUri = `${window.location.origin}/auth/google/callback`
  const scope = 'email profile'
  const responseType = 'token id_token'

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=${responseType}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `nonce=${Math.random().toString(36)}`

  // 打開 Google 登入視窗
  const width = 500
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  const popup = window.open(
    authUrl,
    'Google Login',
    `width=${width},height=${height},left=${left},top=${top}`
  )

  // 監聽訊息
  const messageHandler = async (event) => {
    if (event.origin !== window.location.origin) return

    if (event.data.type === 'google-login-success') {
      try {
        await authStore.googleLogin(event.data.user)
        router.push('/')
      } catch (error) {
        console.error('Google login error:', error)
      } finally {
        loading.value = false
        window.removeEventListener('message', messageHandler)
      }
    } else if (event.data.type === 'google-login-error') {
      loading.value = false
      window.removeEventListener('message', messageHandler)
      alert('Google 登入失敗')
    }
  }

  window.addEventListener('message', messageHandler)

  // 檢查彈窗是否被關閉
  const checkClosed = setInterval(() => {
    if (popup && popup.closed) {
      clearInterval(checkClosed)
      loading.value = false
      window.removeEventListener('message', messageHandler)
    }
  }, 1000)
}
</script>

<style scoped>
.google-login-wrapper {
  margin-top: 24px;
}

.divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
}

.divider span {
  position: relative;
  background: white;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
}

.google-login-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 24px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.google-login-button:hover:not(:disabled) {
  border-color: #4285F4;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
}

.google-login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.google-icon {
  flex-shrink: 0;
}
</style>
