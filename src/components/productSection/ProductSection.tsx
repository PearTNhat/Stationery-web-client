import { Product, ProductDetail } from '~/types/product'
import Card from '../card/Card'
import { useEffect } from 'react'
import { showToastError, showToastSuccess } from '~/utils/alert'
import { apiAddItemToCart } from '~/api/cart'
import { useAppSelector } from '~/hooks/redux'

interface ProductSectionProps {
  title: string
  products?: Product[]
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const { accessToken } = useAppSelector((state) => state.user)
  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async (productDetailId: string, colorId: string, sizeId: string, quantity: number) => {
    const result = await apiAddItemToCart({
      productId: productDetailId,
      colorId,
      sizeId,
      quantity,
      accessToken: accessToken || ''
    })
    if (typeof result === 'string') {
      showToastError(result)
    } else {
      showToastSuccess('Đã thêm vào giỏ hàng!')
    }
  }

  // Hàm xử lý khi nhấn xem chi tiết
  const handleViewDetails = (product: ProductDetail) => {
    console.log(`Viewing details for: ${product.name}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className='container mx-auto py-12 px-6'>
      <h3 className='text-2xl font-bold text-blue-800 text-center mb-6'>{title}</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products?.map((product) => (
          <Card
            key={product?.productId}
            product={product}
            onAddToCart={handleAddToCart}
            onViewDetails={() => handleViewDetails(product)}
          />
        ))}
      </div>
    </section>
  )
}
export default ProductSection
