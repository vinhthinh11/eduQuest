import { useEffect, useState } from 'react';
import { getUser } from '../services/apiUser';

const AdminTable = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="content">
      <div className="preload hidden" id="preload">
        <img src="#" alt="" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" id="table_admins">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                </label>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tài Khoản
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giới Tính
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày Sinh
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Online Cuối
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <i className="material-icons">settings</i>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" id="list_admins">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.name} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.ten}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.ten}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.ten}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.ten}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.ten}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.ten}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <button className="bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2">Sửa</button>
                    <button className="bg-customPurple hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Xoá</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
