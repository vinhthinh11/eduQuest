function SubjectInput({ label, name, value, onChange, options }) {
  const handleSelectChange = e => {
    onChange(e.target.value);
  };
  console.log(options);

  return (
    <div className="my-5 flex items-center flex-col">
      <label htmlFor={name} className="text-gray-700 font-bold mr-2">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="bg-slate-200 px-3 py-1 w-full border-2 border-slate-300 focus:border-slate-400 rounded-md focus:outline-none"
        value={value}
        onChange={handleSelectChange}
      >
        {options?.map(option => (
          <option key={option?.subject_id} value={option?.subject_id}>
            {option?.subject_detail}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubjectInput;
