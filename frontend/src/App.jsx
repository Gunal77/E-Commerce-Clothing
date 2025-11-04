import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MenSection from './pages/MenSection'
import WomenSection from './pages/WomenSection'
import { ToastProvider } from './context/ToastContext'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/men" element={<MenSection/>} />
            <Route path="/women" element={<WomenSection/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
      </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}


