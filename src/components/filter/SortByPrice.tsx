import React from "react";

type Props = {
  sortByPrice: string;
  setSortByPrice: (value: string) => void;
};

const SortByPrice: React.FC<Props> = ({ sortByPrice, setSortByPrice }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Sort by Price</label>
      <select
        className="w-full p-2 border rounded-lg"
        value={sortByPrice}
        onChange={(e) => setSortByPrice(e.target.value)}
      >
        <option value="">Default</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortByPrice;
