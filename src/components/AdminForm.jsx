import React, { useState } from 'react';

const AdminForm = ({ handleSubmit }) => {
  const [focusedField, setFocusedField] = useState('');

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    <div className="mx-10 mb-20">
      <form onSubmit={handleSubmit} className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10">
          {/* Form Inputs */}
          {/* Tên */}
          <div className="relative mb-4 border-b-2">
            <div className="flex items-center">
              <label htmlFor="name" className={`pl-2 text-gray-700 font-bold transition-all ${focusedField === 'name' ? 'top-0 -translate-y-5 text-sm text-custom-purple' : ''}`}>
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input-field pl-8 outline-none border-none w-full"
                onChange=""
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative mb-4 border-b-2">
            <div className="flex items-center">
              <label htmlFor="email" className={`pl-2 text-gray-700 font-bold transition-all ${focusedField === 'email' ? 'top-0 -translate-y-5 text-sm text-custom-purple' : ''}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field pl-8 outline-none border-none w-full"
                onChange=""
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          {/* Tài khoản */}
          <div className="relative mb-4 border-b-2">
            <div className="flex items-center">
              <label htmlFor="username" className={`pl-2 text-gray-700 font-bold transition-all ${focusedField === 'username' ? 'top-0 -translate-y-5 text-sm text-custom-purple' : ''}`}>
                Tài khoản
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input-field pl-8 outline-none border-none w-full"
                onChange=""
                onFocus={() => handleFocus('username')}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          {/* Ngày sinh */}
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="birthday" className="text-gray-700 font-bold mr-2 whitespace-nowrap">Ngày sinh</label>
            <input type="date" name="birthday" id="birthday" className="input-field w-full border-none outline-none ml-5" required defaultValue="1997-01-01" />
          </div>

          {/* Mật khẩu */}
          <div className="relative mb-4 border-b-2">
            <div className="flex items-center">
              <label htmlFor="password" className={`pl-2 text-gray-700 font-bold transition-all ${focusedField === 'password' ? 'top-0 -translate-y-5 text-sm text-custom-purple' : ''}`}>
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field pl-8 outline-none border-none w-full"
                onChange=""
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          {/* Giới tính */}
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="gender" className="text-gray-700 font-bold mr-2 ">Giới tính</label>
            <select name="gender" id="gender" className="input-field">
              <option value="1" selected>Không Xác Định</option>
              <option value="2">Nam</option>
              <option value="3">Nữ</option>
            </select>
          </div>
        </div>
        <div className="col-span-12">
          {/* Submit Button */}
          <button type="submit" className="btn bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;