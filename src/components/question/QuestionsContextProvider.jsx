import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTestDetail } from '../../services/apiTest.js';

const QuestionsContext = createContext();
function QuestionsContextProvider({ children }) {
  const { test_code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [hasAnswers, setAnswers] = useState(0);
  const location = useLocation().pathname.split('/');
  const endPoint = [location[1], location[2], 'get', test_code].join('/');
  useEffect(() => {
    async function fetchQuestions() {
      const {
        data: { data },
      } = await getTestDetail(endPoint);
      setQuestions(data.questions);
    }
    fetchQuestions();
  }, []);
  return (
    <QuestionsContext.Provider value={{ questions, hasAnswers, setAnswers }}>
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsContextProvider;

export const useQuestionsContext = () => {
  return useContext(QuestionsContext);
};
