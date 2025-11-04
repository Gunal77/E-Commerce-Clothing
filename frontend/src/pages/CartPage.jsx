import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, total, setQuantity, removeItem } = useCart()

  if (!items.length) return (
    <div className="text-center space-y-4">
      <div>Your cart is empty.</div>
      <Link to="/" className="underline">Continue shopping</Link>
    </div>
  )

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {items.map(item => {
          const categoryMap = {
            electronics: 'hoodie',
            kitchen: 'shirts',
            men: 'shirts',
            women: 'shirts',
            apparel: 'shirts',
            unisex: 'hoodie',
            hoodie: 'hoodie',
            shirts: 'shirts'
          }
          const displayCategory = categoryMap[item.category] || item.category || ''
          return (
          <div key={item._id} className="flex gap-4 border rounded-lg p-4">
            <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="flex items-center gap-2">
                {displayCategory ? (
                  <span className="text-xs bg-gray-100 border rounded-full px-2 py-0.5 text-gray-700">{displayCategory}</span>
                ) : null}
                <div className="text-sm text-gray-500">₹{item.price}</div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="text-sm">Qty:</label>
                <input type="number" min={1} value={item.quantity} onChange={e => setQuantity(item._id, Number(e.target.value))} className="w-20 border rounded px-2 py-1" />
                <button className="ml-auto text-red-600" onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </div>
          </div>
          )
        })}
      </div>
      <div className="border rounded-lg p-4 h-fit">
        <div className="flex items-center justify-between mb-2">
          <span>Subtotal</span>
          <span className="font-semibold">₹{total.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="block text-center bg-black text-white hover:bg-gray-800 rounded-md py-2 mt-4">Checkout</Link>
      </div>
    </div>
  )
}


