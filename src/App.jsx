import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { useAuth } from './hooks/useAuth'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'

function AppContent() {
  const { user } = useAuth()

  return (
    <CartProvider userId={user?.id}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        {user && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </CartProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
