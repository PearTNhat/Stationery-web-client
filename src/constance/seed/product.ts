export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  discount: boolean
  image: string
  product_images: { imgname: string }[]
  description: string
  long_description: string
  slug: string
  sold: number
  stock: number
  rating: number
  isNew: boolean
  isBestSeller: boolean
  isDiscounted: boolean
}

export const products: Product[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 3 === 0 ? 'Pen' : i % 3 === 1 ? 'Notebook' : 'School Supplies',
  price: Number((Math.random() * 200000).toFixed(0)),
  originalPrice: Number((Math.random() * 250000).toFixed(0)),
  discount: Math.random() > 0.5,
  image: 'https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg',
  product_images: [{ imgname: 'https://example.com/image1.jpg' }, { imgname: 'https://example.com/image2.jpg' }],
  description: 'Short product description',
  long_description: 'Full product details will be displayed here.',
  slug: `product-${i + 1}`,
  sold: Math.floor(Math.random() * 100),
  stock: Math.floor(Math.random() * 50) + 1,
  rating: Number((Math.random() * 5).toFixed(1)),
  isNew: i % 5 === 0,
  isBestSeller: i % 4 === 0,
  isDiscounted: i % 6 === 0
}))

export const sampleProduct: Product = {
  id: 1,
  name: 'Stylish Notebook',
  category: 'Notebook',
  price: 15.99,
  originalPrice: 19.99,
  discount: true,
  image: 'https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg',
  product_images: [{ imgname: 'https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg' }],
  description: 'A sleek and stylish notebook for your daily needs.',
  long_description: 'This notebook features high-quality paper, a durable cover, and a compact design.',
  slug: 'stylish-notebook',
  sold: 120,
  stock: 5,
  rating: 4.5,
  isNew: true,
  isBestSeller: false,
  isDiscounted: true
}

export const sampleSimilarProducts: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 3 === 0 ? 'Pen' : i % 3 === 1 ? 'Notebook' : 'School Supplies',
  price: Number((Math.random() * 200000).toFixed(0)),
  originalPrice: Number((Math.random() * 250000).toFixed(0)),
  discount: Math.random() > 0.5,
  image: 'https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg',
  product_images: [{ imgname: 'https://example.com/image1.jpg' }, { imgname: 'https://example.com/image2.jpg' }],
  description: 'Short product description',
  long_description: 'Full product details will be displayed here.',
  slug: `product-${i + 1}`,
  sold: Math.floor(Math.random() * 100),
  stock: Math.floor(Math.random() * 50) + 1,
  rating: Number((Math.random() * 5).toFixed(1)),
  isNew: i % 5 === 0,
  isBestSeller: i % 4 === 0,
  isDiscounted: i % 6 === 0
}))

export type Coupon = {
  id: number
  discount: number
  minOrder: number
  code: string
  expiry: string
}
