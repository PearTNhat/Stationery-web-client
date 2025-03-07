/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import Swal from 'sweetalert2'
// import { fetchBrands } from "~/store/action/brand";
// import { apiGetSeriesBrand } from "~/apis/series";
import { formatNumber } from '~/utils/helper'

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

interface Filter {
  title: string
  brand: string
  series: string
  brandId: string
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
    primaryImage: { url: 'https://via.placeholder.com/150' },
    colors: [
      {
        _id: 'c1',
        color: 'Space Black',
        quantity: 20,
        soldQuantity: 10,
        primaryImage: { url: 'https://via.placeholder.com/150/000000' }
      },
      {
        _id: 'c2',
        color: 'Silver',
        quantity: 30,
        soldQuantity: 15,
        primaryImage: { url: 'https://via.placeholder.com/150/C0C0C0' }
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
    primaryImage: { url: 'https://via.placeholder.com/150' },
    colors: [
      {
        _id: 'c3',
        color: 'Phantom Black',
        quantity: 25,
        soldQuantity: 12,
        primaryImage: { url: 'https://via.placeholder.com/150/000000' }
      }
    ]
  }
]

const tableHeaderTitleList = [
  '#',
  'Ảnh',
  'Tên',
  'Thương hiệu',
  'Dòng',
  'Giá',
  'Số lượng',
  'Đã bán',
  'Đánh giá',
  'Ngày tạo',
  'Chức năng'
]

function ProductsManagement() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const { accessToken } = useSelector((state: any) => state.user)
  // const { brands } = useSelector((state: any) => state.brand)

  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState<string[]>([])

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
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Quản Lý Sản Phẩm</h1>

        <div className='bg-white rounded-lg shadow-md p-4 mb-6'></div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-blue-600 text-white'>
                <tr>
                  {tableHeaderTitleList.map((title) => (
                    <th key={title} className='px-4 py-3 text-left text-sm font-medium'>
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
                      <tr
                        onClick={() => handleRowClick(p)}
                        className='hover:bg-gray-50 cursor-pointer transition-colors'
                      >
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
                              to={`/admin/manage/products/edit/${p.slug}`}
                              className='text-yellow-500 hover:text-yellow-600'
                            >
                              <FaRegEdit className='text-lg' />
                            </Link>
                            <Link
                              to={`/admin/manage/products/create-color/${p.slug}`}
                              className='text-green-500 hover:text-green-600'
                            >
                              <IoMdAddCircleOutline className='text-lg' />
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteProduct(p._id)
                              }}
                              className='text-red-500 hover:text-red-600'
                            >
                              <FaRegTrashAlt className='text-lg' />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isSelected && (
                        <tr className='bg-gray-50'>
                          <td colSpan={11} className='p-0'>
                            <div className='overflow-x-auto'>
                              <table className='w-full'>
                                <thead className='bg-gray-100'>
                                  <tr>
                                    <th className='px-4 py-2 text-sm'>#</th>
                                    <th className='px-4 py-2 text-sm'>Màu sắc</th>
                                    <th className='px-4 py-2 text-sm'>Ảnh</th>
                                    <th className='px-4 py-2 text-sm'>Số lượng</th>
                                    <th className='px-4 py-2 text-sm'>Đã bán</th>
                                    <th className='px-4 py-2 text-sm'>Chức năng</th>
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
                                            className='text-yellow-500 hover:text-yellow-600'
                                          >
                                            <FaRegEdit className='text-lg' />
                                          </Link>
                                          <button
                                            onClick={() =>
                                              deleteProductColor({
                                                pId: p._id,
                                                cId: color._id
                                              })
                                            }
                                            className='text-red-500 hover:text-red-600'
                                          >
                                            <FaRegTrashAlt className='text-lg' />
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
    </div>
  )
}

export default ProductsManagement
