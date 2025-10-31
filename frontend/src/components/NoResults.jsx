import React from "react";
import { FaSearch } from "react-icons/fa";

function NoResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
      <FaSearch className="text-6xl mb-4 animate-pulse text-yellow-500" />
      <h2 className="text-2xl font-semibold mb-2">No results found</h2>
      {query && <p className="text-gray-400">We couldn't find any movies matching "<span className="text-white">{query}</span>"</p>}
    </div>
  );
}

export default NoResults;
