import React, { useState } from 'react';

const InputField = ({ label, name, type, value, onChange, onFocus, onBlur, required }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <div className="relative mb-4 border-b-2">
      <div className="flex items-center">
      <label className={`text-gray-700 font-bold absolute transition-all ${isFocused || value ? '-top-2 text-sm' : ''}`} htmlFor={name}>
        {label}
      </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          className="input-field pl-8 outline-none border-none w-full ml-11"
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputField;
