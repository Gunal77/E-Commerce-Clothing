import { useEffect, useState } from 'react'
import { fetchProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'
import TrendingRow from '../components/TrendingRow'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts()
        const list = Array.isArray(data) ? data : []
        // Pick top 5 as "Trending"
        setProducts(list.slice(0, 5))
        setError('')
      } catch (e) {
        console.error('Failed to load products', e)
        if (e.code === 'ECONNREFUSED' || e.message?.includes('Network Error')) {
          setError('Cannot connect to backend server. Please ensure the backend is running on port 5000.')
        } else {
          setError('Unable to load products from the server.')
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading products...</div>

  if (error) {
    return (
      <>
        <Hero />
        <CategoryGrid />
        <div className="max-w-lg mx-auto text-center space-y-4 p-8 border rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="text-red-600 font-medium text-lg">{error}</div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>To fix this:</p>
            <ol className="list-decimal list-inside space-y-1 text-left max-w-md mx-auto">
              <li>Start the backend: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">cd backend && npm run dev</code></li>
              <li>Seed products: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">npm run seed:products</code></li>
              <li>Verify: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">curl http://localhost:5000/api/products</code></li>
            </ol>
          </div>
        </div>
      </>
    )
  }

  if (!products.length) {
    return (
      <div className="text-center text-gray-600">
        <div className="text-lg font-medium">No products yet</div>
        <p className="text-sm">Add products to MongoDB to see them here.</p>
      </div>
    )
  }

  return (
    <>
      <Hero />
      <CategoryGrid />
      <TrendingRow products={products} />
    </>
  )
}


