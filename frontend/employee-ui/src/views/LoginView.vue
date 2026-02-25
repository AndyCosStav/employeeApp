<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const router = useRouter()

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      errorMessage.value = data.message || 'Login failed'
      return
    }

localStorage.setItem('accessToken', data.accessToken)
window.dispatchEvent(new Event('auth-changed'))
router.push('/employees')
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Could not connect to server'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <h1>Employee App</h1>
        <p>Sign in to continue</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button class="login-button" type="submit" :disabled="isLoading">
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;

}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.02) inset;
  backdrop-filter: blur(8px);
}

.login-header {
  margin-bottom: 1.25rem;
  text-align: center;
}

.login-header h1 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #f8fafc;
}

.login-header p {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: #94a3b8;
}

.login-form {
  display: grid;
  gap: 1rem;
}

.form-group {
  display: grid;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #cbd5e1;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.9);
  color: #f8fafc;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #64748b;
}

.form-group input:focus {
  border-color: rgba(59, 130, 246, 0.8);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.error-message {
  margin: 0;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fecaca;
  font-size: 0.9rem;
}

.login-button {
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.06s ease, opacity 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
}

.login-button:hover:not(:disabled) {
  opacity: 0.95;
}

.login-button:active:not(:disabled) {
  transform: translateY(1px);
}

.login-button:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}
</style>