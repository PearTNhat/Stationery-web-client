import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '~/components/card/Card'
import { Product } from '~/types/product'
// import { Product } from '~/constance/seed/product'

type ProductListProps = {
  products: Product[]
  currentPage: number
  setCurrentPage: (page: number) => void
  productsPerPage: number
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  currentPage,
  setCurrentPage,
  productsPerPage,
  onAddToCart,
  onViewDetails
}) => {
  const totalPages = Math.ceil(products?.length / productsPerPage)
  const displayedProducts = products?.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  return (
    <div className='w-4/5'>
      <h1 className='text-4xl font-bold text-blue-800 mb-6 text-center'>Product List</h1>
      <div className='flex flex-wrap gap-3'>
        {displayedProducts?.map((product) => (
          <div className='lg:w-[calc(25%-9px)] md:w-[calc(33.33%-8px)] sm:w-[calc(50%-12px)] w-full'>
            <Card
              key={product.productId}
              product={product}
              onAddToCart={() => onAddToCart(product)}
              onViewDetails={() => onViewDetails(product)}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-6'>
          <button
            className='p-2 border rounded disabled:opacity-50'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          >
            <ChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages)
            .map((page, index, arr) => (
              <React.Fragment key={page}>
                {index > 0 && page - arr[index - 1] > 1 && <span className='px-2'>...</span>}
                <button
                  className={`px-3 py-1 border rounded transition ${
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}

          <button
            className='p-2 border rounded disabled:opacity-50'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
