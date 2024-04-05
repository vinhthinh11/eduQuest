import React, { useState } from 'react';

const SearchComponent = ({ data }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = data.filter((item) => {
      // Thực hiện tìm kiếm không phân biệt chữ hoa chữ thường
      return item.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="outline-none border-b-2 mr-3 border-edu" 
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
