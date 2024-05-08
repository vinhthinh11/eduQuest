import { useEffect, useRef, useState } from 'react';
import { getUser } from '../../services/apiUser.js';
import SearchComponent from '../SearchComponent.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const DetailStudentClass = () => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const usersData = useRef([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser('/teacher/student/get');
        setUsers(data.data);
        usersData.current = data.data;
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  const handlePerPageChange = e => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(users?.length / perPage) || 1;
  const startIdx = (currentPage - 1) * perPage;
  const endIdx = startIdx + perPage;
  const visibleUsers = users?.slice(startIdx, endIdx);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
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
                ID
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
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Giới Tính
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium  uppercase tracking-wider"
              >
                Ngày Sinh
              </th>
             
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                <FontAwesomeIcon icon={faCog} />
              </th>
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200 "
            id="list_admins"
          >
            {visibleUsers.map(user => (
              <tr key={user.student_id}>
                <td className="px-3 py-4 text-center">{user.student_id}</td>
               
                <td className="px-3 py-4 text-center">{user.name}</td>
                <td className="px-3 py-4 text-center">{user.email}</td>
                <td className="px-3 py-4 text-center">
                  {user.gender_id === 1 ? 'Nam' : user.gender_id === 2 ? 'Nữ' : 'Không xác định'}
                </td>
                <td className="px-3 py-4 text-center">{user.birthday}</td>
                <td className="px-3 py-4 text-center">
                  <div className="flex flex-col text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                      onClick={() => {
                        setCurrentUser(user);
                        setOpenEdit(true);
                      }}
                    >
                     Chi tiết
                    </button>
                  
                  </div>
                </td>
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
            className=" min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
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

export default DetailStudentClass;
