import React from 'react';

const FileUpload = ({ handleFileSubmit }) => {
  return (
    <div id="_add_via_file" className="col-span-12">
      <div className="bg-gray-100 p-4 rounded-md">
        <span className="block font-semibold text-lg mb-2">Tải File Mẫu: <a href="res/files/mau-them-danh-sach-admin.xlsx" className="text-blue-500">TẠI ĐÂY</a></span>
        <span className="block mb-4">Lưu Ý:</span>
        <ul className="list-disc pl-6 mb-4">
          <li>Không sửa file mẫu tránh gây lỗi khi nhập dữ liệu.</li>
          <li>Tài khoản và email của mỗi tài khoản là duy nhất, không thể trùng nhau.</li>
          <li>Ngày sinh phải đúng định dạng Y-m-d, ví dụ: 2008-10-29.</li>
        </ul>
        <span id="error" className="block text-red-500 mb-4"></span>
        <form id="add_via_file" encType="multipart/form-data" onSubmit={handleFileSubmit} className="flex flex-col md:flex-row items-center">
          <label className="btn input-field mr-4">
            <span>File</span>
            <input type="file" name="file_data" id="file_data" required />
          </label>
          <div className="file-path-wrapper flex-grow">
            <input className="file-path validate w-full" type="text" />
          </div>
          <div className="input-field mt-4 md:mt-0">
            <button className="btn" type="submit" name="submit">Thêm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
