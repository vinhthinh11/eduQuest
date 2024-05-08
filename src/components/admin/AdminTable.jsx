import { useEffect, useRef, useState } from 'react';
import { getUser } from '../../services/apiUser.js';
import SearchComponent from '../SearchComponent.jsx';
import toast from 'react-hot-toast';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import PaginateComponent from './PaginateComponent.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';
import TestComponent from '../test/TestComponent.jsx';
import ClassComponent from '../class/ClassComponent.jsx';
import UserComponent from './UserComponent.jsx';
import QuestionComponent from '../question/QuestionComponent.jsx';
import ScoreComponent from '../score/ScoreComponent.jsx';
import PracticeComponent from '../test/PracticeComponent.jsx';

const AdminTable = ({ userType = { userType: 'admin', userPath: '' } }) => {
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { update } = useUserContext();
  let dynamicComponent;
  switch (userType?.userPath) {
    case 'test':
      dynamicComponent = <TestComponent tests={users} />;
      break;
    case 'practice':
      dynamicComponent = <PracticeComponent practices={users} />;
      break;
    case 'question':
      dynamicComponent = <QuestionComponent questions={users} />;
      break;
    case 'class':
      dynamicComponent = <ClassComponent classes={users} />;
      break;
    case 'score':
      dynamicComponent = <ScoreComponent scores={users} />;
      break;
    default:
      dynamicComponent = <UserComponent userType={userType} users={users} />;
      break;
  }

  // State để mở modal edit và delete

  const [isFetching, setIsFetching] = useState(false);
  const usersData = useRef([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsFetching(true);
        const { data } = await getUser(
          `/${userType?.userType}/${userType?.userPath}/get`
        );
        console.log(data);
        setUsers(data.data);
        usersData.current = data.data;
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsFetching(false);
      }
    }
    fetchUser();
  }, [update, userType]);

  const handlePerPageChange = e => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="content">
      <div className="preload hidden" id="preload">
        <img src="#" alt="" />
      </div>
      <div className="flex justify-between items-center border-b-2 border-edu py-3 pl-3 pr-3">
        <div>
          <label htmlFor="perPage">Hiển thị </label>
          <select id="perPage" value={perPage} onChange={handlePerPageChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <SearchComponent
          usersData={usersData.current}
          users={users}
          setUsers={setUsers}
          currentPage={currentPage}
          perPage={perPage}
        />
      </div>

      {dynamicComponent}
      <PaginateComponent users={users} perPage={perPage} />
    </div>
  );
};

export default AdminTable;
