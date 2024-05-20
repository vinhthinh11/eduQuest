import React from 'react';
import moment from 'moment-timezone';

function ScoreComponent({ scores }) {
  console.log(scores);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 bg-slate-300 px-4 font-semibold">
        <p className="py-2 text-center">Test Code</p>
        <p className="py-2 text-center">Điểm số</p>
        <p className="py-2 text-center">Số câu đúng</p>
        <p className="py-2 text-center">Thời gian hoàn thành</p>
      </div>
      {scores?.map((score, index) => (
        <div key={index} className="grid grid-cols-4 hover:bg-slate-200 px-4">
          <p className="py-2 text-center">{score?.test_code}</p>
          <p className="py-2 text-center">{score?.score_number}</p>
          <p className="py-2 text-center">{score?.score_detail}</p>
          <p className="py-2 text-center">
            {score?.completion_time
              ? moment.tz(score.completion_time, 'YYYY-MM-DD HH:mm:ss', 'Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')
              : 'Không có dữ liệu'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScoreComponent;
