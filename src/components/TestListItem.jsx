import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getUser } from "../services/apiUser";

const TestListItem = () => {
  const [testData, setTestData] = useState([]);
  

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser("/admin/test/get");
        setTestData(data.data);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchUser();
  }, []);

  const handleStartTest = (id) => {
    window.location.href = `http://localhost:5173/test/${id}`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {testData.map((test) => (
        <div key={test.id} className="bg-white rounded-lg shadow-md p-4">
          <span className="block font-semibold">Tên: {test.test_name}</span>
          <span className="block">Mã Đề: {test.test_code}</span>
          <span className="block">Số Câu Hỏi: {test.total_questions}</span>
          <span className="block">Thời Gian: {test.time_to_do} Phút</span>
          <span className="block">
            Trạng Thái: {test.status_id === 1 ? "Đóng" : "Mở"}
          </span>
          <span className="block">Ghi Chú: {test.note}</span>
         <button className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-2 w-full" onClick={() => handleStartTest(test.test_code)}>LÀM BÀI</button>
        </div>
      ))}
    </div>
  );
};

export default TestListItem;
