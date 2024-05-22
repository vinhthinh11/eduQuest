import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMe } from '../../services/apiUser.js';
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
      {questions.map(question => (
        <div key={question?.question_id} className="grid grid-cols-4 px-4 py-2">
          <p>{question.question_content}</p>
          <p>{level[question.level_id]}</p>
          <p>{status[question.status_id]}</p>
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
