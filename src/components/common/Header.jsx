import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun, ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = ({ onLoginClick, onSignupClick }) => {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { count } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  const handleAdminClick = () => {
    navigate('/admin')
    setMobileMenuOpen(false)
  }

  return (
    <header className={`${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
          Video Games Store
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart */}
          <Link to="/checkout" className="relative">
            <ShoppingCart size={24} className="hover:text-blue-500 transition-colors" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Auth Menu */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.username}</span>
              {user.email === 'admin@store.com' && (
                <button
                  onClick={handleAdminClick}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm"
                >
                  Admin
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onLoginClick}
                className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors text-sm"
              >
                Login
              </button>
              <button
                onClick={onSignupClick}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/checkout" className="relative">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${isDark ? 'border-slate-800 bg-slate-800' : 'border-slate-200 bg-slate-100'} p-4`}>
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <div className="py-2 text-sm">{user.username}</div>
                {user.email === 'admin@store.com' && (
                  <button
                    onClick={handleAdminClick}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm w-full"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors text-sm w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLoginClick()
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors text-sm w-full"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onSignupClick()
                    setMobileMenuOpen(false)
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm w-full"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
