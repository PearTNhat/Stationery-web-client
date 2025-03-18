import React, { useState } from "react";
import { Product, products } from "~/constance/seed/product";
import { ProductList } from "./ProductList";
import Filters from "./Filters";


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
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const productsPerPage = 12;

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        ((!filters.bestSeller && !filters.isNew && !filters.discounted) ||
          (filters.bestSeller && product.isBestSeller) ||
          (filters.isNew && product.isNew) ||
          (filters.discounted && product.isDiscounted))
    )
    .sort((a, b) => {
      if (sortByPrice === "asc") return a.price - b.price;
      if (sortByPrice === "desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product: Product) => {
    console.log(`Added to cart: ${product.name}`);
  };

  const handleViewDetails = (product: Product) => {
    console.log(`Viewing details for: ${product.name}`);
  };

  const applyDiscount = (code: string) => {
    setAppliedCoupon(code);
    console.log(`Applied discount code: ${code}`);
  };

  const coupons = [
    { id: 1, discount: 200000, minOrder: 1300000, code: "0325SALE200", expiry: "31/03/2025" },
    { id: 2, discount: 100000, minOrder: 800000, code: "DISCOUNT100", expiry: "15/04/2025" },
    { id: 3, discount: 100000, minOrder: 800000, code: "GIAMGIA100", expiry: "15/04/2025" },
  ];

  return (
    <section className="mx-auto p-10 flex gap-10">
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortByPrice={sortByPrice}
        setSortByPrice={setSortByPrice}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filters={filters}
        setFilters={setFilters}
        coupons={coupons}
        appliedCoupon={appliedCoupon}
        onApplyDiscount={applyDiscount}
      />
      <ProductList
        products={filteredProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </section>
  );
};

export default ProductPage;