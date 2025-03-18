import React from "react";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const categories = ["All", "Pen", "Notebook", "School Supplies"];

const CategoryFilter: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Product Category</label>
      <select
        className="w-full p-2 border rounded-lg"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
