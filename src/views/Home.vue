<template>
  <div class="app">
    <AppHeader />
    <HeroSection />
    <main class="content-wrapper">
      <NewsSection />
      <CoursesSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/design/AppHeader.vue'
import HeroSection from '@/components/design/HeroSection.vue'
import NewsSection from '@/components/design/NewsSection.vue'
import CoursesSection from '@/components/design/CoursesSection.vue'
import AppFooter from '@/components/design/AppFooter.vue'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchUser()
  }
})
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
