<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <button class="close-btn" @click="$emit('close')">×</button>

        <div class="modal-header">
          <h2>登入</h2>
          <p class="subtitle">歡迎回來！請登入您的帳號</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">電子郵件</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="請輸入電子郵件"
              :class="{ 'error': errors.email }"
              @input="clearError('email')"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="password">密碼</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="請輸入密碼"
              :class="{ 'error': errors.password }"
              @input="clearError('password')"
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div v-if="authStore.error" class="error-banner">
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            class="login-button"
            :disabled="authStore.loading"
          >
            {{ authStore.loading ? '登入中...' : '登入' }}
          </button>
        </form>

        <div class="divider">
          <span>或</span>
        </div>

        <GoogleLoginButton />

        <div class="modal-footer">
          <p>還沒有帳號？ <a href="#" @click.prevent="$emit('switch-to-register')">立即註冊</a></p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import GoogleLoginButton from '@/components/GoogleLoginButton.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'switch-to-register', 'login-success'])

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const validateForm = () => {
  let isValid = true

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = '請輸入電子郵件'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = '請輸入有效的電子郵件'
    isValid = false
  }

  if (!form.password) {
    errors.password = '請輸入密碼'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = '密碼至少需要 6 個字元'
    isValid = false
  }

  return isValid
}

const clearError = (field) => {
  errors[field] = ''
}

const handleLogin = async () => {
  errors.email = ''
  errors.password = ''

  if (!validateForm()) {
    return
  }

  try {
    await authStore.login({
      email: form.email,
      password: form.password,
    })

    // 登入成功，關閉彈窗
    form.email = ''
    form.password = ''
    emit('login-success')
    emit('close')
  } catch (error) {
    if (error.response?.data?.errors) {
      Object.assign(errors, error.response.data.errors)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-container {
  position: relative;
  background: var(--bg-white);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: var(--bg-card);
  border-radius: 50%;
  font-size: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--border-light);
  color: var(--text-primary);
}

.modal-header {
  text-align: center;
  margin-bottom: 32px;
}

.modal-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid var(--border-light);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: var(--font-family);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-accent-purple);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: var(--color-primary);
}

.error-message {
  color: var(--color-primary);
  font-size: 12px;
  margin-top: 4px;
}

.error-banner {
  background-color: rgba(232, 90, 79, 0.1);
  color: var(--color-primary);
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.login-button {
  background: linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-primary-dark) 100%);
  color: var(--text-white);
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: var(--font-family);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-light);
}

.divider span {
  padding: 0 16px;
  color: var(--text-muted);
  font-size: 14px;
}

.modal-footer {
  margin-top: 24px;
  text-align: center;
}

.modal-footer p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.modal-footer a {
  color: var(--color-accent-purple);
  text-decoration: none;
  font-weight: 600;
}

.modal-footer a:hover {
  text-decoration: underline;
}
</style>
