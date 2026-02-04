<template>
  <section class="courses-section">
    <div class="section-header">
      <span class="accent-bar" style="background-color: var(--color-accent-purple)"></span>
      <h2 class="section-title">免費試聽課程</h2>
    </div>

    <p class="section-desc">每個級別都有免費試聽課程，隨時觀看！</p>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="courses-grid">
      <CourseCard
        v-for="course in filteredCourses"
        :key="course.id"
        :course="course"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import CourseCard from './CourseCard.vue'

const tabs = ref([
  { id: 'n5', label: '初級(N5)' },
  { id: 'n4', label: '進階(N4)' },
  { id: 'n3', label: '中級(N3)' },
])

const activeTab = ref('n5')

const courses = ref([
  {
    id: '1',
    title: '五十音入門',
    description: '平假名、片假名完整教學',
    image: '/images/course-hiragana.png',
    lessons: 12,
    level: 'n5',
    isFree: true,
  },
  {
    id: '2',
    title: '基礎會話',
    description: '日常問候與自我介紹',
    image: '/images/course-conversation.png',
    lessons: 8,
    level: 'n5',
    isFree: true,
  },
  {
    id: '3',
    title: '數字與時間',
    description: '日語數字、日期、時間表達',
    image: '/images/course-numbers.png',
    lessons: 6,
    level: 'n5',
    isFree: true,
  },
  {
    id: '4',
    title: '動詞變化',
    description: '動詞的基本變化規則',
    lessons: 10,
    level: 'n4',
    isFree: true,
  },
  {
    id: '5',
    title: '形容詞用法',
    description: 'い形容詞與な形容詞',
    lessons: 8,
    level: 'n4',
    isFree: true,
  },
  {
    id: '6',
    title: '敬語入門',
    description: '日語敬語的基本概念',
    lessons: 12,
    level: 'n3',
    isFree: true,
  },
])

const filteredCourses = computed(() => {
  return courses.value.filter(course => course.level === activeTab.value)
})
</script>

<style scoped>
.courses-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.section-desc {
  font-size: 16px;
  color: var(--color-primary);
}

.tabs {
  display: flex;
}

.tab {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  background: none;
  border: none;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  color: var(--color-primary);
}

.tab.active {
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: 3px solid var(--color-primary);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>
