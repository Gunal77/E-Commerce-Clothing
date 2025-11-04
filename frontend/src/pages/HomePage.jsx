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
      } catch (e) {
        console.error('Failed to load products', e)
        setError('Unable to load products from the server.')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading products...</div>

  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-2">
        <div className="text-red-600 font-medium">{error}</div>
        <p className="text-sm text-gray-600">Ensure the backend is running and has products.</p>
        <div className="text-xs text-gray-500 break-all">Check: http://localhost:5000/api/products</div>
      </div>
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


