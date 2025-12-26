import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user || user.role !== 'ROLE_ADMIN') {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}

export default AdminRoute
