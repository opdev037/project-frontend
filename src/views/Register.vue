<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1>日本語学習サイト</h1>
        <p class="subtitle">建立新帳號</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">名稱</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="請輸入您的名稱"
            :class="{ 'error': errors.name }"
            @input="clearError('name')"
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

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
            placeholder="至少 8 個字元"
            :class="{ 'error': errors.password }"
            @input="clearError('password')"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="password_confirmation">確認密碼</label>
          <input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            required
            placeholder="再次輸入密碼"
            :class="{ 'error': errors.password_confirmation }"
            @input="clearError('password_confirmation')"
          />
          <span v-if="errors.password_confirmation" class="error-message">
            {{ errors.password_confirmation }}
          </span>
        </div>

        <div v-if="authStore.error" class="error-banner">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          class="register-button"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? '註冊中...' : '註冊' }}
        </button>
      </form>

      <GoogleLoginButton />

      <div class="register-footer">
        <p>已經有帳號？ <a href="/login" @click.prevent="$router.push('/login')">登入</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import GoogleLoginButton from '@/components/GoogleLoginButton.vue'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const validateForm = () => {
  let isValid = true

  if (!form.name) {
    errors.name = '請輸入名稱'
    isValid = false
  } else if (form.name.length < 2) {
    errors.name = '名稱至少需要 2 個字元'
    isValid = false
  }

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
  } else if (form.password.length < 8) {
    errors.password = '密碼至少需要 8 個字元'
    isValid = false
  }

  if (!form.password_confirmation) {
    errors.password_confirmation = '請確認密碼'
    isValid = false
  } else if (form.password !== form.password_confirmation) {
    errors.password_confirmation = '密碼不一致'
    isValid = false
  }

  return isValid
}

const clearError = (field) => {
  errors[field] = ''
}

const handleRegister = async () => {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  if (!validateForm()) {
    return
  }

  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    })

    router.push('/')
  } catch (error) {
    if (error.response?.data?.errors) {
      Object.assign(errors, error.response.data.errors)
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  width: 100%;
}

.register-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h1 {
  font-size: 28px;
  color: #333;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.register-form {
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
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.error-banner {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.register-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.register-button:active:not(:disabled) {
  transform: translateY(0);
}

.register-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.register-footer {
  margin-top: 24px;
  text-align: center;
}

.register-footer p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.register-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.register-footer a:hover {
  text-decoration: underline;
}
</style>
