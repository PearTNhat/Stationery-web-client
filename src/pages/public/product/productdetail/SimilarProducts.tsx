// components/product/SimilarProducts.tsx
import React from 'react'
import Card from '~/components/card/Card'
import { useAppSelector } from '~/hooks/redux'
import { Product } from '~/types/product'

type SimilarProductsProps = {
  similarProducts: Product[]
  onAddToCart: (productId: string, colorId: string, sizeId: string, quantity: number) => Promise<void>
  onViewDetails: (id: number) => void
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ similarProducts, onAddToCart, onViewDetails }) => {
  const { accessToken } = useAppSelector((state) => state.user)
  return (
    <div className='mt-12'>
      <h3 className='text-2xl font-bold text-center'>Similar Products</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {similarProducts.map((product) => (
          <Card
            accessToken={accessToken || ''}
            key={product.productId}
            product={product}
            onAddToCart={() =>
              onAddToCart(product.productId, product.productDetail.color.colorId, product.productDetail.size.sizeId, 1)
            }
            onViewDetails={() => onViewDetails(Number(product.productId))}
          />
        ))}
      </div>
    </div>
  )
}
