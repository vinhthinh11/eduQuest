import { useEffect, useState } from 'react';
import { getUser } from '../../services/apiUser.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TeacherPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser('/teacher/class/get');
        console.log(data);
        setUsers(data.data);
      } catch (err) {}
    }
    fetchUser();
  }, []);

  return (
    <div className="content">
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
                <FontAwesomeIcon icon={faCog} />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" id="list_admins">
            {users.map(user => (
              <tr key={user.class_id}>
                <td className="px-3 py-4 text-center">{user.class_id}</td>
                <td className="px-3 py-4 text-center">{user.class_name}</td>
                <td className="px-3 py-4 text-center">{user.grade_id}</td>
                <td className="px-3 py-4 text-center">
                  <Link
                    to={`/teacher/class/${user.class_id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                  >
                    Xem
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherPage;
