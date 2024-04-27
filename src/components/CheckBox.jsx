import React from 'react';

const CheckBox = ({ label, value, onChange, options }) => {
  const handleCheckboxChange = (option) => {
    const updatedValue = value.includes(option)
      ? value.filter((item) => item.value !== option.value)
      : [...value, option];
    onChange(updatedValue);
  };

  return (
    <div>
      <p>{label}</p>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            checked={value.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
