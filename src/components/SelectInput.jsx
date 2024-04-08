import React from 'react';

const SelectInput = ({ label, name, value, onChange, options }) => {
  const handleSelectChange = e => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4 flex items-center border-b-2">
      <label htmlFor={name} className="text-gray-700 font-bold mr-2">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="input-field"
        value={value}
        onChange={handleSelectChange}
      >
        {options?.map(option => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
