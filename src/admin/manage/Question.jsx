import QuestionList from '../../components/question/QuestionList.jsx';
import { QuestionContextProvider } from '../QuestionContextProvider.jsx';
import { UserContextProvider } from '../UserContextProvider.jsx';
import { QuesttionHeader } from './QuestionComponent.jsx';

function Question() {
  return (
    <div>
      <UserContextProvider>
        <QuestionContextProvider>
          <QuesttionHeader />
          <QuestionList />
        </QuestionContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default Question;
