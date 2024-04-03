import { useEffect, useState } from "react";
import { getUser } from "../services/apiUser";
import ModalEdit from "./ModalEdit.jsx";
import ModalDelete from "./ModalDelete.jsx";

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // State để mở modal edit và delete
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // State để lưu thông tin user cần sửa hoặc xoá
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  // Các hàm xử lý phân trang và thay đổi số lượng item trên trang
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(users.length / perPage);
  const visibleUsers = users.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="content">
      <div className="preload hidden" id="preload">
        <img src="#" alt="" />
      </div>
      <div className=" border-b-2 border-edu py-3 pl-3">
        <label htmlFor="perPage">Hiển thị </label>
        <select id="perPage" value={perPage} onChange={handlePerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table
          className="min-w-full divide-y divide-gray-200"
          id="table_admins"
        >
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                </label>
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Avatar
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tài Khoản
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giới Tính
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày Sinh
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Online Cuối
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <i className="material-icons">settings</i>
              </th>
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200 "
            id="list_admins"
          >
            {visibleUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                </td>
                <td className="px-3 py-4 whitespace-wrap">{user.id}</td>
                <td className="px-3 py-4 whitespace-wrap">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                </td>
                <td className="px-3 py-4 break-all">{user.name}</td>
                <td className="px-3 py-4 break-all">{user.name}</td>
                <td className="px-3 py-4 break-all">{user.name}</td>
                <td className="px-3 py-4 break-all">{user.name}</td>
                <td className="px-3 py-4 break-all">{user.name}</td>
                <td className="px-3 py-4 break-all">{user.name}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <button
                      className="bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2"
                      onClick={() => {
                        setCurrentUser(user);
                        setOpenEdit(true);
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setCurrentUser(user);
                        setOpenDelete(true); // Mở modal delete khi ấn vào nút "Xoá"
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
        <ModalEdit open={openEdit} setOpen={setOpenEdit} user={currentUser} />
        <ModalDelete
          open={openDelete}
          setOpen={setOpenDelete}
          user={currentUser}
          handleDeleteUser={(userId) => {
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
            setOpenDelete(false); // Đóng modal delete sau khi xóa
          }}
        />
      </div>
      <div className="flex justify-between px-10 border-t-2 border-black pt-4">
        <span>{`Trang hiển thị ${currentPage} / ${totalPages}`}</span>
        <div className="pagination pb-3">
          <button
            className="pr-3"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span className="bg-customPurple hover:bg-purple-700 text-white py-2 px-4 rounded-md">
            {currentPage}
          </span>
          <button
            className="pl-3"
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

export default AdminTable;
