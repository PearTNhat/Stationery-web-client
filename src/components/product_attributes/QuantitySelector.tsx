import React from "react";

type QuantitySelectorProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="px-3 py-2 bg-gray-300 rounded-lg"
      >
        -
      </button>
      <span className="px-4 py-2 bg-gray-100">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="px-3 py-2 bg-gray-300 rounded-lg"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
