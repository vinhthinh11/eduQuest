import Timer from '../test/Timer.jsx';
import { useQuestionsContext } from './QuestionsContextProvider.jsx';

function Progress() {
  // trang nay hien thi tien trinh lam bai thi cua student
  const { questions, hasAnswers } = useQuestionsContext();
  const maxQuestions = questions.length;
  const progress = 1;
  return (
    <div>
      <Timer />
      <div className="flex justify-between gap-2 items-center px-4">
        <p>
          Question <strong>{hasAnswers + 1}</strong>/{maxQuestions}
        </p>
        <div className="flex-1 bg-gray-200 rounded-full h-4 dark:bg-gray-600 flex items-center">
          <div
            className={`bg-orange-300 h-3 rounded-full w-[${progress}%]`}
          ></div>
        </div>
        <p>
          <strong>{progress}</strong>/{100}%
        </p>
      </div>
    </div>
  );
}

export default Progress;
