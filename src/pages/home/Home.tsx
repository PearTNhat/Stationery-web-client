import { useState } from "react";
import Card from "~/components/card/Card";
import Banner from "./Banner";
import ProductCategories from "./ProductCategories";
import Faq from "./Faq";

// Định nghĩa kiểu dữ liệu cho sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: boolean;
  image: string;
  description: string;
  long_description: string;
  slug: string;
  product_images: { imgname: string }[];
  sold: number;
  stock: number;
  rating: number;
  category: string; // Missing property
  isNew: boolean; // Missing property
  isBestSeller: boolean; // Missing property
  isDiscounted: boolean; // Missing property
};


// Mảng sản phẩm mẫu
const sampleProducts: Product[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 3 === 0 ? "Pen" : i % 3 === 1 ? "Notebook" : "School Supplies",
  price: Number((Math.random() * 200000).toFixed(0)),
  originalPrice: Number((Math.random() * 250000).toFixed(0)), // Thêm giá gốc để tránh lỗi undefined
  discount: Math.random() > 0.5, // Random trạng thái giảm giá
  image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg",
  product_images: [
    { imgname: "https://example.com/image1.jpg" },
    { imgname: "https://example.com/image2.jpg" },
  ], // Định dạng đúng
  description: "Short product description",
  long_description: "Full product details will be displayed here.",
  slug: `product-${i + 1}`,
  sold: Math.floor(Math.random() * 100),
  stock: Math.floor(Math.random() * 50) + 1,
  rating: Number((Math.random() * 5).toFixed(1)),
  isNew: i % 5 === 0,
  isBestSeller: i % 4 === 0,
  isDiscounted: i % 6 === 0,
}));

// Định nghĩa kiểu dữ liệu cho banner
interface BannerData {
  id: number;
  image: string;
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
}

// Mảng dữ liệu banner
const banners: BannerData[] = [
  {
    id: 1,
    image: "https://haycafe.vn/wp-content/uploads/2022/03/Background-banner-1.jpg",
    title: "Discover New Arrivals",
    content: "Explore our latest collection now",
    buttonText: "Shop Now",
    buttonLink: "#shop",
  },
  {
    id: 2,
    image: "https://th.bing.com/th?id=OIP.9FcAolHajDjUhAItsWmV9QHaDU&w=350&h=156&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    title: "Spring Sale",
    content: "Up to 50% off everything",
    buttonText: "Get Deals",
    buttonLink: "#sale",
  },
  {
    id: 3,
    image: "https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-thoi-trang.jpg",
    title: "Free Shipping",
    content: "On orders over $50",
    buttonText: "Learn More",
    buttonLink: "#shipping",
  },
];

// Định nghĩa kiểu dữ liệu cho ProductSection
interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [page, setPage] = useState(0);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.name}`);
  };

  // Hàm xử lý khi nhấn xem chi tiết
  const handleViewDetails = (product: Product) => {
    console.log(`Viewing details for: ${product.name}`);
  };

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <section className="container mx-auto py-12 px-6">
      <h3 className="text-2xl font-bold text-blue-800 text-center mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(page * productsPerPage, (page + 1) * productsPerPage).map((product) => (
          <Card
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
            onViewDetails={() => handleViewDetails(product)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded-lg mr-2">← Prev</button>
        <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded-lg">Next →</button>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <Banner banners={banners} />
      <ProductCategories />
      <ProductSection title="New Products" products={sampleProducts} />
      <ProductSection title="Featured Products" products={sampleProducts} />
      <Faq />
    </div>
  );
};

export default Home;
