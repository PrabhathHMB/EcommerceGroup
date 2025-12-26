import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1596515286915-1ff2524dc804?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Blooms of Elegance',
            subtitle: 'Handpicked fresh flowers for every occasion',
            ctaText: 'Shop Now',
            ctaLink: '/products',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1549416878-cbfa96b7f384?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Express Your Love',
            subtitle: 'Beautiful bouquets crafted with passion',
            ctaText: 'View Collection',
            ctaLink: '/products',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1563241527-4a18d18721ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
            title: 'Same Day Delivery',
            subtitle: 'Order before 2 PM for delivery today',
            ctaText: 'Order Now',
            ctaLink: '/products',
        },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <div className="max-w-3xl transform transition-all duration-700 translate-y-0 opacity-100">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-white mb-8 font-light">
                                {slide.subtitle}
                            </p>
                            <Link
                                to={slide.ctaLink}
                                className="inline-block bg-pink-600 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-pink-700 transition transform hover:scale-105 shadow-lg"
                            >
                                {slide.ctaText}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition backdrop-blur-sm"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition backdrop-blur-sm"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeroSlider
