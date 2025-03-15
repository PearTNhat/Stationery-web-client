import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
};

const PriceRange: React.FC<Props> = ({ priceRange, setPriceRange }) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(Number(e.target.value.replace(/^0+/, "")) || 0, 0);
    setPriceRange([Math.min(newMin, priceRange[1]), priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.min(Number(e.target.value.replace(/^0+/, "")) || 0, 200000);
    setPriceRange([priceRange[0], Math.max(newMax, priceRange[0])]);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Price Range:</label>
      <p className="mb-4 text-blue-500">{priceRange[0]} - {priceRange[1]} VNĐ</p>
      <div className="flex gap-2 mb-4">
        <input type="text" className="w-1/2 p-2 border rounded-lg" value={priceRange[0]} onChange={handleMinPriceChange} />
        <input type="text" className="w-1/2 p-2 border rounded-lg" value={priceRange[1]} onChange={handleMaxPriceChange} />
      </div>
      <Slider range min={0} max={200000} step={5000} value={priceRange} onChange={(val) => setPriceRange(val as number[])} />
    </div>
  );
};

export default PriceRange;
