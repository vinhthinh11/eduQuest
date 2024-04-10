import { useEffect, useState } from 'react';
import { getQuestion } from '../../services/apiQuestion.js';
import toast from 'react-hot-toast';

const QuestionItem = ({ question, index }) => {
  return (
    <div className="border-b-2 flex gap-2">
      <div className="min-w-8 border-r-2">{index + 1}</div>
      <div className="flex-1">{question?.question_content}</div>
    </div>
  );
};

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const { data } = await getQuestion();
        setQuestions(data?.data?.slice(0, 10));
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra');
      }
    }
    fetchQuestion();
  }, []);
  return (
    <div className="flex flex-col px-4 gap-2 justify-center border-2 border-slate-400 rounded-md">
      {questions?.map((question, index) => (
        <QuestionItem key={index} question={question} index={index} />
      ))}
    </div>
  );
}

export default QuestionList;
