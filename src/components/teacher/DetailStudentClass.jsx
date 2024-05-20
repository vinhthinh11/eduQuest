import { useEffect, useRef, useState } from 'react';
import { getUser } from '../../services/apiUser.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const DetailStudentClass = () => {
  const [users, setUsers] = useState([]);
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
            {users.map(user => (
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

     
    </div>
  );
};

export default DetailStudentClass;
