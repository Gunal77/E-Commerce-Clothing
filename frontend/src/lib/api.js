import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const api = axios.create({ 
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function fetchProducts(params) {
  try {
    const { data } = await api.get('/api/products', { params })
    return data
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message)
    throw error
  }
}

export async function fetchProduct(id) {
  const { data } = await api.get(`/api/products/${id}`)
  return data
}

export async function createOrder(items) {
  const { data } = await api.post('/api/orders/create', { items })
  return data
}

export async function verifyPayment(payload) {
  const { data } = await api.post('/api/orders/verify', payload)
  return data
}


