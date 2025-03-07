import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "~/components/card/Card";
import Voucher from "./Voucher";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  category: string;
  isNew: boolean;
  isBestSeller: boolean;
  isDiscounted: boolean;
};

const products: Product[] = Array.from({ length: 36 }, (_, i) => ({
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

const categories = ["All", "Pen", "Notebook", "School Supplies"];

const ProductPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortByPrice, setSortByPrice] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [filters, setFilters] = useState({
    bestSeller: false,
    isNew: false,
    discounted: false,
  });

  const productsPerPage = 12;

  const filteredProducts = products
    .filter((product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (
        (!filters.bestSeller && !filters.isNew && !filters.discounted) ||
        (filters.bestSeller && product.isBestSeller) ||
        (filters.isNew && product.isNew) ||
        (filters.discounted && product.isDiscounted)
      )
    )
    .sort((a, b) => {
      if (sortByPrice === "asc") return a.price - b.price;
      if (sortByPrice === "desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.name}`);
  };

  const handleViewDetails = (product: Product) => {
    console.log(`Viewing details for: ${product.name}`);
  };

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const applyDiscount = (code: string) => {
    setAppliedCoupon(code);
    console.log(`Applied discount code: ${code}`);
  };

  const coupons = [
    { id: 1, discount: 200000, minOrder: 1300000, code: "0325SALE200", expiry: "31/03/2025" },
    { id: 2, discount: 100000, minOrder: 800000, code: "DISCOUNT100", expiry: "15/04/2025" },
    { id: 3, discount: 100000, minOrder: 800000, code: "GIAMGIA100", expiry: "15/04/2025" },
  ];

  // Handlers for the input fields
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading zeros by parsing the value as a number and converting back to a string
    const rawValue = e.target.value.replace(/^0+/, "") || "0"; // Remove leading zeros, default to "0" if empty
    const newMinPrice = Number(rawValue);
    // Ensure minPrice doesn't exceed maxPrice and stays within bounds
    const clampedMinPrice = Math.min(Math.max(newMinPrice, 0), priceRange[1]);
    setPriceRange([clampedMinPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove leading zeros by parsing the value as a number and converting back to a string
    const rawValue = e.target.value.replace(/^0+/, "") || "0"; // Remove leading zeros, default to "0" if empty
    const newMaxPrice = Number(rawValue);
    // Ensure maxPrice isn't less than minPrice and stays within bounds
    const clampedMaxPrice = Math.max(Math.min(newMaxPrice, 200000), priceRange[0]);
    setPriceRange([priceRange[0], clampedMaxPrice]);
  };

  return (
    <section className="mx-auto p-10 flex gap-10">
      {/* Filter Sidebar */}
      <aside className="w-1/5 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl text-blue-700 font-semibold mb-4">Product Filters</h2>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Product Category</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Sorting */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Sort by Price</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
          >
            <option value="">Default</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Price Range with Slider and Inputs */}
        <div className="mb-4">
          <label className="block font-medium mb-2">
            Price Range:
          </label>
          <p className="mb-4 text-blue-500">{priceRange[0]} - {priceRange[1]} VNĐ</p>
          {/* Input Fields for Min and Max Price */}
          <div className="flex gap-2 mb-4">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Min Price</label>
              <input
                type="text" // Changed to text to better control the display
                pattern="[0-9]*" // Restrict input to numbers only
                value={priceRange[0]} // Display the numeric value directly
                onChange={handleMinPriceChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Min Price"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm mb-1">Max Price</label>
              <input
                type="text" // Changed to text to better control the display
                pattern="[0-9]*" // Restrict input to numbers only
                value={priceRange[1]} // Display the numeric value directly
                onChange={handleMaxPriceChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Max Price"
              />
            </div>
          </div>
          {/* Slider */}
          <Slider
            range
            min={0}
            max={200000}
            step={5000}
            value={priceRange}
            onChange={(value) => {
              setPriceRange(value as number[]);
            }}
          />
        </div>

        {/* Keyword Filters */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Tags</label>
          {(["bestSeller", "isNew", "discounted"] as (keyof typeof filters)[]).map((filter) => (
            <button
              key={filter}
              className={`w-full mb-2 p-2 rounded-lg text-center text-sm font-medium transition
                  ${filters[filter] ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}
              `}
              onClick={() => setFilters({ ...filters, [filter]: !filters[filter] })}
            >
              {filter === "bestSeller" ? "Best Seller" : filter === "isNew" ? "New Product" : "Discount"}
            </button>
          ))}
        </div>

        {/* Coupons Section */}
        <Voucher coupons={coupons} onApplyDiscount={applyDiscount} />

        {/* Display Applied Coupon */}
        {appliedCoupon && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Applied Coupon: <strong>{appliedCoupon}</strong>
          </div>
        )}
      </aside>

      {/* Product List */}
      <div className="w-4/5">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Product List</h1>
        <div className="flex flex-wrap gap-3">
          {displayedProducts.map((product) => (
            <div className="lg:w-[calc(25%-9px)] md:w-[calc(33.33%-8px)] sm:w-[calc(50%-12px)] w-full">
              <Card
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onViewDetails={() => handleViewDetails(product)}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="p-2 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages)
              .map((page, index, arr) => (
                <React.Fragment key={page}>
                  {index > 0 && page - arr[index - 1] > 1 && <span className="px-2">...</span>}
                  <button
                    className={`px-3 py-1 border rounded transition ${
                      currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              className="p-2 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPage;