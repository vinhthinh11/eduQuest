import React from "react";
import FormComponent from "../FormComponent";

const TeacherForm = ({ handleSubmit }) => {
  const genderOptions = [
    { value: '1', label: 'Không Xác Định' },
    { value: '2', label: 'Nam' },
    { value: '3', label: 'Nữ' },
  ];

  const fields = [
    { label: "Tên", name: "name", type: "text", value: "", required: true },
    { label: "Email", name: "email", type: "email", value: "", required: true },
    { label: "Tài khoản", name: "username", type: "text", value: "", required: true },
    { label: "Ngày sinh", name: "birthday", type: "date", value: "", required: true },
    { label: "Mật khẩu", name: "password", type: "password", value: "", required: true },
    { label: "Giới tính", name: "gender", type: "select", value: "", options: genderOptions },
  ];

  return (
    <FormComponent handleSubmit={handleSubmit} fields={fields} />
  );
};

export default TeacherForm;
