import { useEffect, useState } from 'react';
import ModalDelete from './ModalDelete.jsx';
import ModalEdit from './ModalEdit.jsx';

function UserComponent({ userType, users, perPage = 10, currentPage = 1 }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [visibleUsers, setVisibleUsers] = useState([]);
  users?.slice((currentPage - 1) * perPage, currentPage * perPage);
  useEffect(() => {
    setVisibleUsers(
      users?.slice((currentPage - 1) * perPage, currentPage * perPage)
    );
  }, [users, perPage, currentPage]);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200" id="table_admins">
        <thead className="bg-gray-50 text-slate-700">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Avatar
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Tên
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Giới Tính
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium  uppercase tracking-wider"
            >
              Ngày Sinh
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              <p className="material-icons">settings</p>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 " id="list_admins">
          {visibleUsers?.map((user, index) => (
            <tr className="hover:bg-slate-200" key={index}>
              <td className="px-3 py-4 whitespace-wrap">{user.admin_id}</td>
              <td className="px-3 py-4 whitespace-wrap">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    user?.avatar !== 'avatar-default.jpg'
                      ? `http://127.0.0.1:8000/storage/${user.avatar}`
                      : `https://i.pravatar.cc/${
                          Math.floor(Math.random() * 500) + 1
                        }`
                  }
                  alt={user.name}
                />
              </td>
              <td className="px-3 py-4 break-all">{user.name}</td>
              <td className="px-3 py-4 break-all">{user.email}</td>
              <td className="px-3 py-4 break-all">
                {user.gender_id === 1
                  ? 'Nam'
                  : user.gender_id === 2
                  ? 'Nữ'
                  : 'Không xác định'}
              </td>
              <td className="px-3 py-4 break-all">{user.birthday}</td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    onClick={() => {
                      setCurrentUser(user);
                      setOpenEdit(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
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
      <ModalEdit
        open={openEdit}
        setOpen={setOpenEdit}
        user={currentUser}
        userType={userType}
      />
      <ModalDelete
        open={openDelete}
        setOpen={setOpenDelete}
        user={currentUser}
        userType={userType}
      />
    </div>
  );
}

export default UserComponent;
