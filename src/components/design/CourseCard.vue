<template>
  <article class="course-card" @click="$emit('click')">
    <div class="card-image">
      <div class="image-placeholder">
        <span>{{ course.title.charAt(0) }}</span>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ course.title }}</h3>
      <p class="card-desc">{{ course.description }}</p>
      <div class="card-meta">
        <span class="lessons">{{ course.lessons }} 課時</span>
        <span class="separator">•</span>
        <span v-if="course.isFree" class="free-badge">免費</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
export interface Course {
  id: string
  title: string
  description: string
  image?: string
  lessons: number
  level: string
  isFree: boolean
}

defineProps<{
  course: Course
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.course-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(26, 25, 24, 0.08);
}

.card-image {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lessons {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent-purple);
}

.separator {
  font-size: 12px;
  color: var(--border-muted);
}

.free-badge {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent-green);
}
</style>
