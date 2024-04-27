import { Button } from '@mui/joy';
import { useQuestionsContext } from './QuestionsContextProvider.jsx';
import { studentAnswer, studentSubmit } from '../../services/apiTest.js';
import ModalSubmitTest from '../test/ModalSubmitTest.jsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Questions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleClose() {
    setOpen(false);
  }
  const { questions } = useQuestionsContext();
  async function handleSubmit() {
    try {
      await studentSubmit();
      toast.success('Nộp bài thành công');
      setTimeout(() => {
        navigate('/student/score');
      }, 700);
    } catch (err) {
      console.log(err);
      toast.error('Nộp bài không thành công');
    }
  }
  async function handleAnswer(e, id) {
    await studentAnswer({ question_id: id, student_answer: e.target.value });
  }
  return (
    <div className="px-3">
      {questions.map((question, index) => (
        <div key={question?.question_id}>
          <h4 className="font-semibold">
            {index + 1}
            {'.  '}
            {question.question_content}
          </h4>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input
                type="radio"
                name={question.question_id}
                value="a"
                id={index + 'a'}
                onClick={async e => await handleAnswer(e, question.question_id)}
              />
              <label htmlFor={index + 'a'}>{question?.answer_a}</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name={question.question_id}
                value="b"
                id={index + 'b'}
                onClick={async e => await handleAnswer(e, question.question_id)}
              />
              <label htmlFor={index + 'b'}>{question?.answer_b}</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name={question.question_id}
                value="c"
                id={index + 'c'}
                onClick={async e => await handleAnswer(e, question.question_id)}
              />
              <label htmlFor={index + 'c'}>{question?.answer_c}</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name={question.question_id}
                value="d"
                id={index + 'd'}
                onClick={async e => await handleAnswer(e, question.question_id)}
              />
              <label htmlFor={index + 'd'}>{question?.answer_d}</label>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-3 justify-center my-4 ">
        <Button color="success" onClick={() => setOpen(true)}>
          Nộp bài
        </Button>
        <Button color="danger">Xóa đáp án</Button>
      </div>
      <ModalSubmitTest
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
const QuestionList = question => {
  return (
    <>
      <h4 className="">{question.question_content}</h4>
      <div className="flex">
        <div>{question?.answer_a}</div>
        <div>{question?.answer_b}</div>
        <div>{question?.answer_c}</div>
        <div>{question?.answer_d}</div>
      </div>
    </>
  );
};

export default Questions;
