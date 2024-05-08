import Timer from '../test/Timer.jsx';
import { useQuestionsContext } from './QuestionsContextProvider.jsx';

function Progress() {
  // trang nay hien thi tien trinh lam bai thi cua student
  const { questions, student_answers } = useQuestionsContext();
  const maxQuestions = questions.length || 1;
  const progress =
    student_answers?.filter(answer => answer !== null).length || 0;

  console.log('progress', progress, maxQuestions);
  const progressPercent = Math.floor((progress / maxQuestions) * 100);
  console.log('progressPercent', progressPercent);
  return (
    <div>
      <Timer />
      <div className="flex justify-between gap-2 items-center px-4">
        <p>
          Question <strong>{progress}</strong>/{maxQuestions}
        </p>
        <div className="bg-slate-200 rounded-xl shadow-sm overflow-hidden p-1 w-full">
          <div className="relative h-6 flex items-center justify-center">
            <progress
              className="absolute h-5 my-auto left-0 rounded-lg w-full[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500"
              value={progressPercent}
              max={100}
            ></progress>
            <div className="relative text-green-900 font-medium text-sm">
              {progressPercent ?? 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
