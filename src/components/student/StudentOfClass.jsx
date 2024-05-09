import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/apiUser.js';

function StudentOfClass() {
  const [users, setUsers] = useState([]);
  const { class_id } = useParams();
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser(`/teacher/student/get/${class_id}`);
        setUsers(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [class_id]);
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 " id="list_admins">
          {users?.map((user, index) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentOfClass;
