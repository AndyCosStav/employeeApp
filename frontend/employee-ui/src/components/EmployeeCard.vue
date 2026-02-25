<script setup>
const props = defineProps({
  employeeData: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="employee-card">
    <div class="card-header">
      <h3>{{ props.employeeData.firstname }} {{ props.employeeData.lastname }}</h3>
      <span class="badge">#{{ props.employeeData.employeeNumber }}</span>
    </div>

    <div class="card-body">
      <p>
        <span class="label">Department:</span>
        <span class="value">
          {{ props.employeeData.department || 'N/A' }}
        </span>
      </p>
      <p>
        <span class="label">ID:</span>
        <span class="value">{{ props.employeeData._id }}</span>
      </p>
                <RouterLink
      class="edit-link"
      :to="`/employees/${props.employeeData._id}/edit`"
    >
      Edit
    </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.employee-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.employee-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 8px;
  margin-bottom: 10px;
}

.card-header h3 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
}

.badge {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.edit-link {
  margin-top: 8px;
  align-self: flex-start;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;

  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;

  padding: 8px 12px;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.edit-link:hover {
  background: #dbeafe;
  border-color: #93c5fd;
  transform: translateY(-1px);
}

.edit-link:active {
  transform: translateY(0);
}

.edit-link:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.25);
  outline-offset: 2px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-body p {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.value {
  font-size: 0.95rem;
  color: #111827;
  word-break: break-word;
}
</style>