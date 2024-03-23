import React from 'react';

const AdminForm = ({ handleSubmit, validUsernameOrEmail }) => {
  return (
    <div id="add_normal" className="col-span-12">
      <form onSubmit={handleSubmit} role="form" id="add_admin_form" className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Inputs */}
          {/* Tên */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Tên</label>
            <input type="text" id="name" name="name" className="input-field" onChange="" required />
          </div>
          {/* Tài khoản */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Tài khoản</label>
            <input type="text" name="username" id="username" className="input-field" required onInput={(e) => validUsernameOrEmail(e.target.value, e.target.name)} />
            <img src="res/img/true.png" className="valid-img hidden" id="valid-username-true" alt="Valid" />
            <img src="res/img/false.png" className="valid-img" id="valid-username-false" alt="Invalid" />
          </div>
          {/* Mật khẩu */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Mật khẩu</label>
            <input type="password" data-minlength="6" name="password" id="password" className="input-field" required />
          </div>
          {/* Email */}
          <div className="mb-4">
          <label for="email" class="lu avz awd awo axu">Email</label>
          <div class="lb">
            <input type="email" name="email" id="email" class="lu tn adu afa arp axu bbm bbs bbw bce bgc bnd bne bnq cia cic" placeholder="you@example.com"/>
          </div>
          </div>
          {/* Ngày sinh */}
          <div className="mb-4">
            <label htmlFor="birthday" className="block text-gray-700 font-bold mb-2">Ngày sinh</label>
            <input type="date" name="birthday" id="birthday" className="input-field" required defaultValue="1997-01-01" />
          </div>
          {/* Giới tính */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Giới tính</label>
            <select name="gender" id="gender" className="input-field">
              <option value="1" selected>Không Xác Định</option>
              <option value="2">Nam</option>
              <option value="3">Nữ</option>
            </select>
          </div>
        </div>
        <div className="col-span-12">
          {/* Submit Button */}
          <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Thêm</button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
