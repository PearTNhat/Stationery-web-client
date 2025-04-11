import { useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import { ProductList } from './ProductList'
import Filters from './Filters'
import { showToastError } from '~/utils/alert'
import { Product } from '~/types/product'
import { apiGetAllProducts } from '~/api/product'
import { ProductSearchParams } from '~/types/filter'
import { useSearchParams } from 'react-router-dom'
const coupons = [
  { id: 1, discount: 200000, minOrder: 1300000, code: '0325SALE200', expiry: '31/03/2025' },
  { id: 2, discount: 100000, minOrder: 800000, code: 'DISCOUNT100', expiry: '15/04/2025' },
  { id: 3, discount: 100000, minOrder: 800000, code: 'GIAMGIA100', expiry: '15/04/2025' }
]

const ProductPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const currentParams = useMemo(() => Object.fromEntries([...searchParams]) as ProductSearchParams, [searchParams])
  const [products, setProducts] = useState<Product[] | null>(null)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const getAllProduct = async (searchParams: ProductSearchParams) => {
    const { minPrice, maxPrice, sortBy, categoryId, search } = searchParams
    try {
      const response = await apiGetAllProducts({ minPrice, maxPrice, sortBy, categoryId, search })
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

  const handleViewDetails = (product: Product) => {
    console.log(`Viewing details for: ${product.name}`)
  }

  const applyDiscount = (code: string) => {
    setAppliedCoupon(code)
    console.log(`Applied discount code: ${code}`)
  }

  useEffect(() => {
    getAllProduct(currentParams)
  }, [currentParams])
  // console.log(products)
  return (
    <section className='mx-auto p-10 flex gap-10 mt-16'>
      <Filters
        currentParams={currentParams}
        coupons={coupons}
        appliedCoupon={appliedCoupon}
        onApplyDiscount={applyDiscount}
      />
      <ProductList products={products} onViewDetails={handleViewDetails} />
    </section>
  )
}

export default ProductPage
