<template>
  <div class="dashboard">
    <!-- 導航欄 -->
    <nav class="navbar">
      <div class="navbar-content">
        <div class="navbar-left">
          <h1 class="logo">日語測試網</h1>
          <div class="nav-links">
            <a href="#" @click.prevent="currentTab = 'home'" :class="{ active: currentTab === 'home' }">初級(N5)</a>
            <a href="#" @click.prevent="currentTab = 'n4'" :class="{ active: currentTab === 'n4' }">進階(N4)</a>
            <a href="#" @click.prevent="currentTab = 'n3'" :class="{ active: currentTab === 'n3' }">中級(N3)</a>
            <a href="#" @click.prevent="currentTab = 'gojuon'" :class="{ active: currentTab === 'gojuon' }">五十音</a>
            <a href="#" @click.prevent="currentTab = 'methods'" :class="{ active: currentTab === 'methods' }">學習方法</a>
          </div>
        </div>
        <div class="navbar-right">
          <div class="user-info" v-if="authStore.user">
            <img v-if="authStore.user.avatar" :src="authStore.user.avatar" alt="avatar" class="user-avatar" />
            <span class="user-name">{{ authStore.user.name }}</span>
            <button @click="handleLogout" class="logout-btn">登出</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <main class="main-content">
      <!-- 輪播橫幅 -->
      <section class="banner-section">
        <div class="banner-slider">
          <div class="banner-slide" :class="{ active: currentSlide === 0 }">
            <div class="banner-content">
              <h2>五十音完全攻略</h2>
              <p>免費天天30分鐘，輕鬆搞定五十音</p>
              <button class="cta-button">一起加入挑戰！</button>
            </div>
          </div>
        </div>
        <div class="slider-dots">
          <span class="dot" :class="{ active: currentSlide === 0 }" @click="currentSlide = 0"></span>
          <span class="dot" :class="{ active: currentSlide === 1 }" @click="currentSlide = 1"></span>
          <span class="dot" :class="{ active: currentSlide === 2 }" @click="currentSlide = 2"></span>
        </div>
      </section>

      <!-- 最新消息 -->
      <section class="news-section">
        <h3 class="section-title">最新消息</h3>
        <div class="news-list">
          <a href="#" class="news-item">學習の秘訣「一年內從零開始，輕鬆學會N3」</a>
          <a href="#" class="news-item">免費好禮｜五十音練習簿、練習帳、實用日語PDF</a>
          <a href="#" class="news-item">7天免費訓練｜每天30分鐘，輕鬆搞定五十音</a>
        </div>
      </section>

      <!-- 免費試聽課程 -->
      <section class="courses-section">
        <div class="section-header">
          <h3 class="section-title">免費試聽課程</h3>
          <p class="section-subtitle">每個級別都有免費試聽課程，隨時觀看！</p>
        </div>

        <div class="tabs">
          <button class="tab-button" :class="{ active: courseTab === 'n5' }" @click="courseTab = 'n5'">初級(N5)</button>
          <button class="tab-button" :class="{ active: courseTab === 'n4' }" @click="courseTab = 'n4'">進階(N4)</button>
          <button class="tab-button" :class="{ active: courseTab === 'n3' }" @click="courseTab = 'n3'">中級(N3)</button>
        </div>

        <div class="courses-grid">
          <div class="course-card" v-for="course in filteredCourses" :key="course.id">
            <div class="course-thumbnail">
              <div class="play-button">▶</div>
              <div class="course-level" :class="course.level">{{ course.levelText }}</div>
            </div>
            <div class="course-info">
              <h4 class="course-title">{{ course.title }}</h4>
            </div>
          </div>
        </div>
      </section>

      <!-- 五十音學習區 -->
      <section class="gojuon-section" v-if="currentTab === 'gojuon'">
        <div class="section-header">
          <h3 class="section-title">五十音/初學者</h3>
          <p class="section-subtitle">免費使用！提供五十音、濁音、拗音、促音、長音、重音、日語音調等介紹。</p>
        </div>

        <div class="gojuon-grid">
          <div class="gojuon-card">
            <h4>📝 初學者必看！</h4>
            <h3>長音</h3>
            <p>了解日語長音的規則和用法</p>
          </div>

          <div class="gojuon-card">
            <h4>📝 初學者必看！</h4>
            <h3>濁音/半濁音</h3>
            <p>掌握濁音和半濁音的發音技巧</p>
          </div>

          <div class="gojuon-card">
            <h4>📝 初學者必看！</h4>
            <h3>拗音</h3>
            <p>學習拗音的組合規則</p>
          </div>

          <div class="gojuon-card">
            <h4>📝 初學者必看！</h4>
            <h3>促音</h3>
            <p>理解促音在句子中的作用</p>
          </div>
        </div>
      </section>

      <!-- 學習方法區 -->
      <section class="methods-section" v-if="currentTab === 'methods'">
        <div class="section-header">
          <h3 class="section-title">學習方法</h3>
          <p class="section-subtitle">免費使用！介紹五十音及有效學習日語方法的文章。</p>
        </div>

        <div class="methods-grid">
          <div class="method-card">
            <div class="method-image">📚</div>
            <h4>JLPT日檢N5考什麼？</h4>
            <p>完整解析N5考試內容和準備方向</p>
          </div>

          <div class="method-card">
            <div class="method-image">📚</div>
            <h4>JLPT日檢N4考什麼？</h4>
            <p>了解N4考試重點和學習策略</p>
          </div>

          <div class="method-card">
            <div class="method-image">📚</div>
            <h4>JLPT日檢N3考什麼？</h4>
            <p>掌握N3考試技巧和準備方法</p>
          </div>

          <div class="method-card">
            <div class="method-image">💡</div>
            <h4>如何有效學習日語？</h4>
            <p>分享實用的日語學習技巧和方法</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const currentTab = ref('home')
