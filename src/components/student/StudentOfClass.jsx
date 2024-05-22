import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/apiUser.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function StudentOfClass() {
  const [users, setUsers] = useState([]);
  const { class_id } = useParams();
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser(`/teacher/class/get/${class_id}`);
        setUsers(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [class_id]);
  return (
    <div className="content">
      <div className="preload hidden" id="preload">
        <img src="#" alt="" />
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

           
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200 "
            id="list_admins"
          >
            {users.map(user => (
              <tr key={user.student_id}>
                <td className="px-3 py-4 text-center">{user.student_id}</td>

                <td className="px-3 py-4 text-center">{user.name}</td>
                <td className="px-3 py-4 text-center">{user.email}</td>
                <td className="px-3 py-4 text-center">
                  {user.gender_id === 1
                    ? 'Nam'
                    : user.gender_id === 2
                    ? 'Nữ'
                    : 'Không xác định'}
                </td>
                <td className="px-3 py-4 text-center">{user.birthday}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentOfClass;
