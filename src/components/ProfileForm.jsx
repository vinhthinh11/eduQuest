import React, { useState } from "react";
import InputField from "./InputField";
import SelectInput from "./SelectInput";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "example_username",
    birthday: "2000-01-01",
    gender: "1",
    lastLogin: "2024-04-04",
    name: "Example Name",
    currentEmail: "example@example.com",
    newEmail: "example@example.com",
    password: "",
  });

  const genderOptions = [
    { value: "1", label: "Không Xác Định" },
    { value: "2", label: "Nam" },
    { value: "3", label: "Nữ" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu form đi
  };

  return (
    <div className="title-content flex justify-center">
       
      <div className="block-content my-auto mt-6">
      <span className="title">Thông Tin Cá Nhân</span>
        <div className="content">
          <div className="flex flex-row justify-center mt-10">
            <div className="w-1/2 mx-auto mr-4">
              <img
                src="http://localhost:8080/website/res/img/avatar/avatar-default.jpg"
                alt="Avatar"
                className="w-auto h-44"
                id="profiles-avatar"
              />
              <div className="file-field input-field mt-7">
                <label
                  htmlFor="file_data"
                  className="btn text-white bg-customPurple hover:bg-purple-700 py-2 px-4 input-field mb-4 md:mb-0 mr-0 md:mr-4"
                >
                  <span>Chọn File</span>
                  <input
                    type="file"
                    name="file_data"
                    id="file_data"
                    width="100"
                    height="100"
                    required
                    className="hidden"
                  />
                </label>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                  <img
                    src="res/img/loading.gif"
                    width="50"
                    height="50"
                    className="valid-img hidden"
                    id="avatar_uploading"
                  />
                </div>
              </div>
              <span className="help text-green-700">
                Ảnh JPG,PNG nhỏ hơn 2mb
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              id="upload_profiles"
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10 whitespace-nowrap">
                <InputField
                  label="Tên truy cập"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
                <InputField
                  label="Tên"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Ngày sinh"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <SelectInput
                  label="Giới tính"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                />
                <InputField
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 mt-4">
                <div className="col-span-1">
                  <div className="input-field">
                    <span>Đăng nhập cuối:</span>
                    <br />
                    <span id="profiles-last-login">{formData.lastLogin}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div>
                    <button
                      type="submit"
                      className="btn bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mx-auto float-right"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
