import Banner from './Banner'
import ProductCategories from './ProductCategories'
import Faq from './Faq'
import { publicPaths } from '~/constance/paths'
import FloatingButtons from '~/components/contactnow/FloatingButtons'
import NewProduct from './component/NewProduct'

// Định nghĩa kiểu dữ liệu cho banner
interface BannerData {
  id: number
  image: string
  title: string
  content: string
  buttonText: string
  buttonLink: string
}

// Mảng dữ liệu banner
const banners: BannerData[] = [
  {
    id: 1,
    image: 'public/images/banner1.jpg',
    title: 'New Collection Arrived',
    content: 'Discover unique and creative stationery items!',
    buttonText: 'Shop Now',
    buttonLink: publicPaths.PRODUCT
  },
  {
    id: 2,
    image: 'public/images/banner2.jpg',
    title: 'Big April Sale',
    content: 'Up to 50% off on hundreds of stationery products!',
    buttonText: 'Get Deals',
    buttonLink: publicPaths.PRODUCT
  },
  {
    id: 3,
    image: 'public/images/banner3.jpg',
    title: 'Free Shipping',
    content: 'Enjoy free shipping on orders over $12!',
    buttonText: 'Learn More',
    buttonLink: publicPaths.SHIPPING_POLICY
  }
]

// Định nghĩa kiểu dữ liệu cho ProductSection

const Home: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100 p-6'>
      <Banner banners={banners} />
      <ProductCategories />
      <NewProduct />
      {/* <ProductSection title='Featured Products' products={sampleProducts} /> */}
      <Faq />
      <FloatingButtons />
    </div>
  )
}

export default Home
