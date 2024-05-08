function ScoreComponent({ scores }) {
  console.log(scores);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 bg-slate-300 px-4 font-semibold">
        <p>Test Code</p>
        <p>Điểm số</p>
        <p>Số câu đúng</p>
        <p>Thời gian hoàn thành</p>
      </div>
      {scores?.map((score, index) => (
        <div key={index} className="grid grid-cols-4 hover:bg-slate-200 px-4">
          <p>{score?.test_code}</p>
          <p>{score?.score_number}</p>
          <p>{score?.score_detail}</p>
          <p>
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
