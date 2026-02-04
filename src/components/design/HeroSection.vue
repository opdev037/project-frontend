<template>
  <section class="hero">
    <div class="hero-content">
      <span class="hero-badge">🎌 2024年 最受歡迎的日語學習平台</span>
      <h1 class="hero-title">
        輕鬆學日語<br />
        從零開始的JLPT之旅
      </h1>
      <p class="hero-subtitle">
        互動式課程、智慧練習系統、完整的N5~N3考試準備<br />
        讓你在最短時間內掌握日語能力
      </p>
      <div class="hero-cta">
        <router-link v-if="!authStore.isAuthenticated" to="/register" class="cta-primary">
          免費開始學習
        </router-link>
        <router-link v-else to="/courses/n5" class="cta-primary">
          開始學習
        </router-link>
        <button class="cta-secondary">觀看介紹影片</button>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-placeholder">
        <span class="placeholder-text">🗾</span>
        <span class="placeholder-subtitle">日本語学習</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  gap: 60px;
  min-height: 480px;
  padding: 60px 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-badge {
  display: inline-block;
  width: fit-content;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-white);
  background-color: rgba(255, 255, 255, 0.125);
  border-radius: 100px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-white);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cta-primary {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary-dark);
  background-color: var(--bg-white);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cta-secondary {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-white);
  background-color: rgba(255, 255, 255, 0.125);
  border: 1px solid rgba(255, 255, 255, 0.375);
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cta-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hero-visual {
  width: 400px;
  height: 360px;
  flex-shrink: 0;
  background-color: var(--bg-white);
  border-radius: 20px;
  overflow: hidden;
}

.hero-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.placeholder-text {
  font-size: 80px;
}

.placeholder-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-top: 16px;
}

@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    padding: 40px;
  }

  .hero-content {
    text-align: center;
    align-items: center;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-visual {
    width: 100%;
    max-width: 400px;
    height: 280px;
  }
}
</style>
