import { useEffect, useState } from 'react';
import { getPracticeResult } from '../../services/apiPractice.js';
import toast from 'react-hot-toast';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

function PracticeResult() {
  const [scores, setScores] = useState([]);
  const navitate = useNavigate();
  const handleClick = practice => {
    navitate(`${practice?.practice_code}`);
  };
  useEffect(() => {
    const fetchPracticeResult = async () => {
      try {
        const { data } = await getPracticeResult();
        setScores(data.data);
      } catch (error) {
        console.log(error);
        toast.error('Lỗi khi lấy dữ liệu bài tập');
      }
    };
    fetchPracticeResult();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 bg-slate-300 px-4 font-semibold">
        <p>Mã đề ôn tập</p>
        <p>Điểm số</p>
        <p>Số câu đúng</p>
        <p>Thời gian hoàn thành</p>
        <p>Chi tiết</p>
      </div>
      {scores?.map((score, index) => (
        <div
          key={index}
          className="grid grid-cols-5 hover:bg-slate-200 px-4 items-center py-2"
        >
          <p>{score?.practice_code}</p>
          <p>{score?.score_number}</p>
          <p>{score?.score_detail}</p>
          <p>
            {score?.completion_time
              ? new Date(score.completion_time).toLocaleString('vi-VN')
              : 'Không có dữ liệu'}
          </p>
          <Button color="success" onClick={() => handleClick(score)}>
            Xem chi tiết
          </Button>
        </div>
      ))}
    </div>
  );
}

export default PracticeResult;
