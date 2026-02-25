<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EmployeeForm from '../components/EmployeeForm.vue'
import { employeeApi } from '../services/employeeApi.js'

const route = useRoute()
const router = useRouter()
const employeeId = route.params.id

const form = ref({ firstname: '', lastname: '', department: '' })
const loading = ref(false)
const error = ref('')
const successMessage = ref('')
const isDeleting = ref(false)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const employee = await employeeApi.getById(employeeId)
    form.value = {
      firstname: employee.firstname || '',
      lastname: employee.lastname || '',
      department: employee.department || ''
    }
  } catch (e) {
    error.value = e.message || 'Failed to load employee'
  } finally {
    loading.value = false
  }
}

async function submit() {
  error.value = ''
  successMessage.value = ''

  if (!form.value.firstname.trim() || !form.value.lastname.trim() || !form.value.department.trim()) {
    error.value = 'Please enter first name, last name and department'
    return
  }

  loading.value = true
  try {
    await employeeApi.update(employeeId, {
      firstname: form.value.firstname.trim(),
      lastname: form.value.lastname.trim(),
      department: form.value.department.trim()
    })
    successMessage.value = 'Employee updated successfully ✅'
  } catch (e) {
    error.value = e.message || 'Failed to update employee'
  } finally {
    loading.value = false
  }
}

async function deleteEmployee() {
  error.value = ''
  isDeleting.value = true
  try {
    await employeeApi.remove(employeeId)
    router.push('/employees')
  } catch (e) {
    error.value = e.message || 'Failed to delete employee'
  } finally {
    isDeleting.value = false
  }
}

onMounted(load)
</script>

<template>
  <div>
    
    <div class="danger-row" v-if="!loading" style="max-width:640px;margin:0 auto 12px;display:flex;justify-content:flex-end;">
      <button class="danger-btn" @click="deleteEmployee" :disabled="isDeleting || loading">
        {{ isDeleting ? 'Deleting...' : 'Delete' }}
      </button>
    </div>

    <EmployeeForm
      v-model="form"
      :loading="loading"
      submit-text="Save Changes"
      title="Edit Employee"
      subtitle="Update employee details"
      :error="error"
      :success-message="successMessage"
      @submit="submit"
      @cancel="router.push('/employees')"
    />
  </div>
</template>

<style scoped>
.danger-btn{
  border:none;
  background:#ef4444;
  color:white;
  padding:10px 14px;
  border-radius:10px;
  font-weight:700;
  cursor:pointer;
}
.danger-btn:hover:enabled{ background:#dc2626; }
.danger-btn:disabled{ opacity:.7; cursor:not-allowed; }
</style>