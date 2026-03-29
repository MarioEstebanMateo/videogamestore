import React, { createContext, useState, useEffect, useCallback } from 'react'
import * as cartService from '../services/cart'

export const CartContext = createContext()

export const CartProvider = ({ children, userId }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart when userId changes
  useEffect(() => {
    if (userId) {
      loadCart()
    } else {
      setItems([])
    }
  }, [userId])

  const loadCart = useCallback(async () => {
    if (!userId) return
    try {
      setLoading(true)
      const cartItems = await cartService.getCartItems(userId)
      setItems(cartItems)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  const addToCart = async (game) => {
    if (!userId) throw new Error('Must be logged in')
    const updated = await cartService.addToCart(userId, game)
    setItems(updated)
  }

  const removeFromCart = async (gameId) => {
    if (!userId) throw new Error('Must be logged in')
    const updated = await cartService.removeFromCart(userId, gameId)
    setItems(updated)
  }

  const updateQuantity = async (gameId, quantity) => {
    if (!userId) throw new Error('Must be logged in')
    const updated = await cartService.updateCartItem(userId, gameId, quantity)
    setItems(updated)
  }

  const clearCart = async () => {
    if (!userId) throw new Error('Must be logged in')
    await cartService.clearCart(userId)
    setItems([])
  }

  const total = cartService.getCartTotal(items)
  const count = cartService.getCartCount(items)

  return (
    <CartContext.Provider value={{
      items,
      loading,
      total,
      count,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
