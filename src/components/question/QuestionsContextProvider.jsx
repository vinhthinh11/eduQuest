import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTestDetail } from '../../services/apiTest.js';
import { getPraceDetail } from '../../services/apiPractice.js';

const QuestionsContext = createContext();
function QuestionsContextProvider({ children }) {
  const { test_code } = useParams();
  const { practice_code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [student_answers, setStudentAnswers] = useState([]); //cai nay de theo doi cau tra loi cua student [question_id]: [student_answer
  const [hasAnswers, setAnswers] = useState(0); //cai nay de theo doi so cau hoi da tra loi
  const [time, setTime] = useState(50 * 60);
  const location = useLocation().pathname.split('/');
  const endPoint = [
    location[1],
    location[2],
    'get',
    test_code ?? practice_code,
  ].join('/');
  console.log(endPoint);
  useEffect(() => {
    async function fetchQuestions() {
      const {
        data: { data },
      } = test_code
        ? await getTestDetail(endPoint)
        : await getPraceDetail(endPoint);
      console.log(data);
      setTime(+data.time_remaining);
      setQuestions(data.questions);
      setStudentAnswers(data.student_answers);
    }
    fetchQuestions();
  }, [endPoint]);
  return (
    <QuestionsContext.Provider
      value={{
        questions,
        hasAnswers,
        setAnswers,
        time,
        setTime,
        student_answers,
        setStudentAnswers,
        test_code,
        practice_code,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsContextProvider;

export const useQuestionsContext = () => {
  return useContext(QuestionsContext);
};
