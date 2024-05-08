import { Button } from '@mui/joy';

const listNofitication = [
  {
    id: 1,
    title: 'Thông báo tiền học phí học kỳ I',
    content:
      'Học sinh chuẩn bị nộp học phí học kỳ I và phải thanh toán trước ngày 15/4/2024',
    created_at: '2022-01-01',
  },
  {
    id: 2,
    title: 'Học sinh chuẩn bị đánh giá rèn luyện học kỳ I',
    content:
      'Cố vấn học tập sẽ thông báo thời gian và cách thức đánh giá rèn luyện học kỳ I',
    created_at: '2022-01-02',
  },
  {
    id: 3,
    title: 'Thông báo nghỉ lễ 30/4 và 1/5',
    content: 'Nhà trường nghỉ lễ 30/4 và 1/5, học sinh nghỉ học 2 ngày',
    created_at: '2022-01-03',
  },
];
function Nofitication() {
  return (
    <div className="px-4">
      {listNofitication.map(item => (
        <div key={item.id}>
          <div className="flex justify-between bg-gradient-to-r from-violet-500 to-violet-200 rounded-lg px-2">
            <p className="font-medium">{item.title}</p>
            <p className="italic">
              {new Date(item.created_at).toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div className="bg-gradient-to-l from-violet-500 to-violet-200 rounded-lg px-2">
            <p>{item.content}</p>
          </div>
        </div>
      ))}
      <div>
        <Button>Tạo thông báo mới</Button>
      </div>
    </div>
  );
}

export default Nofitication;
