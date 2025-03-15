import React from "react";
import CategoryFilter from "~/components/filter/CategoryFilter";
import PriceRange from "~/components/filter/PriceRange";
import SortByPrice from "~/components/filter/SortByPrice";
import TagFilter from "~/components/filter/TagFilter";
import Voucher from "~/components/voucher/Voucher";

type FiltersProps = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortByPrice: string;
  setSortByPrice: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  filters: { bestSeller: boolean; isNew: boolean; discounted: boolean };
  setFilters: (filters: { bestSeller: boolean; isNew: boolean; discounted: boolean }) => void;
  coupons: { id: number; discount: number; minOrder: number; code: string; expiry: string }[];
  appliedCoupon: string | null;
  onApplyDiscount: (code: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  selectedCategory, setSelectedCategory, sortByPrice, setSortByPrice,
  priceRange, setPriceRange, filters, setFilters, coupons, appliedCoupon, onApplyDiscount
}) => {
  return (
    <aside className="w-1/5 bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-xl text-blue-700 font-semibold mb-4">Product Filters</h2>

      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SortByPrice sortByPrice={sortByPrice} setSortByPrice={setSortByPrice} />
      <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
      <TagFilter filters={filters} setFilters={setFilters} />

      <Voucher coupons={coupons} onApplyDiscount={onApplyDiscount} />
      {appliedCoupon && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Applied Coupon: <strong>{appliedCoupon}</strong>
        </div>
      )}
    </aside>
  );
};

export default Filters;
