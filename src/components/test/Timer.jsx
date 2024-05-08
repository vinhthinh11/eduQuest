import { useEffect } from 'react';
import { useQuestionsContext } from '../question/QuestionsContextProvider.jsx';
import { studentSubmit } from '../../services/apiTest.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { studentSubmitPractice } from '../../services/apiPractice.js';

function Timer() {
  const { time, setTime, test_code, practice_code } = useQuestionsContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (time > 0) {
      const id = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
      return () => clearInterval(id);
    } else {
      // Submit the test here
      (async () => {
        try {
          test_code ? await studentSubmit() : await studentSubmitPractice();
          toast.success('Nộp bài thành công');
          setTimeout(() => {
            test_code
              ? navigate('/student/score')
              : navigate(`/student/practice/result`);
          }, 700);
        } catch (err) {
          console.log(err);
          toast.error('Nộp bài không thành công');
        }
      })();
    }
  }, [time, setTime]);
  return (
    <div className="sticky bg-slate-500 px-3 py-2 text-slate-100 w-fit rounded-md mt-2 mr-3 right-0 opacity-80">
      {Math.floor(time / 60)
        .toString()
        .padStart(2, '0')}
      :{(time % 60).toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
