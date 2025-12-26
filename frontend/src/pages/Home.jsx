import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { productAPI } from '../services/api'
import HeroSlider from '../components/HeroSlider'

const Home = () => {
  const [recentProducts, setRecentProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentProducts()
  }, [])

  const fetchRecentProducts = async () => {
    try {
      const params = {
        category: '',
        color: [],
        size: [],
        minPrice: null,
        maxPrice: null,
        minDiscount: null,
        sort: 'createdAt,desc', // Sort by newest
        stock: '',
        pageNumber: 0,
        pageSize: 8,
      }
      const response = await productAPI.getAllProducts(params)
      setRecentProducts(response.data.content || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: 'Birthday', image: 'https://images.unsplash.com/photo-1557825835-b6d61180d7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', link: '/products?category=birthday' },
    { name: 'Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', link: '/products?category=wedding' },
    { name: 'Anniversary', image: 'https://images.unsplash.com/photo-1527377667-83c6c76f963f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', link: '/products?category=anniversary' },
    { name: 'Sympathy', image: 'https://images.unsplash.com/photo-1498675685816-173663b65261?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', link: '/products?category=sympathy' },
  ]

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-pink-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-6">🚚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Same day delivery available for orders placed before 2 PM. We ensure your flowers arrive fresh.</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-6">🌸</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fresh Flowers</h3>
              <p className="text-gray-600 leading-relaxed">Sourced directly from local growers. We guarantee the freshness of every stem.</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-6">💝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Made with Love</h3>
              <p className="text-gray-600 leading-relaxed">Each arrangement is handcrafted by expert florists with attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Occasion</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-xl text-gray-600">Find the perfect flowers for your special moments</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-xl shadow-lg aspect-[3/4] block"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Latest Arrangements</h2>
            <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-xl text-gray-600">Freshly added to our collection</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/400x400?text=Flower'}
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                    {product.discountPercent > 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{product.discountPercent}%
                      </div>
                    )}
                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">{product.title}</h3>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-pink-600">
                        ${product.discountedPrice}
                      </span>
                      {product.price > product.discountedPrice && (
                        <span className="text-gray-400 line-through text-sm mb-1">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">Subscribe to get updates on new arrivals, special offers, and floral inspiration delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-lg flex-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button className="bg-white text-pink-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

