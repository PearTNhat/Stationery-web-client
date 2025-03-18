import React from "react";

type Props = {
  filters: { bestSeller: boolean; isNew: boolean; discounted: boolean };
  setFilters: (filters: { bestSeller: boolean; isNew: boolean; discounted: boolean }) => void;
};

const TagFilter: React.FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Tags</label>
      {(["bestSeller", "isNew", "discounted"] as (keyof typeof filters)[]).map((filter) => (
        <button
          key={filter}
          className={`w-full mb-2 p-2 rounded-lg text-center text-sm font-medium transition
            ${filters[filter] ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          onClick={() => setFilters({ ...filters, [filter]: !filters[filter] })}
        >
          {filter === "bestSeller" ? "Best Seller" : filter === "isNew" ? "New Product" : "Discount"}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
