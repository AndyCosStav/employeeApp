<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = ref(null)

function syncAuthState() {
  token.value = localStorage.getItem('accessToken')
}

const isLoggedIn = computed(() => !!token.value)

function handleAuthChanged() {
  syncAuthState()
}

function logout() {
  localStorage.removeItem('accessToken')
  syncAuthState()

  // notify this tab immediately
  window.dispatchEvent(new Event('auth-changed'))

  router.push('/login')
}

onMounted(() => {
  syncAuthState()

  // other tabs
  window.addEventListener('storage', handleAuthChanged)

  // this tab
  window.addEventListener('auth-changed', handleAuthChanged)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleAuthChanged)
  window.removeEventListener('auth-changed', handleAuthChanged)
})
</script>

<template>
  <div class="app-shell">
    <nav class="top-nav">
      <div class="nav-inner">
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/employees">Employees</RouterLink>
          <RouterLink to="/employees/add">Add Employee</RouterLink>
        </div>

        <div class="nav-actions">
          <RouterLink v-if="!isLoggedIn" to="/login" class="auth-btn login-btn">
            Login
          </RouterLink>

          <button v-else class="auth-btn logout-btn" @click="logout">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="page-content">

      <RouterView @vue:mounted="syncAuthState" />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f5f7fb;
  color: #1f2937;
}

.top-nav {
  background: #111827;
  border-bottom: 1px solid #1f2937;
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.nav-links {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links a {
  color: #d1d5db;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-links a:hover {
  background: #1f2937;
  color: #fff;
}

/* Vue Router active link */
.nav-links a.router-link-active {
  background: #2563eb;
  color: white;
}

.nav-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.auth-btn {
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.06s ease, background 0.2s ease;
}

/* Login button style (fits dark nav) */
.login-btn {
  background: #2563eb;
  color: #fff;
}

.login-btn:hover {
  background: #1d4ed8;
}

.login-btn.router-link-active {
  background: #1d4ed8;
  color: #fff;
}

/* Logout button style */
.logout-btn {
  background: #374151;
  color: #f9fafb;
}

.logout-btn:hover {
  background: #4b5563;
}

.auth-btn:active {
  transform: translateY(1px);
}

.page-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 20px;
}
</style>