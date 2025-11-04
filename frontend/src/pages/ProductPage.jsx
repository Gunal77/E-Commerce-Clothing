import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../lib/api'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

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

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Not found</div>

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img src={product.imageUrl} alt={product.title} className="w-full rounded-lg object-cover max-h-[520px]" />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <div className="text-2xl font-bold">₹{product.price}</div>
        <button className="bg-black text-white hover:bg-gray-800" onClick={() => addItem(product, 1)}>Add to cart</button>
      </div>
    </div>
  )
}


