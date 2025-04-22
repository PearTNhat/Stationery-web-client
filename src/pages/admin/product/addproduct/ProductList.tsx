import moment from 'moment'
import React, { Fragment, useState } from 'react'
import { FaEdit, FaExclamationCircle, FaSearch, FaTrash } from 'react-icons/fa'
import Select from 'react-select'
import { categoryOptions } from '~/constance/seed/option'
import { ListProductDetail, ProductDetail } from '~/types/product'
import EditProductModal from '../modal/EditProductModal'
import EditProductDetailModal from '../modal/EditProductDetailModal'

interface ProductListProps {
  products: ListProductDetail[]
  selectedProduct: string[]
  onRowClick: (product: ListProductDetail) => void
  onDeleteProduct: (id: string) => void
  onDeleteProductDetail: (pId: string, detailId: string) => void
  onViewProductDetail: (product: ListProductDetail) => void
  onEditProduct: (product: ListProductDetail) => void
  onEditProductDetail: (pId: string, detail: ProductDetail) => void
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedProduct,
  onRowClick,
  onDeleteProduct,
  onDeleteProductDetail,
  onViewProductDetail,
  onEditProduct,
  onEditProductDetail
}) => {
  const [editProduct, setEditProduct] = useState<ListProductDetail | null>(null)
  const [editProductDetail, setEditProductDetail] = useState<{ pId: string; detail: ProductDetail } | null>(null)

  const handleEditProduct = (product: ListProductDetail) => {
    setEditProduct(product)
  }

  const handleEditProductDetail = (pId: string, detail: ProductDetail) => {
    setEditProductDetail({ pId, detail })
  }

  const tableHeaderTitleList = [
    '#',
    'Image',
    'Name',
    'Description',
    'Category',
    'Price',
    'Quantity',
    'Sold',
    'Rating',
    'Created Date',
    'Actions'
  ]

  return (
    <>
      <div className='flex gap-4 mb-6'>
        <div className='relative w-1/3'>
          <span className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
            <FaSearch />
          </span>
          <input
            type='text'
            placeholder='Search product...'
            className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300'
          />
        </div>
        <div className='w-1/4'>
          <Select
            options={categoryOptions}
            defaultValue={categoryOptions[0]}
            className='basic-single'
            classNamePrefix='select'
            isSearchable={false}
            onChange={(selectedOption) => {
              console.log('Selected category:', selectedOption?.value)
            }}
          />
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='overflow-x-auto rounded-xl shadow-lg'>
          <table className='w-full border-collapse border border-blue-200'>
            <thead className='bg-blue-600 text-white text-left'>
              <tr>
                {tableHeaderTitleList.map((title) => (
                  <th key={title} className='px-4 py-3 font-medium text-sm uppercase tracking-wider'>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {products.map((p, index) => {
                const isSelected = selectedProduct.includes(p.productId)
                return (
                  <Fragment key={p.productId}>
                    <tr
                      onClick={() => onRowClick(p)}
                      className='border-b border-teal-200 hover:bg-teal-50 transition-colors'
                    >
                      <td className='px-4 py-3 text-sm'>{index + 1}</td>
                      <td className='px-4 py-3'>
                        <img className='w-12 h-12 rounded object-cover' src={p.img} alt={p.name} />
                      </td>
                      <td className='px-4 py-3 text-sm max-w-[200px]'>
                        <p className='line-clamp-2' title={p.name}>
                          {p.name}
                        </p>
                      </td>
                      <td className='px-4 py-3 text-sm max-w-[200px]'>
                        <p className='line-clamp-2' title={p.description}>
                          {p.description}
                        </p>
                      </td>
                      <td className='px-4 py-3 text-sm'>{p.category.categoryName}</td>
                      <td className='px-4 py-3 text-sm'>{p.minPrice.toLocaleString('vi-VN')}đ</td>
                      <td className='px-4 py-3 text-sm'>{p.quantity.toLocaleString('vi-VN')}</td>
                      <td className='px-4 py-3 text-sm'>{p.soldQuantity.toLocaleString('vi-VN')}</td>
                      <td className='px-4 py-3 text-sm'>{p.totalRating}</td>
                      <td className='px-4 py-3 text-sm'>{moment(p.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          <button
                            className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors'
                            onClick={() => onViewProductDetail(p)}
                          >
                            <FaExclamationCircle size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditProduct(p)
                            }}
                            className='bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 transition-colors'
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onDeleteProduct(p.productId)
                            }}
                            className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors'
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isSelected && p.productDetail.length > 0 && (
                      <tr className='bg-blue-50'>
                        <td colSpan={11} className='p-0'>
                          <div className='overflow-x-auto'>
                            <table className='w-full'>
                              <thead className='bg-gray-500 text-white text-left'>
                                <tr>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>#</th>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>Color</th>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>Size</th>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>Images</th>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>Quantity</th>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>Sold</th>
                                  <th className='px-4 py-2 text-sm uppercase tracking-wider'>Actions</th>
                                </tr>
                              </thead>
                              <tbody className='divide-y divide-gray-200'>
                                {p.productDetail.map((detail, detailIndex) => (
                                  <tr key={detail.productDetailId} className='hover:bg-gray-100'>
                                    <td className='px-4 py-2 text-sm'>{detailIndex + 1}</td>
                                    <td className='px-4 py-2 text-sm'>{detail.color?.name || 'No color'}</td>
                                    <td className='px-4 py-2 text-sm'>{detail.size?.name || 'No size'}</td>
                                    <td className='px-4 py-2'>
                                      <div className='flex items-center gap-2'>
                                        {(detail.images || []).slice(0, 3).map((img, imgIdx) => (
                                          <div key={img.imageId} className='relative w-10 h-10'>
                                            <img
                                              className='w-10 h-10 rounded object-cover'
                                              src={img.url}
                                              alt={`${detail.color?.name || 'No color'}-${imgIdx}`}
                                            />
                                            {imgIdx === 2 && (detail.images || []).length > 3 && (
                                              <div className='absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center'>
                                                <span className='text-sm font-medium text-white'>
                                                  +{(detail.images || []).length - 3}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                    <td className='px-4 py-2 text-sm'>
                                      {detail.stockQuantity.toLocaleString('vi-VN')}
                                    </td>
                                    <td className='px-4 py-2 text-sm'>{detail.soldQuantity.toLocaleString('vi-VN')}</td>
                                    <td className='px-4 py-2'>
                                      <div className='flex gap-3'>
                                        <button
                                          onClick={() => handleEditProductDetail(p.productId, detail)}
                                          className='bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 transition-colors'
                                        >
                                          <FaEdit size={16} />
                                        </button>
                                        <button
                                          onClick={() => onDeleteProductDetail(p.productId, detail.productDetailId)}
                                          className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors'
                                        >
                                          <FaTrash size={16} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chỉnh sửa sản phẩm */}
      {editProduct && (
        <EditProductModal
          isOpen={!!editProduct}
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={onEditProduct}
        />
      )}

      {/* Modal chỉnh sửa chi tiết sản phẩm */}
      {editProductDetail && (
        <EditProductDetailModal
          isOpen={!!editProductDetail}
          productId={editProductDetail.pId}
          detail={editProductDetail.detail}
          onClose={() => setEditProductDetail(null)}
          onSave={onEditProductDetail}
        />
      )}
    </>
  )
}

export default ProductList
