import React, { useState } from 'react';
import InputField from '../components/InputField';

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
        <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10 whitespace-nowrap">
          {/* Form Inputs */}
          
          <InputField
            label="Tên"
            name="name"
            type="text"
            value=""
            onChange={() => {}}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value=""
            onChange={() => {}}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            required
          />
          <InputField
            label="Tài khoản"
            name="username"
            type="text"
            value=""
            onChange={() => {}}
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
            required
          />
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="birthday" className="text-gray-700 font-bold mr-2 ">Ngày sinh</label>
            <input type="date" name="birthday" id="birthday" className="input-field w-full border-none outline-none ml-5" required defaultValue="1997-01-01" />
          </div>
          <InputField
            label="Mật khẩu"
            name="password"
            type="password"
            value=""
            onChange={() => {}}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            required
          />
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="gender" className="text-gray-700 font-bold mr-2 ">Giới tính</label>
            <select name="gender" id="gender" className="input-field">
              <option value="1" selected>Không Xác Định</option>
              <option value="2">Nam</option>
              <option value="3">Nữ</option>
            </select>
          </div>
        </div>
        <div className="col-span-12 mt-10">
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
