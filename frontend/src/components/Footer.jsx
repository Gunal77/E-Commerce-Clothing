import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-3">ShopX</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your one-stop destination for premium fashion and style.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">About</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Size Guide</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Email: support@shopx.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li className="flex gap-3 mt-3">
                <a href="#" className="hover:opacity-70">📘</a>
                <a href="#" className="hover:opacity-70">📷</a>
                <a href="#" className="hover:opacity-70">🐦</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} ShopX. All rights reserved.
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
              >
                {subscribed ? '✓' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}


