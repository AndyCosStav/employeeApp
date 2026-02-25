<script setup>
import { ref } from 'vue'
import EmployeeForm from '../components/EmployeeForm.vue'
import { employeeApi } from '../services/employeeApi.js'

const form = ref({ firstname: '', lastname: '', department: '' })
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

async function submit() {
  error.value = ''
  successMessage.value = ''

  if (!form.value.firstname.trim() || !form.value.lastname.trim() || !form.value.department.trim()) {
    error.value = 'Please enter first name, last name and department'
    return
  }

  loading.value = true
  try {
    await employeeApi.create({
      firstname: form.value.firstname.trim(),
      lastname: form.value.lastname.trim(),
      department: form.value.department.trim()
    })

    successMessage.value = 'Employee added successfully ✅'
    form.value = { firstname: '', lastname: '', department: '' }
  } catch (e) {
    error.value = e.message || 'Failed to add employee'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <EmployeeForm
    v-model="form"
    :loading="loading"
    submit-text="Add Employee"
    title="Add Employee"
    subtitle="Create a new employee record"
    :error="error"
    :success-message="successMessage"
    @submit="submit"
  />
</template>