import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getUser } from "../../services/apiUser";

const StudentPage = () => {
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: testDataFromTest } = await getUser("/student/test/get");
        const { data: testDataFromPractice } = await getUser("/student/practice/get");
       
        const practiceDataWithLabel = testDataFromPractice.data.map(practice => ({
          ...practice,
          type: "practice"
        }));
        setTestData([...testDataFromTest.data, ...practiceDataWithLabel,]); 
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchUser();
  }, []);

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 my-4">
      {testData.map((test) => (
        <div key={test.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          <div>
            <span className="block font-semibold">Tên: {test.test_name}</span>
            <span className="block">Mã Đề: {test.test_code}</span>
            <span className="block">Số Câu Hỏi: {test.total_questions}</span>
            <span className="block">Thời Gian: {test.time_to_do} Phút</span>
            <span className="block">
              Trạng Thái: {test.status_id === 1 ? "Đóng" : "Mở"}
            </span>
            <span className="block">Ghi Chú: {test.note}</span>
            <span className="block text-sm text-green-500">Loại: {test.type === "practice" ? "practice" : "test"}</span>
          </div>
          <button className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-2" >LÀM BÀI</button>
        </div>
      ))}
    </div>
  );
};

export default StudentPage;
