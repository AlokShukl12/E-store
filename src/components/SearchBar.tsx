import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="w-full relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white"
          aria-label="Search products"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 