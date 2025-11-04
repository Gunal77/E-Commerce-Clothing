import { useEffect, useState, useMemo } from 'react'
import { fetchProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

export default function WomenSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts({ category: 'women' })
        setProducts(data)
      } catch (e) {
        setError('Unable to load women\'s clothing')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    let filtered = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price)
    if (sortBy === 'name') filtered.sort((a, b) => a.title.localeCompare(b.title))
    return filtered
  }, [products, priceRange, sortBy])

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Women&apos;s Clothing</h1>
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-sm font-semibold mr-2">Price Range:</label>
          <select
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="px-3 py-1 border rounded"
          >
            <option value={5000}>All Prices</option>
            <option value={1000}>Under ₹1000</option>
            <option value={2000}>Under ₹2000</option>
            <option value={3000}>Under ₹3000</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mr-2">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border rounded"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No products found</div>}
    </div>
  )
}


