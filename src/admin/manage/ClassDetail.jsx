import ClassTable from '../../components/class/ClassTable';
import { UserContextProvider } from '../UserContextProvider.jsx';

function UserDetail() {
  return (
    <UserContextProvider>
      <div className=" ">
        <div className=" flex flex-col">
          <div className="w-full">
            <ClassTable />
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
}

export default UserDetail;
