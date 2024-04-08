import React from "react";
import FormComponent from "../FormComponent";

const ClassForm = ({ handleSubmit }) => {
  const gradeOptions = [
    { value: '1', label: 'Khối 10' },
    { value: '2', label: 'Khối 11' },
    { value: '3', label: 'Khối 12' },
  ];

  const fields = [
    { label: "Tên lớp", name: "name", type: "text", value: "", required: true },
    { label: "Khối", name: "grade", type: "select", value: "Hãy chọn khối", options: gradeOptions },
    { label: "Giáo viên", name: "teacher", type: "select", value: "", options: gradeOptions },
  ];

  return (
    <FormComponent handleSubmit={handleSubmit} fields={fields} />
  );
};

export default ClassForm;
