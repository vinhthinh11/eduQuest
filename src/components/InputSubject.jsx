import React from 'react';
const InputSubject = ({
  label = '',
  name = '',
  value = '',
  onChange = () => {},
  errors = {},
  options = [],
}) => {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className="flex gap-2 items-center justify-between">
        <label className="text-gray-700 font-medium" htmlFor={name}>
          {label}
        </label>
        {errors?.name?.message && (
          <p className="text-red-500 border-2 border-red-500 px-2 rounded-md">
            {errors?.[name].message}
          </p>
        )}
      </div>
      <select
        className="px-3 py-1 w-full border-2 border-slate-300 focus:border-slate-400 bg-slate-200 rounded-md focus:outline-none"
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option
            className="bg-slate-200"
            key={option.subject_id}
            value={option.subject_id}
          >
            {option.subject_detail}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSubject;
