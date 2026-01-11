<template>
  <div class="home-container">
    <nav class="navbar">
      <div class="navbar-content">
        <h1>日本語学習サイト</h1>
        <div class="user-info">
          <span v-if="authStore.user">歡迎, {{ authStore.user.name }}!</span>
          <button @click="handleLogout" class="logout-button">登出</button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <div class="welcome-section">
        <h2>歡迎來到日文學習網站</h2>
        <p>開始您的日語學習之旅！</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3>學習課程</h3>
          <p>從基礎到進階的完整日語課程</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">✍️</div>
          <h3>練習題</h3>
          <p>豐富的練習題幫助您鞏固知識</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3>測驗</h3>
          <p>定期測驗檢驗您的學習成果</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>學習進度</h3>
          <p>追蹤您的學習進度和成就</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchUser()
  }
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info span {
  color: #666;
  font-size: 14px;
}

.logout-button {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: #d32f2f;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 48px;
}

.welcome-section h2 {
  font-size: 36px;
  color: #333;
  margin: 0 0 12px 0;
}

.welcome-section p {
  font-size: 18px;
  color: #666;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  color: #333;
  margin: 0 0 12px 0;
}

.feature-card p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}
</style>
