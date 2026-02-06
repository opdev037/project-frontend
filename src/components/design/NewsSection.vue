<template>
  <section class="news-section">
    <div class="section-header">
      <span class="accent-bar" style="background-color: var(--color-primary)"></span>
      <h2 class="section-title">最新消息</h2>
    </div>
    <div class="news-items">
      <a
        v-for="item in newsItems"
        :key="item.id"
        :href="item.href"
        class="news-item"
      >
        <span class="news-dot" :style="{ backgroundColor: item.color }"></span>
        <span class="news-text" :style="{ color: item.color }">{{ item.text }}</span>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NewsItem {
  id: string
  text: string
  color: string
  href: string
}

const newsItems = ref<NewsItem[]>([
  {
    id: '1',
    text: '學習の秘訣「一年內從零開始，輕鬆學會N3」',
    color: '#E85A4F',
    href: '/news/1',
  },
  {
    id: '2',
    text: '免費好禮｜五十音練習簿、練習帳、實用日語PDF',
    color: '#667eea',
    href: '/news/2',
  },
  {
    id: '3',
    text: '7天免費訓練｜每天30分鐘，輕鬆搞定五十音',
    color: '#3D8A5A',
    href: '/news/3',
  },
])
</script>

<style scoped>
.news-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
  background-color: var(--bg-white);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accent-bar {
  width: 4px;
  height: 28px;
  border-radius: 2px;
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.news-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-item {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: opacity 0.2s ease;
  text-decoration: none;
}

.news-item:hover {
  opacity: 0.8;
}

.news-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.news-text {
  font-size: 16px;
  font-weight: 400;
}
</style>
