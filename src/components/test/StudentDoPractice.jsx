import Progress from '../question/Progress.jsx';
import Questions from '../question/Questions.jsx';
import QuestionsContextProvider from '../question/QuestionsContextProvider.jsx';

function StudentDoPractice() {
  return (
    <QuestionsContextProvider>
      <div>
        <Progress />
        <Questions />
      </div>
    </QuestionsContextProvider>
  );
}

export default StudentDoPractice;
