import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createOrder, verifyPayment } from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onPay = async () => {
    setLoading(true)
    try {
      const order = await createOrder(items.map(({ _id, title, price, quantity }) => ({ _id, title, price, quantity })))
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'ShopX',
        description: 'Order Payment',
        order_id: order.orderId,
        handler: async function (response) {
          const payload = {
            orderId: order.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }
          const res = await verifyPayment(payload)
          if (res.success) {
            clear()
            navigate('/')
            alert('Payment successful')
          } else {
            alert('Payment verification failed')
          }
        },
        theme: { color: '#111827' }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e) {
      console.error(e)
      alert('Failed to initialize payment')
    } finally {
      setLoading(false)
    }
  }

  if (!items.length) return <div>Your cart is empty.</div>

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-2">Order summary</h2>
        <ul className="space-y-1 text-sm">
          {items.map(i => (
            <li key={i._id} className="flex justify-between">
              <span>{i.title} × {i.quantity}</span>
              <span>₹{(i.price * i.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-3 text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <button disabled={loading} onClick={onPay} className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50">
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </div>
  )
}


