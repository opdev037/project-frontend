<template>
  <div class="callback-container">
    <div class="loading">
      <div class="spinner"></div>
      <p>正在處理 Google 登入...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 解析 URL hash 中的 token
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  const idToken = params.get('id_token')

  if (idToken) {
    // 解析 JWT token
    try {
      const payload = JSON.parse(atob(idToken.split('.')[1]))

      const user = {
        google_id: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture
      }

      // 發送訊息給父視窗
      window.opener.postMessage({
        type: 'google-login-success',
        user: user
      }, window.location.origin)

      // 關閉彈窗
      window.close()
    } catch (error) {
      console.error('Parse token error:', error)
      window.opener.postMessage({
        type: 'google-login-error',
        error: error.message
      }, window.location.origin)
      window.close()
    }
  } else {
    window.opener.postMessage({
      type: 'google-login-error',
      error: 'No token received'
    }, window.location.origin)
    window.close()
  }
})
</script>

<style scoped>
.callback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.loading {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading p {
  color: #666;
  font-size: 16px;
}
</style>
