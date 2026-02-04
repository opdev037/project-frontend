<template>
  <div class="app">
    <AppHeader
      @open-login="showLoginModal = true"
      @open-register="goToRegister"
    />
    <HeroSection />
    <main class="content-wrapper">
      <NewsSection />
      <CoursesSection />
    </main>
    <AppFooter />

    <!-- 登入彈窗 -->
    <LoginModal
      :is-open="showLoginModal"
      @close="showLoginModal = false"
      @switch-to-register="switchToRegister"
      @login-success="onLoginSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/design/AppHeader.vue'
import HeroSection from '@/components/design/HeroSection.vue'
import NewsSection from '@/components/design/NewsSection.vue'
import CoursesSection from '@/components/design/CoursesSection.vue'
import AppFooter from '@/components/design/AppFooter.vue'
import LoginModal from '@/components/design/LoginModal.vue'

const authStore = useAuthStore()
const router = useRouter()

const showLoginModal = ref(false)

onMounted(async () => {
  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchUser()
  }
})

const goToRegister = () => {
  router.push('/register')
}

const switchToRegister = () => {
  showLoginModal.value = false
  router.push('/register')
}

const onLoginSuccess = () => {
  // 登入成功後可以做一些事情，例如顯示歡迎訊息
  console.log('登入成功！')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  padding: 48px 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (max-width: 1024px) {
  .content-wrapper {
    padding: 32px 24px;
    gap: 32px;
  }
}
</style>
