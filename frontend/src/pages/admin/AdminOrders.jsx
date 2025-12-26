import { useState, useEffect } from 'react'
import { orderAPI } from '../../services/api'
import { toast } from 'react-toastify'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await orderAPI.getAllOrders()
            setOrders(response.data || [])
        } catch (error) {
            console.error('Error fetching orders:', error)
            toast.error('Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            if (newStatus === 'CONFIRMED') await orderAPI.confirmOrder(orderId)
            else if (newStatus === 'SHIPPED') await orderAPI.shipOrder(orderId)
            else if (newStatus === 'DELIVERED') await orderAPI.deliverOrder(orderId)
            else if (newStatus === 'CANCELLED') await orderAPI.cancelOrder(orderId)

            toast.success(`Order status updated to ${newStatus}`)
            fetchOrders()
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await orderAPI.deleteOrder(orderId)
                toast.success('Order deleted')
                fetchOrders()
            } catch (error) {
                toast.error('Failed to delete order')
            }
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders Management</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user?.email || order.user?.firstName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${order.totalPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                            order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                order.orderStatus === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {order.orderStatus === 'PLACED' && (
                                        <button onClick={() => handleStatusChange(order.id, 'CONFIRMED')} className="text-blue-600 hover:text-blue-900 mr-3">Confirm</button>
                                    )}
                                    {order.orderStatus === 'CONFIRMED' && (
                                        <button onClick={() => handleStatusChange(order.id, 'SHIPPED')} className="text-indigo-600 hover:text-indigo-900 mr-3">Ship</button>
                                    )}
                                    {order.orderStatus === 'SHIPPED' && (
                                        <button onClick={() => handleStatusChange(order.id, 'DELIVERED')} className="text-green-600 hover:text-green-900 mr-3">Deliver</button>
                                    )}
                                    {order.orderStatus !== 'DELIVERED' && order.orderStatus !== 'CANCELLED' && (
                                        <button onClick={() => handleStatusChange(order.id, 'CANCELLED')} className="text-red-500 hover:text-red-700 mr-3">Cancel</button>
                                    )}
                                    <button onClick={() => handleDelete(order.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminOrders
