import React from "react";
import CategoryFilter from "~/components/filter/CategoryFilter";
import PriceRange from "~/components/filter/PriceRange";
import SortByPrice from "~/components/filter/SortByPrice";
import TagFilter from "~/components/filter/TagFilter";

type FiltersProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortByPrice: string;
  setSortByPrice: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  filters: { bestSeller: boolean; isNew: boolean; discounted: boolean };
  setFilters: (filters: { bestSeller: boolean; isNew: boolean; discounted: boolean }) => void;
};

const Filters: React.FC<FiltersProps> = ({
  selectedCategory, setSelectedCategory, sortByPrice, setSortByPrice,
  priceRange, setPriceRange, filters, setFilters
}) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow flex items-center justify-between overflow-x-auto">
      {/* Danh mục */}
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {/* Sắp xếp giá */}
      <SortByPrice sortByPrice={sortByPrice} setSortByPrice={setSortByPrice} />

      {/* Khoảng giá */}
      <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />

      {/* Tags */}
      <TagFilter filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Filters;
