import { useEffect, useRef, useState } from 'react'
import { TextInput } from '~/components/styles/TextInput'

interface ProductColor {
  colorName: string
  hexCode: string
}

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

interface Props {
  isOpen: boolean
  isEdit: boolean
  categoryId?: string
  product?: Product
  onClose: () => void
  onSubmit: (product: Product) => void
}

const ProductModal = ({ isOpen, isEdit, product, onClose, onSubmit }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const [form, setForm] = useState<Product>({
    _id: '',
    title: '',
    slug: '',
    brand: '',
    series: { title: '' },
    discountPrice: 0,
    quantity: 0,
    soldQuantity: 0,
    totalRating: 0,
    createdAt: new Date().toISOString(),
    primaryImage: { url: '' },
    colors: []
  })

  useEffect(() => {
    if (product) {
      setForm(product)
      setImagePreview(product.primaryImage.url)
    } else {
      setForm({
        _id: '',
        title: '',
        slug: '',
        brand: '',
        series: { title: '' },
        discountPrice: 0,
        quantity: 0,
        soldQuantity: 0,
        totalRating: 0,
        createdAt: new Date().toISOString(),
        primaryImage: { url: '' },
        colors: []
      })
      setImagePreview('')
    }
  }, [product, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'discountPrice' || name === 'quantity' || name === 'soldQuantity' || name === 'totalRating') {
      setForm((prev) => ({ ...prev, [name]: Number(value) }))
    } else if (name === 'series') {
      setForm((prev) => ({ ...prev, series: { title: value } }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setForm((prev) => ({ ...prev, primaryImage: { url: result } }))
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    onSubmit(form)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-2xl font-semibold mb-4 text-blue-700'>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>

        <div className='flex flex-col gap-2 mb-6'>
          <label className='font-medium text-sm text-gray-700'>Product Image</label>
          <div
            className='border border-gray-300 rounded-lg p-2 flex items-center justify-center h-48 bg-gray-50 cursor-pointer'
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt='Preview' className='h-full object-contain' />
            ) : (
              <span className='text-gray-400'>Click to upload image</span>
            )}
          </div>
          <input type='file' ref={fileInputRef} accept='image/*' onChange={handleImageUpload} className='hidden' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <TextInput label='Title' name='title' value={form.title} onChange={handleChange} />
          <TextInput label='Slug' name='slug' value={form.slug} onChange={handleChange} />
          <TextInput label='Brand' name='brand' value={form.brand} onChange={handleChange} />
          <TextInput label='Series' name='series' value={form.series.title} onChange={handleChange} />
          <TextInput label='Price' name='discountPrice' value={form.discountPrice.toString()} onChange={handleChange} />
          <TextInput label='Quantity' name='quantity' value={form.quantity.toString()} onChange={handleChange} />
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <button onClick={onClose} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm'>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm'
          >
            {isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
