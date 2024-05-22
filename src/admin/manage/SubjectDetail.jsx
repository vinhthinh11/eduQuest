import SubjectTable from '../../components/subject/SubjectTable.jsx';

import { UserContextProvider } from '../UserContextProvider.jsx';
function SubjectDetail() {
  return (
    <UserContextProvider>
      <div className=" flex flex-col">
        <div className="w-full">
          <SubjectTable />
        </div>
      </div>
    </UserContextProvider>
  );
}

export default SubjectDetail;
