import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import { useTheme } from '../context/ThemeContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  const { searchQuery, setSearchQuery } = useSearch()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [localQuery, setLocalQuery] = useState('')

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const [bump, setBump] = useState(false)
  useEffect(() => {
    if (items.length === 0) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 300)
    return () => clearTimeout(t)
  }, [count])

  const handleSearch = (e) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchQuery(localQuery.trim())
      navigate('/search')
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold dark:text-white">ShopX</Link>
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search products..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-500"
            />
          </form>
          <nav className="flex items-center gap-4">
            <Link to="/" className="hover:underline hidden sm:inline dark:text-gray-300">Home</Link>
            <Link to="/men" className="hover:underline dark:text-gray-300">Men</Link>
            <Link to="/women" className="hover:underline dark:text-gray-300">Women</Link>
            <Link to="/cart" className={`hover:underline inline-flex items-center gap-1 ${bump ? 'animate-[bump_.3s_ease-out]' : ''} dark:text-gray-300`}>
              Cart <span className="inline-flex items-center justify-center min-w-5 h-5 text-xs bg-black dark:bg-white dark:text-black text-white rounded-full px-1">{count}</span>
            </Link>
            <button 
              onClick={toggleTheme} 
              className="text-lg hover:opacity-70 transition p-1 rounded" 
              title={isDark ? 'Light mode' : 'Dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            {user ? (
              <>
                <Link to="/admin" className="text-sm hover:underline hidden md:inline dark:text-gray-300">Admin</Link>
                <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">Hi, {user.name}</span>
                <button onClick={logout} className="text-sm underline dark:text-gray-300">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline dark:text-gray-300">Login</Link>
                <Link to="/register" className="hover:underline hidden sm:inline dark:text-gray-300">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}


