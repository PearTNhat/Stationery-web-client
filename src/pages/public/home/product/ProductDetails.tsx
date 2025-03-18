import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/button/Button";
import Card from "~/components/card/Card";

// Định nghĩa kiểu dữ liệu cho sản phẩm
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number; // Thêm vào để tránh lỗi
  discount: boolean; // Thêm vào để tránh lỗi
  image: string;
  product_images: { imgname: string }[]; // Cập nhật kiểu dữ liệu
  description: string;
  long_description: string;
  slug: string;
  sold: number;
  stock: number;
  rating: number;
  isNew: boolean;
  isBestSeller: boolean;
  isDiscounted: boolean;
};

// Sản phẩm mẫu
const sampleProduct: Product = {
  id: 1,
  name: "Stylish Notebook",
  category: "Notebook",
  price: 15.99,
  originalPrice: 19.99,
  discount: true,
  image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg",
  product_images: [
    { imgname: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg" },
  ],
  description: "A sleek and stylish notebook for your daily needs.",
  long_description: "This notebook features high-quality paper, a durable cover, and a compact design.",
  slug: "stylish-notebook",
  sold: 120,
  stock: 5,
  rating: 4.5,
  isNew: true,
  isBestSeller: false,
  isDiscounted: true,
};

// Mảng sản phẩm tương tự
const sampleSimilarProducts: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 3 === 0 ? "Pen" : i % 3 === 1 ? "Notebook" : "School Supplies",
  price: Number((Math.random() * 200000).toFixed(0)),
  originalPrice: Number((Math.random() * 250000).toFixed(0)),
  discount: Math.random() > 0.5,
  image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg",
  product_images: [
    { imgname: "https://example.com/image1.jpg" },
    { imgname: "https://example.com/image2.jpg" },
  ],
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

export { sampleProduct, sampleSimilarProducts };


export default function ProductDetail() {
  const [product] = useState(sampleProduct);
  const [similarProducts] = useState(sampleSimilarProducts);
  const [currentImage, setCurrentImage] = useState(0);
  const [size, setSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.product_images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product.product_images]);

  const handleAddToCart = (id: number) => {
    console.log(`Thêm sản phẩm ${id} vào giỏ hàng`);
  };

  const handleViewDetails = (id: number) => {
    console.log(`Xem chi tiết sản phẩm ${id}`);
  };

  const [selectedColor, setSelectedColor] = useState("Red");
  const colors = [
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Green", hex: "#22C55E" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.product_images[currentImage]?.imgname}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-blue-700">{product.name}</h1>
          {product.discount ? (
            <p className="text-lg text-blue-600 font-semibold">
              ${product.price} <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
            </p>
          ) : (
            <p className="text-lg text-blue-600 font-semibold">${product.price}</p>
          )}
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="mt-2">Status:
            <span className={`mt-2 font-semibold ${product.stock > 0 ? "text-blue-600" : "text-red-600"}`}>{product.stock > 0 ? " In Stock" : " Out of Stock"}</span>
          </p>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Choose size:</label>
            <div className="flex gap-2 mt-2">
              {["Small", "Medium", "Large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded-lg ${size === s ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">Choose color:</label>
            <div className="flex gap-3 mt-2">
              {[{ name: "Red", hex: "#EF4444" }, { name: "Blue", hex: "#3B82F6" }, { name: "Green", hex: "#22C55E" }].map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? "border-black scale-110 ring-2 ring-offset-2 ring-black" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 bg-gray-300 rounded-lg">-</button>
            <span className="px-4 py-2 bg-gray-100">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 bg-gray-300 rounded-lg">+</button>
          </div>

          <div className="mt-4 flex gap-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-1/2">
              <Link to={`/products/payment/${product.id}`}>Buy Now</Link>
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex border-b">
          <button className={`px-4 py-2 font-semibold ${activeTab === "description" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("description")}>Product Description</button>
          <button className={`px-4 py-2 font-semibold ${activeTab === "reviews" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("reviews")}>Customer Reviews</button>
        </div>
        <div className="p-6">
          {activeTab === "description" ? <p>{product.long_description}</p> : <p>No reviews yet.</p>}
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center">Similar Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {similarProducts.map((item) => (
                <Card
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
          ))}
        </div>
      </div>
    </div>
  );
}