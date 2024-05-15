import Progress from '../question/Progress.jsx';
import Questions from '../question/Questions.jsx';
import QuestionsContextProvider from '../question/QuestionsContextProvider.jsx';

function StudentDoPractice() {
  return (
    <QuestionsContextProvider>
      <div>
        <div className="sticky top-0">
          <Progress />
        </div>
        <Questions />
      </div>
    </QuestionsContextProvider>
  );
}

export default StudentDoPractice;
