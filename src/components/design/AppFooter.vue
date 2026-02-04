<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <h3 class="footer-logo">日語學習網</h3>
        <p class="footer-tagline">輕鬆學日語，從這裡開始</p>
      </div>

      <div class="footer-links">
        <div v-for="column in linkColumns" :key="column.title" class="link-column">
          <h4 class="column-title">{{ column.title }}</h4>
          <router-link
            v-for="link in column.links"
            :key="link.text"
            :to="link.href"
            class="footer-link"
          >
            {{ link.text }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright">© 2024 日語學習網. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Link {
  text: string
  href: string
}

interface LinkColumn {
  title: string
  links: Link[]
}

const linkColumns = ref<LinkColumn[]>([
  {
    title: '課程',
    links: [
      { text: '初級(N5)', href: '/courses/n5' },
      { text: '進階(N4)', href: '/courses/n4' },
      { text: '中級(N3)', href: '/courses/n3' },
    ],
  },
  {
    title: '學習資源',
    links: [
      { text: '五十音表', href: '/hiragana' },
      { text: '學習方法', href: '/methods' },
      { text: '練習題庫', href: '/practice' },
    ],
  },
  {
    title: '關於',
    links: [
      { text: '關於我們', href: '/about' },
      { text: '聯絡方式', href: '/contact' },
      { text: '隱私政策', href: '/privacy' },
    ],
  },
])
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 48px 80px;
  background-color: var(--bg-dark);
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-white);
}

.footer-tagline {
  font-size: 14px;
  color: var(--text-muted);
}

.footer-links {
  display: flex;
  gap: 64px;
}

.link-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.column-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-white);
}

.footer-link {
  font-size: 14px;
  color: var(--text-muted);
  transition: color 0.2s ease;
  text-decoration: none;
}

.footer-link:hover {
  color: var(--text-white);
}

.footer-bottom {
  display: flex;
  justify-content: center;
  padding-top: 24px;
  border-top: 1px solid var(--border-dark);
}

.copyright {
  font-size: 12px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .footer {
    padding: 32px 24px;
  }

  .footer-content {
    flex-direction: column;
    gap: 32px;
  }

  .footer-links {
    flex-wrap: wrap;
    gap: 32px;
  }
}
</style>
