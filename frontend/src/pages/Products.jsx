import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productAPI } from '../services/api'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    color: [],
    size: [],
    minPrice: null,
    maxPrice: null,
    minDiscount: null,
    sort: '',
    stock: '',
    pageNumber: 0,
    pageSize: 20,
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productAPI.getAllProducts(filters)
      setProducts(response.data.content || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, pageNumber: 0 }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Flower Collection</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Default</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : null)
                }
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : null)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <button
            onClick={() =>
              setFilters({
                category: '',
                color: [],
                size: [],
                minPrice: null,
                maxPrice: null,
                minDiscount: null,
                sort: '',
                stock: '',
                pageNumber: 0,
                pageSize: 20,
              })
            }
            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">No products found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300x300?text=Flower'}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-pink-600 font-bold">
                        ${product.discountedPrice}
                        {product.price > product.discountedPrice && (
                          <span className="text-gray-400 line-through text-sm ml-2">
                            ${product.price}
                          </span>
                        )}
                      </span>
                      {product.quantity > 0 ? (
                        <span className="text-green-600 text-sm">In Stock</span>
                      ) : (
                        <span className="text-red-600 text-sm">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products

