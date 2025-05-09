import React from 'react'
import { FaTimes } from 'react-icons/fa'

interface RequestFormProps {
  products: Product[]
  formData: RequestForm
  productSearch: string
  setFormData: React.Dispatch<React.SetStateAction<RequestForm>>
  setProductSearch: React.Dispatch<React.SetStateAction<string>>
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  isEditMode: boolean
}

interface RequestForm {
  productId: string
  color: string
  size: string
  quantity: number
  notes: string
  priority: string
  deliveryDate: string
}

interface Product {
  id: number
  name: string
  colors: string[]
  sizes: string[]
}

const RequestForm: React.FC<RequestFormProps> = ({
  products,
  formData,
  productSearch,
  setFormData,
  setProductSearch,
  onSubmit,
  onClose,
  isEditMode
}) => {
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'productId') {
      setFormData((prev) => ({ ...prev, color: '', size: '' }))
    }
  }

  // Get selected product for dynamic color and size options
  const selectedProduct = products.find((p) => p.id.toString() === formData.productId)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  )

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all duration-300'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>{isEditMode ? 'Sửa Yêu Cầu' : 'Tạo Yêu Cầu Mới'}</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition'>
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className='space-y-4'>
          {/* Product Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Sản Phẩm</label>
            <input
              type='text'
              placeholder='Tìm kiếm sản phẩm...'
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
            />
            <select
              name='productId'
              value={formData.productId}
              onChange={handleInputChange}
              className='mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
              required
            >
              <option value=''>Chọn sản phẩm</option>
              {filteredProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color and Size Selection */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Màu Sắc</label>
              <select
                name='color'
                value={formData.color}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
                required
                disabled={!selectedProduct}
              >
                <option value=''>Chọn màu sắc</option>
                {selectedProduct?.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Kích Thước</label>
              <select
                name='size'
                value={formData.size}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
                required
                disabled={!selectedProduct}
              >
                <option value=''>Chọn kích thước</option>
                {selectedProduct?.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity and Priority */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Số Lượng</label>
              <input
                type='number'
                name='quantity'
                value={formData.quantity}
                onChange={handleInputChange}
                min='1'
                className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Độ Ưu Tiên</label>
              <select
                name='priority'
                value={formData.priority}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
              >
                <option value='normal'>Bình Thường</option>
                <option value='high'>Cao</option>
                <option value='urgent'>Khẩn Cấp</option>
              </select>
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Ngày Giao Hàng</label>
            <input
              type='date'
              name='deliveryDate'
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Ghi Chú</label>
            <textarea
              name='notes'
              value={formData.notes}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 transition'
              rows={3}
              placeholder='Nhập ghi chú bổ sung'
            />
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition text-sm font-medium'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium'
            >
              {isEditMode ? 'Cập Nhật' : 'Gửi Yêu Cầu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RequestForm
