interface ProductSearchParams {
  minPrice?: string
  maxPrice?: string
  sortBy?: string
  categoryId?: string
  [key: string]: any // nếu có thêm các param khác
}
export type { ProductSearchParams }
