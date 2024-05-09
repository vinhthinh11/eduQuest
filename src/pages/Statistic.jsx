import { BarChart, LineChart, PieChart } from '@mui/x-charts';
const uData = [100, 200, 400, 800, 450, 150, 50];
const pData = [400, 450, 430, 479, 300, 100, 70];
const xLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const data = [
  { label: 'Toán', value: 400 },
  { label: 'Tiếng Anh', value: 300 },
  { label: 'Vật lý', value: 300 },
  { label: 'Sinh học', value: 200 },
  { label: 'Hóa học', value: 278 },
  { label: 'Địa lý', value: 189 },
];
function Statistic() {
  return (
    <div className="flex flex-col">
      {/* <h1>test homepage</h1> */}
      <div>
        <BarChart
          xAxis={[
            { scaleType: 'band', data: ['Khối 10', 'Khối 11', 'Khối 12  '] },
          ]}
          series={[
            { data: [5, 4, 2] },
            { data: [10, 15, 5] },
            { data: [4, 7, 20] },
          ]}
          width={500}
          height={300}
        />
      </div>
      <div>
        Thời gian cao điểm học sinh tham gia ôn tập và thi trong 10 ngày
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: 'Ôn tập' },
            { data: uData, label: 'Thi' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
      </div>
      <div>
        <PieChart
          series={[
            {
              outerRadius: 80,
              data,
            },
          ]}
          slotProps={{
            legend: {},
          }}
          height={300}
        />
      </div>
    </div>
  );
}
export default Statistic;
