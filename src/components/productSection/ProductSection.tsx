import { Product } from '~/types/product'
import Card from '../card/Card'
import { useEffect } from 'react'

interface ProductSectionProps {
  title: string
  products?: Product[]
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.name}`)
  }

  // Hàm xử lý khi nhấn xem chi tiết
  const handleViewDetails = (product: Product) => {
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
            onAddToCart={() => handleAddToCart(product)}
            onViewDetails={() => handleViewDetails(product)}
          />
        ))}
      </div>
    </section>
  )
}
export default ProductSection
