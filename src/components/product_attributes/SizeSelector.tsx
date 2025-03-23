import React from "react";

type SizeSelectorProps = {
  selectedSize: string;
  onSizeChange: (size: string) => void;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  const sizes = ["Small", "Medium", "Large"];

  return (
    <div className="mt-4">
      <label className="block text-gray-700 font-semibold">Choose size:</label>
      <div className="flex gap-2 mt-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 border rounded-lg ${selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
