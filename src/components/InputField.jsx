import React, { useState } from 'react';

const InputField = ({
  label = '',
  name = '',
  type = '',
  value = '',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  required = false,
}) => {
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
        <label
          className={`text-gray-700 font-bold absolute transition-all ${
            isFocused || value ? '-top-5 text-sm' : ''
          }`}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          className="input-field px-4 py-1 outline-1 outline-slate-400 border-none w-full focus:bg-slate-200 rounded-md "
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
