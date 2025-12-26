import { Link, Outlet, useLocation } from 'react-router-dom'

const AdminLayout = () => {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:bg-gray-50'
    }

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Admin Portal</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        to="/admin"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin')}`}
                    >
                        <span className="text-xl">📊</span>
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/products"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products')}`}
                    >
                        <span className="text-xl">📦</span>
                        <span className="font-medium">Products</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/orders')}`}
                    >
                        <span className="text-xl">🛍️</span>
                        <span className="font-medium">Orders</span>
                    </Link>
                    <Link
                        to="/admin/users"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/users')}`}
                    >
                        <span className="text-xl">👥</span>
                        <span className="font-medium">Users</span>
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
