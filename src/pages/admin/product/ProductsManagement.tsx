/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Swal from 'sweetalert2'
import { formatNumber } from '~/utils/helper'
import ProductModal from '../categoryProduct/modal/AddProductModal'
import { useAppDispatch } from '~/hooks/redux'
import { modalActions } from '~/store/slices/modal'

// Types
interface Product {
  _id: string
  title: string
  slug: string
  brand: string
  series: { title: string }
  discountPrice: number
  quantity: number
  soldQuantity: number
  totalRating: number
  createdAt: string
  primaryImage: { url: string }
  colors: ProductColor[]
}

interface ProductColor {
  _id: string
  color: string
  quantity: number
  soldQuantity: number
  primaryImage: { url: string }
}

// Mock Data
const mockProducts: Product[] = [
  {
    _id: '1',
    title: 'iPhone 14 Pro Max',
    slug: 'iphone-14-pro-max',
    brand: 'apple',
    series: { title: 'iPhone 14' },
    discountPrice: 29990000,
    quantity: 50,
    soldQuantity: 25,
    totalRating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
    primaryImage: {
      url: 'https://file.hstatic.net/1000213518/file/thiet_ke_chua_co_ten__2__6cdcbb666fef4b5293d76b6a84a2b135.png'
    },
    colors: [
      {
        _id: 'c1',
        color: 'Space Black',
        quantity: 20,
        soldQuantity: 10,
        primaryImage: {
          url: 'https://file.hstatic.net/1000213518/file/thiet_ke_chua_co_ten__2__6cdcbb666fef4b5293d76b6a84a2b135.png'
        }
      },
      {
        _id: 'c2',
        color: 'Silver',
        quantity: 30,
        soldQuantity: 15,
        primaryImage: {
          url: 'https://file.hstatic.net/1000213518/file/thiet_ke_chua_co_ten__2__6cdcbb666fef4b5293d76b6a84a2b135.png'
        }
      }
    ]
  },
  {
    _id: '2',
    title: 'Galaxy S23 Ultra',
    slug: 'galaxy-s23-ultra',
    brand: 'samsung',
    series: { title: 'Galaxy S23' },
    discountPrice: 26990000,
    quantity: 40,
    soldQuantity: 20,
    totalRating: 4.7,
    createdAt: '2024-02-01T14:00:00Z',
    primaryImage: {
      url: 'https://file.hstatic.net/1000213518/file/thiet_ke_chua_co_ten__2__6cdcbb666fef4b5293d76b6a84a2b135.png'
    },
    colors: [
      {
        _id: 'c3',
        color: 'Phantom Black',
        quantity: 25,
        soldQuantity: 12,
        primaryImage: {
          url: 'https://file.hstatic.net/1000213518/file/thiet_ke_chua_co_ten__2__6cdcbb666fef4b5293d76b6a84a2b135.png'
        }
      }
    ]
  }
]

const tableHeaderTitleList = [
  '#',
  'Image',
  'Name',
  'Brand',
  'Series',
  'Price',
  'Quantity',
  'Sold',
  'Rating',
  'Created Date',
  'Actions'
]

