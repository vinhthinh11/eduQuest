import React from 'react';
const genderOptions = [
  { value: 1, label: 'Nam' },
  { value: 2, label: 'Nữ' },
  { value: 3, label: 'Không Xác Định' },
];

const InputDefault = ({
  label = '',
  name = '',
  type = '',
  value = '',
  onChange = () => {},
  register = {},
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
      {name === 'gender' ? (
        <select
          className="px-3 py-1 w-full border-2 border-slate-300 focus:border-slate-400 bg-slate-200 rounded-md focus:outline-none"
          value={value}
          onChange={onChange}
        >
          {genderOptions.map(option => (
            <option
              className="bg-slate-200"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : show ? (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="px-3 py-1 w-full border-2 border-slate-300 focus:border-slate-400 bg-slate-200 rounded-md focus:outline-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          onChange={onChange}
          className="px-3 py-1 w-full border-2 border-slate-300 focus:border-slate-400 bg-slate-200 rounded-md focus:outline-none"
        />
      )}
    </div>
  );
};

export default InputDefault;
