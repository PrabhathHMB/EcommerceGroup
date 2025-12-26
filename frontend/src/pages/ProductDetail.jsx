import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productAPI, reviewAPI, ratingAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, fetchCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    fetchProduct()
    fetchReviews()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getProductById(id)
      setProduct(response.data)
      if (response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0].name)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getProductReviews(id)
      setReviews(response.data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      navigate('/login')
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    const result = await addToCart(id, selectedSize, quantity)
    if (result.success) {
      toast.success('Added to cart!')
      fetchCart()
    } else {
      toast.error(result.error || 'Failed to add to cart')
    }
  }

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a review')
      return
    }

    try {
      await reviewAPI.createReview({
        productId: id,
        review: reviewText,
      })
      await ratingAPI.createRating({
        productId: id,
        rating: rating,
      })
      toast.success('Review submitted!')
      setReviewText('')
      fetchReviews()
    } catch (error) {
      toast.error('Failed to submit review')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600x600?text=Flower'}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-pink-600 mr-4">
              ${product.discountedPrice}
            </span>
            {product.price > product.discountedPrice && (
              <span className="text-xl text-gray-400 line-through">${product.price}</span>
            )}
            {product.discountPersent > 0 && (
              <span className="ml-4 bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.discountPersent}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size.name
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {size.name} ({size.quantity} available)
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border rounded"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-6">
            {product.quantity > 0 ? (
              <span className="text-green-600 font-semibold">In Stock ({product.quantity})</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className="w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        {isAuthenticated && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border rounded px-3 py-2"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded px-3 py-2 mb-4"
              rows="4"
            />
            <button
              onClick={handleSubmitReview}
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
            >
              Submit Review
            </button>
          </div>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <span className="font-semibold">
                    {review.user?.firstName} {review.user?.lastName}
                  </span>
                </div>
                <p className="text-gray-600">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

