import QuestionList from '../../components/question/QuestionList.jsx';
import { UserContextProvider } from '../UserContextProvider.jsx';
import { QuesttionHeader } from './QuestionComponent.jsx';

function Question() {
  return (
    <div>
      <UserContextProvider>

      <QuesttionHeader />
      <QuestionList />
      </UserContextProvider>
    </div>
  );
}

export default Question;
