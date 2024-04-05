import { useEffect, useState } from 'react';
import { getUser } from '../../services/apiUser.js';

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUser();
        setUsers(() => data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col justify-center divide-y">
      {users.map(user => (
        <div
          className="grid grid-cols-3 items-center gap-2 px-8 text-left py-2 hover:bg-gray-200 cursor-pointer"
          key={user.id}
        >
          <img
            className="w-10 rounded-full shadow-md mx-auto  "
            src={`https://i.pravatar.cc/${Math.floor(Math.random() * 500) + 1}`}
            alt={user.name}
          />
          <p className="">{user.name}</p>
          <p className="">{`Lớp ${Math.floor(Math.random() * 3) + 10}`}</p>
        </div>
      ))}
    </div>
  );
}

export default User;
