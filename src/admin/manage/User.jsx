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
    <div className="flex flex-col justify-center">
      {users.map(user => (
        <div
          className="flex justify-around items-center gap-2 divide-y text-left"
          key={user.id}
        >
          <div className="w-full ">
            <img
              className="mx-auto w-10 rounded-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg"
              alt={user.name}
            />
          </div>
          <p className="w-full">{user.id}</p>
          <p className="w-full">{user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default User;
