import { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [active, setActive] = useState("all");

  const handleClick = (category) => {
    setActive(category);
    onFilterChange(category);
  };

  return (
    <div className="flex gap-4 mb-6">
      {["all", "movie", "tv"].map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition 
            ${active === cat 
              ? "bg-[#6556CD] text-white shadow-md" 
              : "bg-[#1F1E24] text-gray-400 hover:bg-[#2a2930] hover:text-white"}`}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
