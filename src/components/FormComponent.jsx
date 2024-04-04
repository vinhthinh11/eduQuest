import React, { useState } from "react";
import InputField from "../components/InputField";
import SelectInput from "../components/SelectInput";

const FormComponent = ({ handleSubmit, fields }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFocus = (fieldName) => {
    
  };

  const handleBlur = () => {
   
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(formData);
  };

  return (
    <div className="mx-10 mb-20">
      <form onSubmit={submitForm} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10 whitespace-nowrap">
          {/* Form Inputs */}
          {fields.map((field, index) => (
            field.type !== "select" && (
              <InputField
                key={index}
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                onFocus={() => handleFocus(field.name)}
                onBlur={handleBlur}
                required={field.required}
              />
            )
          ))}
          {fields.map((field, index) => (
            field.type === "select" && (
              <SelectInput
                key={index}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(value) => handleInputChange(field.name, value)}
                options={field.options}
              />
            )
          ))}
        </div>
        <div className="col-span-12 mt-10">
          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