const courseTab = ref('n5')
const currentSlide = ref(0)

const courses = ref([
  { id: 1, title: '與Q太郎的相遇（Q太郎との出会い）', level: 'n5', levelText: '初級(N5)試聽課程' },
  { id: 2, title: '自我介紹（自己紹介）', level: 'n5', levelText: '初級(N5)試聽課程' },
  { id: 3, title: '點餐好難（注文を取るのが難しい）', level: 'n4', levelText: '進階(N4)試聽課程' },
  { id: 4, title: '兼職工作（アルバイト）', level: 'n4', levelText: '進階(N4)試聽課程' },
  { id: 5, title: '居酒屋打工的煩惱（居酒屋のバイトの悩み）', level: 'n3', levelText: '中級(N3)試聽課程' },
  { id: 6, title: '面試（面接）', level: 'n3', levelText: '中級(N3)試聽課程' },
])

const filteredCourses = computed(() => {
  return courses.value.filter(course => course.level === courseTab.value)
})

onMounted(async () => {
  if (authStore.isAuthenticated && !authStore.user) {
    await authStore.fetchUser()
  }

  // 自動輪播
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 3
  }, 5000)
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f7fa;
}

/* 導航欄 */
.navbar {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  font-size: 20px;
  color: #ff4081;
  margin: 0;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
  background: #f0f0f0;
  color: #ff4081;
}

.navbar-right .user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.user-name {
  font-size: 14px;
  color: #333;
}

.logout-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background: #d32f2f;
}

/* 主要內容 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

/* 輪播橫幅 */
.banner-section {
  margin: 32px 0;
  position: relative;
}

.banner-slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  overflow: hidden;
  height: 400px;
}

.banner-slide {
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 60px;
  text-align: center;
}

.banner-slide.active {
  display: flex;
}

.banner-content h2 {
  font-size: 48px;
  color: white;
  margin: 0 0 16px 0;
  font-weight: 700;
}

.banner-content p {
  font-size: 24px;
  color: white;
  margin: 0 0 32px 0;
}

.cta-button {
  background: #ff4081;
  color: white;
  border: none;
  padding: 16px 48px;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
}

.slider-dots {
  text-align: center;
  margin-top: 16px;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  margin: 0 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dot.active {
  background: #667eea;
}

/* 最新消息 */
.news-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  color: #333;
  margin: 0 0 16px 0;
  font-weight: 600;
  border-left: 4px solid #ff4081;
  padding-left: 12px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-item {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.news-item:hover {
  color: #ff4081;
  text-decoration: underline;
}

/* 課程區 */
.courses-section,
.gojuon-section,
.methods-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 24px;
}

.section-subtitle {
  color: #666;
  font-size: 14px;
  margin: 8px 0 0 0;
}

.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid #f0f0f0;
}

.tab-button {
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  margin-bottom: -2px;
}

.tab-button.active {
  color: #ff4081;
  border-bottom-color: #ff4081;
  font-weight: 600;
}

.courses-grid,
.gojuon-grid,
.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.course-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.course-thumbnail {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #667eea;
}

.course-level {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  color: #ff4081;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.course-info {
  padding: 16px;
}

.course-title {
  font-size: 15px;
  color: #333;
  margin: 0;
  line-height: 1.5;
}

.gojuon-card,
.method-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.gojuon-card:hover,
.method-card:hover {
  transform: translateY(-4px);
  background: #f0f0f0;
}

.gojuon-card h4,
.method-card h4 {
  font-size: 13px;
  color: #ff4081;
  margin: 0 0 8px 0;
}

.gojuon-card h3 {
  font-size: 24px;
  color: #333;
  margin: 0 0 8px 0;
}

.gojuon-card p,
.method-card p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.method-image {
  font-size: 48px;
  margin-bottom: 16px;
}
</style>
