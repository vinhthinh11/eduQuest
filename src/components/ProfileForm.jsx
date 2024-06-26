import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import { getMe, updateProfile } from '../services/apiUser.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';
const role = { 1: 'Admin', 2: 'Giáo viên', 3: 'Học sinh', 4: 'Trưởng bộ môn' };

const ProfileForm = () => {
  const navigate = useNavigate();
  const genderOptions = [
    { value: '1', label: 'Không Xác Định' },
    { value: '2', label: 'Nam' },
    { value: '3', label: 'Nữ' },
  ];
  const [user, setUser] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [update, setIsUpdate] = useState(false);
  const [erros, setErrors] = useState({});

  const handleChange = e => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setUpdateUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = e => {
    setUpdateUser(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(updateUser);
      if (Object.keys(updateUser).length !== 0) {
        await updateProfile(updateUser);
      }
      toast.success('Cập nhật thành công');
      setIsUpdate(!update);
    } catch (err) {
      console.log(err);
      toast.error('Cập nhật thất bại');
    }
  };
  useEffect(() => {
    async function getUser() {
      const { data } = await getMe();
      console.log(data);
      setUser({ ...data, password: '' });
    }
    getUser();
  }, [update]);

  return (
    <div className="title-content flex justify-center">
      <div className="block-content my-auto mt-6">
        <span className="title">Thông Tin Cá Nhân</span>
        <div className="content">
          <div className="flex flex-row justify-center mt-10">
            <div className="w-1/2 mx-auto mr-4 flex flex-col justify-center items-center">
              {user?.avatar && (
                <img
                  src={`http://127.0.0.1:8000${
                    user.avatar === 'avatar-default.jpg'
                      ? `/storage/${user.avatar}`
                      : user.avatar
                  }`}
                  alt="Avatar"
                  className="w-36 h-40 rounded-lg object-cover"
                  id="profiles-avatar"
                />
              )}
              <div className="mt-4 flex flex-col items-center">
                <label
                  htmlFor="file_data"
                  className="btn text-white bg-customPurple hover:bg-purple-700 py-2 px-4 input-field mb-4 md:mb-0 mr-0 md:mr-4 rounded-md"
                >
                  <span>Chọn File</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file_data"
                    width="100"
                    height="100"
                    required
                    className="hidden"
                    onChange={handleFileChange}
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
                    alt="user avatar random..."
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
                  value={user?.username}
                  onChange={handleChange}
                />
                <InputField
                  label="Tên"
                  name="name"
                  type="text"
                  value={user?.name}
                />
                <InputField
                  label="Chức vụ"
                  name="permission_id"
                  type="text"
                  value={role[user?.permission]}
                />
                <div>
                  <InputField
                    label="Ngày sinh"
                    name="birthday"
                    type="date"
                    value={user?.birthday}
                    onChange={e => {
                      setErrors(prev => ({ ...prev, birthday: '' }));
                      const currentYear = new Date().getFullYear();
                      const selectedYear = new Date(
                        e.target.value
                      ).getFullYear();
                      const yearDifference = currentYear - selectedYear;
                      if (yearDifference > 10) {
                        handleChange(e);
                      } else
                        setErrors({
                          ...erros,
                          birthday: 'Tuổi phải lớn hơn 10',
                        });
                    }}
                  />
                  {erros.birthday && (
                    <p className="text-red-500 border-2 border-red-500 px-2 rounded-md">
                      {erros.birthday}
                    </p>
                  )}
                </div>
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={user?.email}
                  onChange={handleChange}
                />
                <div className="flex flex-col" style={{ marginTop: '-20px' }}>
                  <label
                    htmlFor="gender"
                    className="text-gray-700 font-bold mr-2"
                  >
                    Giới Tính
                  </label>
                  <select
                    name="gender_id"
                    id="gender"
                    className="bg-slate-200 px-3 py-1 w-full border-2 border-slate-300 focus:border-slate-400 rounded-md focus:outline-none "
                    value={user?.gender_id}
                    onChange={handleChange}
                  >
                    {genderOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-bold absolute transition-all -mt-5">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user?.password}
                    className="input-field px-4 py-1 outline-1 outline-slate-400 border-none w-full focus:bg-slate-200 rounded-md "
                    onChange={handleChange}
                  />
                  <hr className="border-b-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 mt-4">
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
        <button
          onClick={() => navigate(-1)}
          className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
