<template>
  <header class="header">
    <router-link to="/" class="logo">日語學習網</router-link>

    <nav class="nav">
      <router-link
        v-for="item in navItems"
        :key="item.id"
        :to="item.href"
        :class="['nav-item', { active: $route.path === item.href }]"
      >
        {{ item.label }}
      </router-link>
    </nav>

    <div class="header-right">
      <template v-if="authStore.isAuthenticated">
        <span class="username">{{ authStore.user?.name }}</span>
        <button class="logout-btn" @click="handleLogout">登出</button>
      </template>
      <template v-else>
        <router-link to="/login" class="login-link">登入</router-link>
        <router-link to="/register" class="register-btn">註冊</router-link>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

interface NavItem {
  id: string
  label: string
  href: string
}

const authStore = useAuthStore()
const router = useRouter()

const navItems = ref<NavItem[]>([
  { id: 'n5', label: '初級(N5)', href: '/courses/n5' },
  { id: 'n4', label: '進階(N4)', href: '/courses/n4' },
  { id: 'n3', label: '中級(N3)', href: '/courses/n3' },
  { id: 'hiragana', label: '五十音', href: '/hiragana' },
  { id: 'methods', label: '學習方法', href: '/methods' },
])

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 80px;
  background-color: var(--bg-white);
  border-bottom: 1px solid var(--border-light);
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  border-radius: 100px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-item:hover {
  background-color: rgba(232, 90, 79, 0.1);
}

.nav-item.active,
.nav-item.router-link-active {
  background-color: var(--color-primary);
  color: var(--text-white);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.login-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
}

.login-link:hover {
  color: var(--color-primary);
}

.logout-btn,
.register-btn {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  text-decoration: none;
}

.logout-btn:hover,
.register-btn:hover {
  opacity: 0.9;
}

@media (max-width: 1024px) {
  .header {
    padding: 0 24px;
  }

  .nav {
    display: none;
  }
}
</style>
