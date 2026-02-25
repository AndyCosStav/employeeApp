<script setup>
import EmployeeCard from '@/components/EmployeeCard.vue'
import { employeeApi } from '@/services/employeeApi'
import { ref, onMounted } from 'vue'

const employees = ref([])
const loading = ref(false)
const error = ref('')


async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await employeeApi.getAllEmployees()
    console.log(employees.value);
    employees.value = data;
    
  } catch (e) {
    error.value = e.message || 'Failed to load employee'
  } finally {
    loading.value = false
  }
}


// async function getEmployees() {
//   loading.value = true
//   error.value = ''

//   try {
//     console.log(`bearer token ${token}`);

//     const response = await fetch('http://localhost:8000/employees',{
//         method: "GET",
//         headers : { 
//           "Content-Type" : "application/json",
//           "Authorization" : `Bearer ${token}`
//         }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`)
//     }

//     const result = await response.json()

//     if (result.success) {
//       employees.value = result.data
//       console.log(employees.value);
//     } else {
//       throw new Error('API returned success: false')
//     }
//   } catch (err) {
//     error.value = err.message || 'Failed to fetch employees'
//     console.error('Error fetching employees:', err)
//   } finally {
//     loading.value = false
//   }
// }

onMounted(() => {
  load()
})
</script>

<template>
  <section class="employees-page">
    <div class="page-header">
      <h1>Employees</h1>
        <button class="refresh-btn" @click="load" :disabled="loading">
          {{ loading ? 'Refreshing...' : 'Refresh' }}
        </button>
    </div>

    <p v-if="loading" class="status">Loading employees...</p>
    <p v-else-if="error" class="status error">{{ error }}</p>
    <p v-else-if="employees.length === 0" class="status">No employees found.</p>

    <div v-else class="employee-grid">
      <EmployeeCard
        v-for="employee in employees"
        :key="employee._id"
        :employeeData="employee"
      />
    </div>
  </section>
</template>

<style scoped>
.employees-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.refresh-btn {
  border: none;
  background: #2563eb;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.refresh-btn:hover {
  background: #1d4ed8;
}

.status {
  margin: 0;
  padding: 12px 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.status.error {
  color: #991b1b;
  background: #fef2f2;
  border-color: #fecaca;
}

.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
</style>