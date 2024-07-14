import React, { useCallback } from "react";

export function Sort({ sortOrder, setSortOrder }) {
  const handleSortChange = useCallback(
    (order) => {
      setSortOrder(order);
    },
    [setSortOrder]
  );

  return (
    <div className="my-4 flex justify-center space-x-4">
      <button
        className={`border-3 rounded-lg px-4 py-2 ${
          sortOrder === "asc"
            ? "border-pink-500 bg-pink-500 text-white"
            : "border-pink-500 bg-white text-pink-500"
        }`}
        onClick={() => handleSortChange("asc")}
      >
        Ascending release date
      </button>
      <button
        className={`border-3 rounded-lg px-4 py-2 ${
          sortOrder === "desc"
            ? "border-purple-500 bg-purple-500 text-white"
            : "border-purple-500 bg-white text-purple-500"
        }`}
        onClick={() => handleSortChange("desc")}
      >
        Descending release date
      </button>
    </div>
  );
}
