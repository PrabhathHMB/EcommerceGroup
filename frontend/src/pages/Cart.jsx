import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Cart = () => {
  const { cart, loading, fetchCart, updateCartItem, removeFromCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    } else {
      navigate('/login')
    }
  }, [isAuthenticated])

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    const result = await updateCartItem(itemId, newQuantity)
    if (result.success) {
      toast.success('Cart updated')
    } else {
      toast.error(result.error || 'Failed to update cart')
    }
  }

  const handleRemoveItem = async (itemId) => {
    const result = await removeFromCart(itemId)
    if (result.success) {
      toast.success('Item removed from cart')
    } else {
      toast.error(result.error || 'Failed to remove item')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading cart...</div>
  }

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some beautiful flowers to your cart!</p>
        <Link
          to="/products"
          className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 inline-block"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
              <img
                src={item.product?.imageUrl || 'https://via.placeholder.com/150?text=Flower'}
                alt={item.product?.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.product?.title}</h3>
                <p className="text-gray-600 mb-2">Size: {item.size}</p>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-pink-600">
                    ${item.discountedPrice * item.quantity}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cart.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-${cart.totalPrice - cart.totalDiscountedPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>Total</span>
                <span className="text-pink-600">${cart.totalDiscountedPrice}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-pink-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

