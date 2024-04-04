import React from "react";
import FormComponent from "./FormComponent";

const AdminForm = ({ handleSubmit }) => {
  const genderOptions = [
    { value: '1', label: 'Không Xác Định' },
    { value: '2', label: 'Nam' },
    { value: '3', label: 'Nữ' },
  ];

  const fields = [
    { label: "Tên", name: "name", type: "text", value: "", onChange: () => {}, required: true },
    { label: "Email", name: "email", type: "email", value: "", onChange: () => {}, required: true },
    { label: "Tài khoản", name: "username", type: "text", value: "", onChange: () => {}, required: true },
    { label: "Ngày sinh", name: "birthday", type: "date", value: "", onChange: () => {}, required: true },
    { label: "Mật khẩu", name: "password", type: "password", value: "", onChange: () => {}, required: true },
    { label: "Giới tính", name: "gender", type: "select", value: "", onChange: () => {}, options: genderOptions },
  ];

  return (
    <FormComponent handleSubmit={handleSubmit} fields={fields} />
  );
};

export default AdminForm;
