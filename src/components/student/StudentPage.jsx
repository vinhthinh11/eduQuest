import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/apiUser';
import { studentBeginTest } from '../../services/apiTest.js';
import { studentBeginPractice } from '../../services/apiPractice.js';

const StudentPage = () => {
  const [testDataFromTest, setTestDataFromTest] = useState([]);
  const [testDataFromPractice, setTestDataPractice] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: testDataFromTest } = await getUser('/student/test/get');
        const { data: testDataFromPractice } = await getUser(
          '/student/practice/get'
        );

        console.log('Test data from API:', testDataFromTest);
        console.log('Practice data from API:', testDataFromPractice);
        setTestDataFromTest(testDataFromTest?.data);
        setTestDataPractice(testDataFromPractice?.data);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchUser();
  }, []);

  const handleButtonClick = async (code, type) => {
    if (type === 'practice') {
      console.log(code);
      await studentBeginPractice({ practice_code: code });
      navigate(`/student/practice/${code}`);
    } else {
      await studentBeginTest({ test_code: code });
      navigate(`/student/test/${code}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4 my-4">
      {testDataFromTest?.map(test => (
        <div
          key={test?.test_code}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <Test test={test} handleButtonClick={handleButtonClick} />
        </div>
      ))}
      {testDataFromPractice.map(practice => (
        <div
          key={practice?.practice_code}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <Practice practice={practice} handleButtonClick={handleButtonClick} />
        </div>
      ))}
    </div>
  );
};
const Test = ({ test, handleButtonClick }) => {
  return (
    <>
      <div>
        <span className="block font-semibold">Tên: {test?.test_name}</span>
        <span className="block">Mã Đề: {test?.test_code}</span>
        <span className="block">Số Câu Hỏi: {test?.total_questions}</span>
        <span className="block">Thời Gian: {test?.time_to_do} Phút</span>
        <span className="block">
          Trạng Thái: {test?.status_id === 1 ? 'Đóng' : 'Mở'}
        </span>
        <span className="block">Ghi Chú: {test?.note}</span>
        <span className="block text-sm text-green-500">
          Loại: {test?.test_code ? 'Thi' : 'Ôn tập'}
        </span>
      </div>
      <button
        className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
        onClick={() => handleButtonClick(test?.test_code, 'test')}
      >
        LÀM BÀI
      </button>
    </>
  );
};
const Practice = ({ practice, handleButtonClick }) => {
  return (
    <>
      <div>
        <span className="block font-semibold">
          Tên: {practice.practice_name ?? 'Ôn tập'}
        </span>
        <span className="block">
          Mã Đề: <strong>{practice.practice_code}</strong>
        </span>
        <span className="block">
          Số Câu Hỏi: <strong>{practice.total_questions}</strong>
        </span>
        <span className="block">
          Thời Gian: <strong>{practice.time_to_do} Phút</strong>
        </span>
        <span className="block">
          Môn: <strong>{practice?.subject?.subject_detail}</strong>
        </span>
        <span className="block text-sm text-green-500">
          Loại: {practice.test_code ? 'Thi' : 'Ôn tập'}
        </span>
      </div>
      <button
        className="btn bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
        onClick={() => handleButtonClick(practice.practice_code, 'practice')}
      >
        LÀM BÀI
      </button>
    </>
  );
};

export default StudentPage;
