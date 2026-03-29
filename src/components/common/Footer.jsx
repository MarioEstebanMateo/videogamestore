import React from 'react'
import { useTheme } from '../../hooks/useTheme'

const Footer = () => {
  const { isDark } = useTheme()

  return (
    <footer className={`${isDark ? 'bg-slate-900 text-gray-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'} border-t mt-20`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">Video Games Store</h3>
            <p className="text-sm">Your ultimate destination for the best video games.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">All Games</a></li>
              <li><a href="#" className="hover:text-white transition">New Releases</a></li>
              <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-300'} pt-8 text-center text-sm`}>
          <p>&copy; 2026 Video Games Store by Mario. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
