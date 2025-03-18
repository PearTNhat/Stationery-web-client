// components/product/ProductTabs.tsx
import React, { useState } from "react";
import { Product } from "~/constance/seed/product";

type ProductTabsProps = {
  product: Product;
};

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-8">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "description"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Product Description
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Customer Reviews
        </button>
      </div>
      <div className="p-6">
        {activeTab === "description" ? (
          <p>{product.long_description}</p>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};