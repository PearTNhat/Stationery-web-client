import { Review } from './comment'
import { Promotion } from './promotion'

interface Size {
  sizeId: string
  name: string
  piority: number
}

export interface ProductDetail {
  productDetailId: string
  slug: string
  stockQuantity: number
  originalPrice: number
  soldQuantity: number
  discountPrice: number
  size: Size
  promotion: Promotion | null
  // productId?: string
}

interface Image {
  imageId: string
  url: string
  priority: number
}
interface Color {
  colorId: string
  name: string
  hex: string
}
interface ProductColor {
  productColorId: string
  color: Color
  productDetails: ProductDetail[]
  images: Image[]
  sizes: Size[]
}

interface Product {
  productId: string
  name: string
  description: string
  slug: string
  category: {
    categoryId: string
    categoryName: string
  }
  productColors: ProductColor[]
  minPrice: number
  soldQuantity: number
  quantity: number
  totalRating: number
  createdAt: string
}
interface ProductDeatilResponse extends Product {
  image: Image[]
  reviews: Review[]
}
export type { Product, Color, ProductColor, ProductDeatilResponse, Image, Size }
