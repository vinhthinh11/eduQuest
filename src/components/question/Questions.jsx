import { Button } from '@mui/joy';
import { useQuestionsContext } from './QuestionsContextProvider.jsx';

function Questions() {
  const { questions } = useQuestionsContext();
  return (
    <div className="px-3">
      {questions.map((question, index) => (
        <>
          <h4 className="font-semibold">
            {index + 1}
            {'.  '}
            {question.question_content}
          </h4>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input type="radio" name={question.question_id} />
              {question?.answer_a}
            </div>
            <div className="flex gap-2">
              <input type="radio" name={question.question_id} />
              {question?.answer_b}
            </div>
            <div className="flex gap-2">
              <input type="radio" name={question.question_id} />
              {question?.answer_c}
            </div>
            <div className="flex gap-2">
              <input type="radio" name={question.question_id} />
              {question?.answer_d}
            </div>
          </div>
        </>
      ))}
      <div className="flex gap-3 justify-center my-4 ">
        <Button color="success">Nộp bài</Button>
        <Button color="danger">Xóa đáp án</Button>
      </div>
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
