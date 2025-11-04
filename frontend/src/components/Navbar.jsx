import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { items } = useCart()
  const { user, logout } = useAuth()

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const [bump, setBump] = useState(false)
  useEffect(() => {
    if (items.length === 0) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 300)
    return () => clearTimeout(t)
  }, [count])

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">ShopX</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/men" className="hover:underline">Men</Link>
          <Link to="/women" className="hover:underline">Women</Link>
          <Link to="/cart" className={`hover:underline inline-flex items-center gap-1 ${bump ? 'animate-[bump_.3s_ease-out]' : ''}`}>
            Cart <span className="inline-flex items-center justify-center min-w-5 h-5 text-xs bg-black text-white rounded-full px-1">{count}</span>
          </Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}


