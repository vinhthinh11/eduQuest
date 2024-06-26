import React from 'react';

const FileUpload = ({ handleFileSubmit }) => {
  return (
    <div id="_add_via_file" className="col-span-12">
      <div className=" p-4 rounded-md">
        <span className="block mb-4">Lưu ý:</span>
        <ul className="list-disc pl-6 mb-4">
          <li>Không sửa file mẫu tránh gây lỗi khi nhập dữ liệu.</li>
          <li>
            Tài khoản và email của mỗi tài khoản là duy nhất, không thể trùng
            nhau.
          </li>
          <li>Ngày sinh phải đúng định dạng Y-m-d, ví dụ: 2008-10-29.</li>
        </ul>
        <span id="error" className="block text-red-500 mb-4"></span>
        <form
          id="add_via_file"
          encType="multipart/form-data"
          onSubmit={handleFileSubmit}
          className="items-center"
        >
          <input
            type="file"
            name="file_data"
            id="file_data"
            required
            className="btn text-white bg-customPurple hover:bg-purple-700 py-2 px-4 input-field mb-4 md:mb-0 mr-0 md:mr-4"
          />
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
