import React, { useState } from 'react'
import { Product as ProductType, products } from '~/constance/seed/product'
import { ProductList } from '~/pages/public/product/productpage/ProductList'
import Filters from './Filters'

const Product: React.FC = () => {
  // State cho bộ lọc
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortByPrice, setSortByPrice] = useState<string>('')
  const [priceRange, setPriceRange] = useState<number[]>([0, 200000])
  const [filters, setFilters] = useState({
    bestSeller: false,
    isNew: false,
    discounted: false
  })

  // Thêm state cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>('')

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  // State cho mã giảm giá
  const [coupons] = useState([
    { id: 1, discount: 10, minOrder: 50000, code: 'SAVE10', expiry: '2025-12-31' },
    { id: 2, discount: 20, minOrder: 100000, code: 'SAVE20', expiry: '2025-12-31' }
  ])
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  // Lọc và sắp xếp danh sách sản phẩm với thêm điều kiện tìm kiếm
  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === 'All' || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Thêm điều kiện tìm kiếm
        ((!filters.bestSeller && !filters.isNew && !filters.discounted) ||
          (filters.bestSeller && product.isBestSeller) ||
          (filters.isNew && product.isNew) ||
          (filters.discounted && product.isDiscounted))
    )
    .sort((a, b) => {
      if (sortByPrice === 'asc') return a.price - b.price
      if (sortByPrice === 'desc') return b.price - a.price
      return 0
    })

  // Xử lý áp dụng mã giảm giá
  const applyDiscount = (code: string) => {
    const coupon = coupons.find((c) => c.code === code)
    if (coupon) {
      setAppliedCoupon(code)
    }
  }

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = (product: ProductType) => {
    console.log(`Added to cart: ${product.name}`)
  }

  // Xử lý xem chi tiết sản phẩm
  const handleViewDetails = (product: ProductType) => {
    console.log(`Viewing details for: ${product.name}`)
  }

  return (
    <div className='min-h-screen bg-base-100 p-8 ml-64 w-full'>
      <h1 className='text-3xl font-bold text-blue-800 mb-6'>Danh sách sản phẩm</h1>

      {/* Thêm khung tìm kiếm */}
      <div className='mb-6 w-1/4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Tìm kiếm sản phẩm...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow'
          />
          <svg
            className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      <div className='bg-white p-4 rounded-lg shadow mb-6 w-4/5'>
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortByPrice={sortByPrice}
          setSortByPrice={setSortByPrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className='bg-white p-4 rounded-lg shadow'>
        <ProductList
          products={filteredProducts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  )
}

export default Product
