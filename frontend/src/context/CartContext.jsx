import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../services/api'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.getCart()
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, size, quantity) => {
    try {
      await cartAPI.addToCart({
        productId,
        size,
        quantity,
      })
      await fetchCart()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to add to cart',
      }
    }
  }

  const updateCartItem = async (itemId, quantity) => {
    try {
      await cartAPI.updateCartItem(itemId, { quantity })
      await fetchCart()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update cart',
      }
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      await cartAPI.removeCartItem(itemId)
      await fetchCart()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove from cart',
      }
    }
  }

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItemCount: cart?.totalItem || 0,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

