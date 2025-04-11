import React, { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { ProductList } from './ProductList'
import Filters from './Filters'
import { showToastError } from '~/utils/alert'
import { Product } from '~/types/product'
import { apiGetAllProducts } from '~/api/product'
const coupons = [
  { id: 1, discount: 200000, minOrder: 1300000, code: '0325SALE200', expiry: '31/03/2025' },
  { id: 2, discount: 100000, minOrder: 800000, code: 'DISCOUNT100', expiry: '15/04/2025' },
  { id: 3, discount: 100000, minOrder: 800000, code: 'GIAMGIA100', expiry: '15/04/2025' }
]
const ProductPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortByPrice, setSortByPrice] = useState('')
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [products, setProducts] = useState<Product[] | null>(null)
  // Removed unused filteredProducts state
  const [filters, setFilters] = useState({
    bestSeller: false,
    isNew: false,
    discounted: false
  })
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const getAllProduct = async () => {
    try {
      const response = await apiGetAllProducts({})
      if (response.code == 200) {
        setProducts(response.result.content)
      } else {
        showToastError(response.message || response.error)
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showToastError(error.message)
      }
    }
  }
  const productsPerPage = 12

  // const filteredProducts = products
  //   .filter(
  //     (product) =>
  //       (selectedCategory === 'All' || product.category === selectedCategory) &&
  //       product.price >= priceRange[0] &&
  //       product.price <= priceRange[1] &&
  //       ((!filters.bestSeller && !filters.isNew && !filters.discounted) ||
  //         (filters.bestSeller && product.isBestSeller) ||
  //         (filters.isNew && product.isNew) ||
  //         (filters.discounted && product.isDiscounted))
  //   )
  //   .sort((a, b) => {
  //     if (sortByPrice === 'asc') return a.price - b.price
  //     if (sortByPrice === 'desc') return b.price - a.price
  //     return 0
  //   })

  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.name}`)
  }

  const handleViewDetails = (product: Product) => {
    console.log(`Viewing details for: ${product.name}`)
  }

  const applyDiscount = (code: string) => {
    setAppliedCoupon(code)
    console.log(`Applied discount code: ${code}`)
  }

  useEffect(() => {
    getAllProduct()
  }, [])

  return (
    <section className='mx-auto p-10 flex gap-10 mt-16'>
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortByPrice={sortByPrice}
        setSortByPrice={setSortByPrice}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filters={filters}
        setFilters={setFilters}
        coupons={coupons}
        appliedCoupon={appliedCoupon}
        onApplyDiscount={applyDiscount}
      />
      <ProductList
        products={products || []}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </section>
  )
}

export default ProductPage
