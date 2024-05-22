import { useEffect, useRef, useState } from 'react';
import { getSubject } from '../../services/apiSubject.js';
import ModalEditSubject from '../subject/ModalEditSubject.jsx';
import SearchComponent from '../SearchComponent.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import ModalDeleteSubject from './ModalDeleteSubject.jsx';
import FormSubjectModal from '../../components/subject/FormSubJectModal.jsx';

const SubjectHead = () => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { update } = useUserContext();

  // State to manage modal visibility and current user
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const usersData = useRef([]);

  const [showAdminForm, setShowAdminForm] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchSubjects() {
      try {
        const { data } = await getSubject();
        console.log(data)
        setUsers(data.subjects);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsFetching(false);
      }
    }
    fetchSubjects();
  }, [update]);

  const handlePerPageChange = e => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(users?.length / perPage) || 1;
  const visibleUsers = users?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  if (isFetching)
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={80}
          sx={{
            translateX: '-10px',
            translateY: '-10px',
          }}
        />
      </Box>
    );
  else
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
          <div className="title-content">
            <div className="text-center  w-full">
              <div>
                <button
                  className="text-sm font-medium  bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                  onClick={() => {
                    setShowAdminForm(true);
                  }}
                >
                  Thêm mới trưởng bộ môn
                </button>
              </div>
            </div>
          </div>
          <FormSubjectModal open={showAdminForm} setOpen={setShowAdminForm} />

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
                  className="w-1/4 px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="w-1/4 px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
                >
                  Tên Môn
                </th>
                <th
                  scope="col"
                  className="w-1/4 px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
                >
                  <p className="material-icons">settings</p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {visibleUsers?.map((user, index) => (
                <tr className="hover:bg-slate-200" key={index}>
                  <td className="w-1/4 px-3 py-4 text-center">
                    {user.subject_id}
                  </td>
                  <td className="w-1/4 px-3 py-4 text-center">
                    {user.subject_detail}
                  </td>
                  <td className="w-1/4 px-3 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded !important"
                        onClick={() => {
                          setCurrentUser(user);
                          setOpenEdit(true);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded ml-5 !important"
                        onClick={() => {
                          setCurrentUser(user);
                          setOpenDelete(true);
                        }}
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ModalEditSubject
            open={openEdit}
            setOpen={setOpenEdit}
            user={currentUser}
          />
          <ModalDeleteSubject
            open={openDelete}
            setOpen={setOpenDelete}
            user={currentUser}
          />
        </div>
        <div className="flex justify-center px-10 border-t-2 border-black pt-4">
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

export default SubjectHead;
