import React from "react";

type ColorSelectorProps = {
  colors: { name: string; hex: string }[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onColorSelect }) => {
  const handleColorSelect = (color: string) => {
    if (selectedColor === color) {
      onColorSelect(""); // Bỏ chọn nếu đã chọn
    } else {
      onColorSelect(color); // Chọn màu mới
    }
  };

  return (
    <div className="flex gap-3 mt-2">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => handleColorSelect(color.name)}
          className={`w-10 h-10 rounded-full border-2 transition-all ${
            selectedColor === color.name
              ? "border-black scale-110 ring-2 ring-offset-2 ring-black"
              : "border-transparent"
          }`}
          style={{ backgroundColor: color.hex }}
        ></button>
      ))}
    </div>
  );
};

export default ColorSelector;