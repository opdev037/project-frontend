<template>
  <section class="hero">
    <!-- 背景輪播圖 -->
    <div class="carousel-background">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <img
          v-for="(image, index) in carouselImages"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          class="carousel-image"
        />
      </div>
      <div class="carousel-overlay"></div>
    </div>

    <!-- 內容 -->
    <div class="hero-content">
      <span class="hero-badge">🎌 2025年 最受歡迎的日語學習平台</span>
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

    <!-- 輪播指示器 -->
    <div class="carousel-indicators">
      <button
        v-for="(_, index) in carouselImages"
        :key="index"
        :class="['indicator', { active: currentSlide === index }]"
        @click="currentSlide = index"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const carouselImages = ref([
  { src: '/images/shrine.jpg', alt: '日本神社' },
  { src: '/images/bamboo.jpg', alt: '竹林' },
  { src: '/images/street.jpg', alt: '日本街道' },
])

const currentSlide = ref(0)
let intervalId = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselImages.value.length
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 480px;
  padding: 60px 80px;
  overflow: hidden;
}

/* 背景輪播圖 */
.carousel-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.8s ease-in-out;
}

.carousel-image {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
}

/* 半透明遮罩 */
.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

/* 內容區塊 */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  max-width: 800px;
}

.hero-badge {
  display: inline-block;
  width: fit-content;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-white);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--text-white);
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
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
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cta-secondary:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 輪播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.indicator.active {
  background-color: var(--bg-white);
  border-color: var(--bg-white);
}

@media (max-width: 1024px) {
  .hero {
    padding: 60px 24px;
    min-height: 420px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
    text-align: center;
  }
}
</style>
