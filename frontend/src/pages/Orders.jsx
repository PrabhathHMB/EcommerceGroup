import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderAPI } from '../services/api'

const Orders = () => {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login')
      return
    }
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated, authLoading])

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders()
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800'
      case 'CONFIRMED':
        return 'bg-yellow-100 text-yellow-800'
      case 'PLACED':
        return 'bg-purple-100 text-purple-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading || authLoading) {
    return <div className="text-center py-12">Loading orders...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">You have no orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                  <p className="text-gray-600 text-sm">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.orderItems?.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.product?.title} x{item.quantity} ({item.size})
                    </span>
                    <span>${item.discountedPrice * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  {order.shippingAddress && (
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.streetAddress}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-pink-600">${order.totalDiscountedPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders

