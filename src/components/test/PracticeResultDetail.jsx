import { useEffect, useState } from 'react';
import { getPracticeDetail } from '../../services/apiPractice.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/joy';

function PracticeResultDetail() {
  const [questions, setQuestions] = useState([]);
  const [student_answers, setStudentAnswers] = useState([]);
  const { practice_code } = useParams();
  const navigate = useNavigate();
  console.log(questions, student_answers);
  useEffect(() => {
    async function fetchQuestions() {
      const {
        data: { data },
      } = await getPracticeDetail(`student/practice/get/${practice_code}`);
      console.log(data);
      setQuestions(data.questions);
      setStudentAnswers(data.student_answers);
    }
    fetchQuestions();
  }, [practice_code]);
  return (
    <div className="px-3 flex flex-col py-3">
      {questions.map((question, index) => (
        <div key={question?.question_id}>
          <div className="flex justify-between">
            <h4 className="font-semibold">
              {index + 1}
              {'.  '}
              {question.question_content}
            </h4>
            <p className="text-red-500">
              {student_answers[index] === null ? 'Chưa chọn câu trả lơi' : ''}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <p
                className={`${
                  question?.correct_answer === 'a'
                    ? 'text-green-500 font-semibold'
                    : student_answers[index]?.student_answer === 'a'
                    ? 'text-red-500 font-semibold'
                    : ''
                }`}
              >
                A. {question?.answer_a}
              </p>
            </div>
            <div className="flex gap-2">
              <p
                className={`${
                  question?.correct_answer === 'b'
                    ? 'text-green-500 font-semibold'
                    : student_answers[index]?.student_answer === 'b'
                    ? 'text-red-500 font-semibold'
                    : ''
                }`}
              >
                B. {question.answer_b}
              </p>
            </div>
            <div className="flex gap-2">
              <p
                className={`${
                  question?.correct_answer === 'c'
                    ? 'text-green-500 font-semibold'
                    : student_answers[index]?.student_answer === 'c'
                    ? 'text-red-500 font-semibold'
                    : ''
                }`}
              >
                C. {question.answer_c}
              </p>
            </div>
            <div className="flex gap-2">
              <p
                className={`${
                  question?.correct_answer === 'd'
                    ? 'text-green-500 font-semibold'
                    : student_answers[index]?.student_answer === 'd'
                    ? 'text-red-500 font-semibold'
                    : ''
                }`}
              >
                D. {question.answer_d}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Button className="w-fit self-center" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
}

export default PracticeResultDetail;
