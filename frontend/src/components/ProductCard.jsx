import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { motion } from 'framer-motion'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [flash, setFlash] = useState(false)
  const { push } = useToast()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`group border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition ${flash ? 'ring-2 ring-emerald-500' : ''}`}
    >
      <div className="relative">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'}
          alt={product.title}
          className="w-full h-60 object-cover transition group-hover:scale-[1.02]"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop' }}
        />
        {product.category ? (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold px-2 py-1 rounded-full border">
            {product.category}
          </span>
        ) : null}
      </div>
      <div className="p-4 space-y-2">
        <Link to={`/product/${product._id}`} className="font-semibold hover:underline block tracking-tight">{product.title}</Link>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold">₹{product.price}</span>
          <button
            className={`bg-black text-white rounded-md px-4 py-2 transition ${flash ? 'animate-pulse' : 'hover:bg-gray-800'}`}
            onClick={() => {
              addItem(product, 1)
              setFlash(true)
              push(`${product.title} added to cart`)
              setTimeout(() => setFlash(false), 600)
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}


