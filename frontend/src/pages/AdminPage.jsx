import { useEffect, useState } from 'react'
import { fetchProducts, api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', price: '', imageUrl: '', category: 'men', stock: '' })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadProducts()
  }, [user, navigate])

  const loadProducts = async () => {
    try {
      const data = await fetchProducts()
      setProducts(data)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/api/products/${editing._id}`, form)
      } else {
        await api.post('/api/products', { ...form, isActive: true })
      }
      setEditing(null)
      setForm({ title: '', description: '', price: '', imageUrl: '', category: 'men', stock: '' })
      loadProducts()
    } catch (err) {
      alert('Error saving product')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/api/products/${id}`)
      loadProducts()
    } catch (err) {
      alert('Error deleting product')
    }
  }

  const startEdit = (p) => {
    setEditing(p)
    setForm({ title: p.title, description: p.description, price: p.price, imageUrl: p.imageUrl, category: p.category, stock: p.stock })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin - Product Management</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-black text-white rounded">
                {editing ? 'Update' : 'Add'} Product
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', price: '', imageUrl: '', category: 'men', stock: '' }) }} className="px-4 py-2 border rounded">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Products ({products.length})</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {products.map(p => (
              <div key={p._id} className="border rounded p-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-gray-500">₹{p.price} • {p.category}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

