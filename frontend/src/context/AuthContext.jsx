import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, userAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile()
      console.log('Fetched User Profile:', response.data) // Debugging
      setUser(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      localStorage.removeItem('token')
      return null
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authAPI.signin({ email, password })
      const { jwt } = response.data
      localStorage.setItem('token', jwt)
      const userProfile = await fetchUserProfile() // This assumes fetchUserProfile returns the user
      return { success: true, user: userProfile }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      }
    }
  }

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData)
      const { jwt } = response.data
      localStorage.setItem('token', jwt)
      const userProfile = await fetchUserProfile()
      return { success: true, user: userProfile }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

