import React, { useState, useEffect, useRef } from 'react';
import { getClass, getTeachers } from '../../services/apiClass';
import { Box, Button, CircularProgress, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModalEditClass from '../class/ModalEditClass';
import ModalDeleteClass from './ModalDeleteClass';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import FormClassModal from '../../components/class/FormClassModal';

import toast from 'react-hot-toast';
import SearchComponent from '../SearchComponent.jsx';

const ClassTable = () => {
  const [classes, setClasses] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { update } = useUserContext();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentClass, setCurrentClass] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const classesData = useRef([]);

  const [showAdminForm, setShowAdminForm] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsFetching(true);
        const { data } = await getClass();
        setClasses(data.data);
        classesData.current = data.data;
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsFetching(false);
      }
    }
    fetchUser();
  }, [update]);

  useEffect(() => {
    async function fetchTeacheres() {
      try {
        const { data } = await getTeachers();
        setTeachers(data.data);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchTeacheres();
  }, []);

  const handlePerPageChange = e => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(classesData.current?.length / perPage) || 1;

  const visibleClasses = classes?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // const handleSearch = async (keySearch) => {
  //   try {
  //     console.log("Search query:", keySearch);
  //     setIsFetching(true);
  //     const { data } = await searchClass(keySearch);
  //     setClasses(data.list);
  //     classesData.current = data.list;
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

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
  return (
    <>
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
                  className="text-sm font-medium bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                  onClick={() => {
                    setShowAdminForm(true);
                  }}
                >
                  Thêm mới lớp
                </button>
              </div>
            </div>
          </div>
          <FormClassModal open={showAdminForm} setOpen={setShowAdminForm} />
          <div className="flex max-h-2 gap-3 items-center">
            <SearchComponent />
          </div>
        </div>

        <table
          className="min-w-full divide-y divide-gray-200"
          id="table_classes"
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
                Tên lớp
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
                Chủ nhiệm
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider"
              >
                <p className="material-icons">settings</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleClasses?.map((multiClass, index) => (
              <tr className="hover:bg-slate-200" key={index}>
                <td className="px-3 py-4 text-center">{multiClass.class_id}</td>
                <td className="px-3 py-4 text-center">
                  {multiClass.class_name}
                </td>
                <td className="px-3 py-4 text-center">{multiClass.grade_id}</td>
                <td className="px-3 py-4 text-center">
                  {teachers.find(
                    teacher => teacher.teacher_id === multiClass.teacher_id
                  )?.name || 'Unknown'}
                </td>

                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                      onClick={() => {
                        setCurrentClass(multiClass);
                        setOpenEdit(true);
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                      onClick={() => {
                        setCurrentClass(multiClass);
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
        <ModalEditClass
          open={openEdit}
          setOpen={setOpenEdit}
          user={currentClass}
        />
        <ModalDeleteClass
          open={openDelete}
          setOpen={setOpenDelete}
          user={currentClass}
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
    </>
  );
};

export default ClassTable;
