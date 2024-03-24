import React from 'react';

const InputField = ({ label, name, type, value, onChange, onFocus, onBlur, required }) => {
  return (
    <div className="relative mb-4 border-b-2">
      <div className="flex items-center">
        <label htmlFor={name} className={`pl-2 text-gray-700 font-bold transition-all ${value ? 'top-0 -translate-y-5 text-sm text-custom-purple' : ''}`}>
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          className="input-field pl-8 outline-none border-none w-full"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputField;
