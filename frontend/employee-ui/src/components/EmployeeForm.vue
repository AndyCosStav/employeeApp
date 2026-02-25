<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  submitText: {
    type: String,
    default: 'Save'
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <section class="employee-page">
    <div class="page-header" v-if="title || subtitle">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <form class="employee-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="firstname">First name</label>
        <input
          id="firstname"
          v-model="form.firstname"
          type="text"
          placeholder="e.g. Hank"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="lastname">Last name</label>
        <input
          id="lastname"
          v-model="form.lastname"
          type="text"
          placeholder="e.g. Hill"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="department">Department</label>
        <input
          id="department"
          v-model="form.department"
          type="text"
          placeholder="e.g. Accounts"
          :disabled="loading"
        />
      </div>

      <div class="actions">
        <button
          v-if="$attrs.onCancel"
          type="button"
          class="secondary-btn"
          @click="emit('cancel')"
          :disabled="loading"
        >
          Cancel
        </button>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Saving...' : submitText }}
        </button>
      </div>

      <p v-if="successMessage" class="status success">{{ successMessage }}</p>
      <p v-if="error" class="status error">{{ error }}</p>
    </form>
  </section>
</template>

<style scoped>
.employee-page {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #111827;
}

.page-header p {
  margin: 6px 0 0 0;
  color: #6b7280;
}

.employee-form {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  color: #374151;
}

.form-group input {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.95rem;
  outline: none;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.submit-btn,
.secondary-btn {
  border: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn {
  background: #2563eb;
  color: white;
}

.submit-btn:hover:enabled {
  background: #1d4ed8;
}

.secondary-btn {
  background: #e5e7eb;
  color: #111827;
}

.secondary-btn:hover:enabled {
  background: #d1d5db;
}

.submit-btn:disabled,
.secondary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.status {
  margin: 0;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 0.95rem;
}

.status.success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.status.error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
</style>