import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { X } from 'lucide-react'

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const { login } = useAuth()
  const { isDark } = useTheme()
  const [email, setEmail] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have logged in successfully',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
      onClose()
      setEmail('')
      setPassword('')
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-lg max-w-md w-full`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold">Login</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
              placeholder="admin"
            />
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Demo: admin</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
              placeholder="password"
            />
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Demo: admin</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center text-sm">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => {
                onClose()
                onSwitchToSignup()
              }}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
