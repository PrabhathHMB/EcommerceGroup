const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-2">Total Sales</div>
                    <div className="text-3xl font-bold text-gray-900">$12,450</div>
                    <div className="text-green-500 text-sm mt-2">↑ 12% from last month</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-2">Total Orders</div>
                    <div className="text-3xl font-bold text-gray-900">156</div>
                    <div className="text-green-500 text-sm mt-2">↑ 8% from last month</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-2">Total Products</div>
                    <div className="text-3xl font-bold text-gray-900">45</div>
                    <div className="text-gray-400 text-sm mt-2">No change</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-2">Active Users</div>
                    <div className="text-3xl font-bold text-gray-900">890</div>
                    <div className="text-green-500 text-sm mt-2">↑ 24% from last month</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
                    <div className="text-gray-500 text-center py-8">
                        No recent orders to display.
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Low Stock Alert</h3>
                    <div className="text-gray-500 text-center py-8">
                        All products are well stocked.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
