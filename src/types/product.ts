import { Review } from './review'

interface Size {
  sizeId: string
  name: string
}

export interface ProductDetail {
  productDetailId: string
  slug: string
  stockQuantity: number
  originalPrice: number
  soldQuantity: number
  discountPrice: number
  size: Size
}

interface Image {
  imageId: string
  url: string
  priority: number
}
export interface Color {
  colorId: string
  name: string
  hex: string
}
export interface ProductColor {
  productColorId: string
  color: Color
  productDetails: ProductDetail[]
  images: Image[]
}

export interface Product {
  productId: string
  name: string
  description: string
  category: {
    categoryId: string
    categoryName: string
  }
  productColors: ProductColor[]
  reviews: Review[]
  totalRating: number
  createdAt: string
}
