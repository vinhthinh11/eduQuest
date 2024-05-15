function ScoreComponent({ scores }) {
  console.log(scores);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 bg-slate-300 px-4 font-semibold">
        <p className="py-2">Test Code</p>
        <p className="py-2">Điểm số</p>
        <p className="py-2">Số câu đúng</p>
        <p className="py-2">Thời gian hoàn thành</p>
      </div>
      {scores?.map((score, index) => (
        <div key={index} className="grid grid-cols-4 hover:bg-slate-200 px-4">
          <p className="py-2">{score?.test_code}</p>
          <p className="py-2">{score?.score_number}</p>
          <p className="py-2">{score?.score_detail}</p>
          <p className="py-2">
            {score?.completion_time
              ? new Date(score.completion_time).toLocaleString('vi-VN')
              : 'Không có dữ liệu'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScoreComponent;
