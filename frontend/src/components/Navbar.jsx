import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const { cartItemCount, fetchCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('Current User in Navbar:', user) // Debugging
      fetchCart()
    }
  }, [isAuthenticated, user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌸</span>
              <span className="text-xl font-bold text-pink-600">Fresh Flowers</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium relative"
                >
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
                {user?.role === 'ROLE_ADMIN' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium border border-pink-200"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

