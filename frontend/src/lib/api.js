import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const api = axios.create({ baseURL })

export async function fetchProducts(params) {
  const { data } = await api.get('/api/products', { params })
  return data
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


