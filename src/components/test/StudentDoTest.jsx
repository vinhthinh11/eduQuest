import Progress from '../question/Progress.jsx';
import Questions from '../question/Questions.jsx';
import QuestionsContextProvider from '../question/QuestionsContextProvider.jsx';

function StudentDoTest() {
  return (
    <QuestionsContextProvider>
      <div>
        <Progress />
        <Questions />
      </div>
    </QuestionsContextProvider>
  );
}

export default StudentDoTest;