function ProductsManagement() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const { accessToken } = useSelector((state: any) => state.user)
  // const { brands } = useSelector((state: any) => state.brand)

  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const handleRowClick = (product: Product) => {
    setSelectedProduct((prev) =>
      prev.includes(product._id) ? prev.filter((id) => id !== product._id) : [...prev, product._id]
    )
  }

  const deleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    })

    if (result.isConfirmed) {
      // Implement delete logic
      setProducts((prev) => prev.filter((p) => p._id !== id))
      Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success')
    }
  }

  const deleteProductColor = async ({ pId, cId }: { pId: string; cId: string }) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn chắc chắn muốn xóa màu này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })

    if (result.isConfirmed) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p._id === pId) {
            return {
              ...p,
              colors: p.colors.filter((c) => c._id !== cId)
            }
          }
          return p
        })
      )
      Swal.fire('Đã xóa!', 'Màu đã được xóa.', 'success')
    }
  }

  return (
    <div className='p-6 w-full mx-auto bg-white shadow-lg rounded-xl'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-semibold text-blue-800'>Products Management</h1>
      </div>
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

        <div>
          <select className='px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300'>
            <option value='All'>All categories</option>
            <option value='Admin'>Pen</option>
            <option value='User'>Table</option>
            <option value='Moderator'>Book</option>
          </select>
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
                const isSelected = selectedProduct.includes(p._id)
                return (
                  <Fragment key={p._id}>
                    <tr onClick={() => handleRowClick(p)} className='hover:bg-gray-50 cursor-pointer transition-colors'>
                      {/* {(currentPage - 1) * 10 + index + 1} */}
                      <td className='px-4 py-3 text-sm'>{index}</td>
                      <td className='px-4 py-3'>
                        <img className='w-12 h-12 rounded object-cover' src={p.primaryImage.url} alt={p.title} />
                      </td>
                      <td className='px-4 py-3 text-sm max-w-[200px]'>
                        <p className='line-clamp-2' title={p.title}>
                          {p.title}
                        </p>
                      </td>
                      <td className='px-4 py-3 text-sm'>{p.brand}</td>
                      <td className='px-4 py-3 text-sm'>{p.series.title}</td>
                      <td className='px-4 py-3 text-sm'>{formatNumber(p.discountPrice)}đ</td>
                      <td className='px-4 py-3 text-sm'>{formatNumber(p.quantity)}</td>
                      <td className='px-4 py-3 text-sm'>{formatNumber(p.soldQuantity)}</td>
                      <td className='px-4 py-3 text-sm'>{p.totalRating}</td>
                      <td className='px-4 py-3 text-sm'>{moment(p.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          <Link
                            to={`/admin/manage/products/create-color/${p.slug}`}
                            className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors'
                          >
                            <IoMdAddCircleOutline className='text-lg' />
                          </Link>
                          <Link
                            to={`/admin/manage/products/edit/${p.slug}`}
                            className='bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-colors'
                          >
                            <FaEdit className='text-lg' />
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteProduct(p._id)
                            }}
                            className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors'
                          >
                            <FaTrash className='text-lg' />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isSelected && (
                      <tr className='bg-gray-50'>
                        <td colSpan={11} className='p-0'>
                          <div className='overflow-x-auto'>
                            <table className='w-full'>
                              <thead className='bg-gray-500 text-white text-left'>
                                <tr>
                                  <th className='px-4 py-2 text-sm'>#</th>
                                  <th className='px-4 py-2 text-sm'>Color</th>
                                  <th className='px-4 py-2 text-sm'>Image</th>
                                  <th className='px-4 py-2 text-sm'>Quantity</th>
                                  <th className='px-4 py-2 text-sm'>Sold</th>
                                  <th className='px-4 py-2 text-sm'>Actions</th>
                                </tr>
                              </thead>
                              <tbody className='divide-y divide-gray-200'>
                                {p.colors.map((color, idx) => (
                                  <tr key={color._id} className='hover:bg-gray-100'>
                                    <td className='px-4 py-2 text-sm'>{idx + 1}</td>
                                    <td className='px-4 py-2 text-sm'>{color.color}</td>
                                    <td className='px-4 py-2'>
                                      <img
                                        className='w-10 h-10 rounded object-cover'
                                        src={color.primaryImage.url}
                                        alt={color.color}
                                      />
                                    </td>
                                    <td className='px-4 py-2 text-sm'>{formatNumber(color.quantity)}</td>
                                    <td className='px-4 py-2 text-sm'>{formatNumber(color.soldQuantity)}</td>
                                    <td className='px-4 py-2'>
                                      <div className='flex gap-3'>
                                        <Link
                                          to={`/admin/manage/products/edit-color/${p.slug}/${color._id}`}
                                          className='bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition-colors'
                                        >
                                          <FaEdit className='text-lg' />
                                        </Link>
                                        <button
                                          onClick={() =>
                                            deleteProductColor({
                                              pId: p._id,
                                              cId: color._id
                                            })
                                          }
                                          className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors'
                                        >
                                          <FaTrash className='text-lg' />
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

      {/* Pagination would go here */}
    </div>
  )
}

export default ProductsManagement
