import React from 'react';
const levelOption = [
  { value: 1, label: 'Dễ' },
  { value: 2, label: 'Trung bình' },
  { value: 3, label: 'Khó' },
];

const InputLevel = ({
  label = '',
  name = '',
  type = '',
  value = '',
  onChange = () => {},
  errors = {},
  show = true,
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
        {levelOption.map(option => (
          <option
            className="bg-slate-200"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputLevel;
