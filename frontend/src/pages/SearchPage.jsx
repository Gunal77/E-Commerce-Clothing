import { useEffect, useState } from 'react'
import { fetchProducts } from '../lib/api'
import ProductCard from '../components/ProductCard'
import { useSearch } from '../context/SearchContext'

export default function SearchPage() {
  const { searchQuery } = useSearch()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts()
        const filtered = data.filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setProducts(filtered)
      } finally {
        setLoading(false)
      }
    })()
  }, [searchQuery])

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Search results for "{searchQuery}"
      </h1>
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  )
}

