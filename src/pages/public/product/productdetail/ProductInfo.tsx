// components/product/ProductInfo.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "~/components/button/Button";
import { Product } from "~/constance/seed/product";

type ProductInfoProps = {
  product: Product;
  onAddToCart: (id: number) => void;
};

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [size, setSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Red");
  const colors = [
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Green", hex: "#22C55E" },
  ];

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-2xl font-bold text-blue-700">{product.name}</h1>
      {product.discount ? (
        <p className="text-lg text-blue-600 font-semibold">
          ${product.price}{" "}
          <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
        </p>
      ) : (
        <p className="text-lg text-blue-600 font-semibold">${product.price}</p>
      )}
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="mt-2">
        Status:
        <span
          className={`mt-2 font-semibold ${product.stock > 0 ? "text-blue-600" : "text-red-600"}`}
        >
          {product.stock > 0 ? " In Stock" : " Out of Stock"}
        </span>
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
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? "border-black scale-110 ring-2 ring-offset-2 ring-black"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
            ></button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 bg-gray-300 rounded-lg"
        >
          -
        </button>
        <span className="px-4 py-2 bg-gray-100">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-2 bg-gray-300 rounded-lg"
        >
          +
        </button>
      </div>

      <div className="mt-4 flex gap-4">
        <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-1/2">
          <Link to={`/products/payment/${product.id}`}>Buy Now</Link>
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2"
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};