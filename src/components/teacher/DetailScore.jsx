import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchComponent from '../SearchComponent.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';
import { getUser } from '../../services/apiUser.js';
import axios from 'axios';

const DetailScore = () => {
  const { test_code } = useParams();
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const usersData = useRef([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);
      try {
        const { data } = await getUser(`/teacher/student/result/${test_code}`);
        console.log(data);
        setUsers(data.data);
        usersData.current = data.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, [test_code]); // Fetch users whenever test_code changes

  const handlePerPageChange = e => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(users.length / perPage) || 1;
  const visibleUsers = users.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleExportExcel = async () => {
    try {
      const response = await axios.get(`/teacher/score/export`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'scores.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting scores:', error);
    }
  };

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="content">
      <div className="preload hidden" id="preload">
        <img src="#" alt="" />
      </div>
      <div className="flex justify-between items-center border-b-2 border-edu py-3 pl-3 pr-3">
        <div>
          <label htmlFor="perPage">Hiển thị </label>
          <select id="perPage" value={perPage} onChange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={handleExportExcel}
        >
          Xuất File Excel
        </button>
        <SearchComponent
          usersData={usersData.current}
          users={users}
          setUsers={setUsers}
        />
      </div>

      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-200"
          id="table_admins"
        >
          <thead className="bg-gray-50 text-slate-700">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                STT
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Tài Khoản
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Lớp
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Điểm
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" id="list_admins">
            {visibleUsers.map((data, index) => (
              <tr className="hover:bg-slate-200" key={data.student_id}>
                <td className="px-3 py-4 text-center">
                  {(currentPage - 1) * perPage + index + 1}
                </td>
                <td className="px-3 py-4 text-center">{data.name}</td>
                <td className="px-3 py-4 text-center">{data.username}</td>
                <td className="px-3 py-4 text-center">{data?.class_name}</td>
                <td className="px-3 py-4 text-center">{data.score_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end px-10 border-t-2 border-black pt-4">
        <div className="pagination pb-3 flex gap-2">
          <button
            className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <button
            disabled
            className="bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
          >
            {`${currentPage}/${totalPages}`}
          </button>
          <button
            className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailScore;
