const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem('accessToken')
}

async function request(path, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })


  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    window.dispatchEvent(new Event('auth-changed'))
    window.location.href = '/login' 
    throw new Error('Session expired. Please log in again.')
  }

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || `HTTP error: ${res.status}`)
  }

  if (data?.success === false) {
    throw new Error(data?.message || 'Request failed')
  }

  return data?.data ?? data
}

export const employeeApi = {

  getAllEmployees(){
    return request(`/employees`, {method: 'GET'})
  }, 

  getById(id) {
    return request(`/employee/${id}`, { method: 'GET' })
  },
  create(payload) {
    return request('/employee', { method: 'POST', body: JSON.stringify(payload) })
  },
  update(id, payload) {
    return request(`/employee/${id}`, { method: 'PATCH', body: JSON.stringify(payload) })
  },
  remove(id) {
    return request(`/employee/${id}`, { method: 'DELETE' })
  }
}