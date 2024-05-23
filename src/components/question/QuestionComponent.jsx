import { Button } from '@mui/material';
import { useState } from 'react';
import ModalEditQuestion from './ModalEditQuestion.jsx';

const level = {
  1: 'Dễ',
  2: 'Trung bình',
  3: 'Khó',
};
const status = {
  1: 'Đóng',
  2: 'Mở',
  3: 'Chờ duyệt',
  4: 'Đã duyệt',
  5: 'Không duyệt',
};
function QuestionComponent({ questions }) {
  const [open, setOpen] = useState(false);
  const [showQuestion, setShowQuestion] = useState({});
  const handleOpen = question => {
    setOpen(true);
    setShowQuestion(question);
  };
  return (
    <div>
      <div className="grid grid-cols-5 px-4 py-2 bg-slate-300">
        <p className="text-center col-span-2">Câu hỏi</p>
        <p className="text-center">Độ khó</p>
        <p className="text-center">Trạng thái</p>
        <p className="text-center">Actions</p>
      </div>
      {questions.map(question => (
        <div key={question?.question_id} className="grid grid-cols-5 px-4 py-2">
          <p className="col-span-2 text-ellipsis overflow-hidden text-nowrap">
            {question.question_content}
          </p>
          <p className="text-center">{level[question.level_id]}</p>
          <p className="text-center">{status[question.status_id]}</p>
          <div className="flex flex-col gap-2">
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleOpen(question)}
            >
              Chi tiết
            </Button>
          </div>
        </div>
      ))}
      <ModalEditQuestion
        open={open}
        setOpen={setOpen}
        question={showQuestion}
      />
    </div>
  );
}

export default QuestionComponent;
