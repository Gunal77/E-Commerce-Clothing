import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../lib/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { motion } from 'framer-motion'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('M')
  const { addItem } = useCart()
  const { push } = useToast()

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProduct(id)
        setProduct(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      push('Please select a size')
      return
    }
    addItem({ ...product, size: selectedSize }, 1)
    push(`${product.title} (${selectedSize}) added to cart`)
  }

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!product) return <div className="text-center py-12 text-red-600">Product not found</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid md:grid-cols-2 gap-8 lg:gap-12"
    >
      <div className="relative">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'}
          alt={product.title}
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop' }}
          className="w-full rounded-2xl object-cover max-h-[600px] shadow-lg"
        />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{product.title}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        <div className="text-3xl font-bold">₹{product.price}</div>
        <div className="border-t pt-6">
          <label className="block text-sm font-semibold mb-3">Select Size</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg transition ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'bg-white hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-lg font-semibold transition"
        >
          Add to Cart
        </button>
        <div className="text-sm text-gray-500">
          <p>✓ Free shipping on orders over ₹999</p>
          <p>✓ 30-day return policy</p>
        </div>
      </div>
    </motion.div>
  )
}


