import { useEffect, useRef, useState } from 'react';
import SearchComponent from '../SearchComponent.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../services/apiUser.js';
import { Link } from 'react-router-dom';

const ScoreList = () => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const usersData = useRef([]);

  useEffect(() => {
    async function fetchUser() {
      setIsFetching(true);
      try {
        const { data } = await getUser('/teacher/test/get');
        const fetchedData = data.data.map(test => ({
          testCode: test.test_code,
          examName: test.test_name,
          examCode: test.test_code.toString(),
          subject: test.subject.subject_detail,
          grade: test.grade_id.toString(),
          totalQuestions: test.total_questions,
          timeToDo: test.time_to_do,
        }));
        setUsers(fetchedData);
        usersData.current = fetchedData;
      } catch (err) {
        console.error(err);
      }
      setIsFetching(false);
    }
    fetchUser();
  }, []);

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

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="content">
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
                Tên đề
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Mã đề
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Môn
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Khối
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                Thông tin
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                <FontAwesomeIcon icon={faCog} />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" id="list_admins">
            {visibleUsers.map((data, index) => (
              <tr className="hover:bg-slate-200" key={index}>
                <td className="px-3 py-4 text-center">{data.examName}</td>
                <td className="px-3 py-4 text-center">{data.examCode}</td>
                <td className="px-3 py-4 text-center">{data.subject}</td>
                <td className="px-3 py-4 text-center">{data.grade}</td>
                <td className="px-3 py-4 text-center">
                  {data.totalQuestions} câu hỏi, thời gian {data.timeToDo} phút
                </td>
                <td className="px-3 py-4 text-center">
                  <div className="text-center">
                    <Link
                      to={`/teacher/detail-score/${data.testCode}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    >
                      Xem điểm
                    </Link>
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

export default ScoreList;
