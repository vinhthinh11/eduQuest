import { useEffect, useState } from 'react';
import { QuesttionHeader } from './QuestionComponent.jsx';
import { getQuestion } from '../../services/apiQuestion.js';

function Question() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const { data } = await getQuestion();
        setQuestions(() => data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchQuestion();
  }, []);
  return (
    <div>
      <QuesttionHeader />
    </div>
  );
}

export default Question;
