import { DatePicker, RadioChangeEvent } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { memo, useState } from "react"
import { Doughnut } from "react-chartjs-2";

const DebtChart = () => {
  const [size, setSize] = useState<SizeType>('small');
  const { RangePicker } = DatePicker;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as 'bottom',
        labels: {
          pointStyle: 'circle',
          usePointStyle: true,
          boxWidth: 5,
          boxHeight: 5,
        },
      },
    },
  };
  const data = {
    labels: [
      'Chưa xử lý',
      'Đã xử lý',
      'Đang xử lý'
    ],
    datasets: [{
      label: 'Giá trị',
      data: [300, 50, 100],
      backgroundColor: [
        '#12B76A',
        '#4068ef',
        '#36D8F4',
      ],
      hoverOffset: 4
    }]
  };
  return (
    <div className="wrap-chart p-2 cursor-not-allowed">
      <div className="d-flex pb-4 pointer-events-none">
        <strong className="w-50">Công nợ thực tế</strong>
        <RangePicker placeholder={["Bắt đầu", "Kết thúc"]} size={size} />
      </div>
      <div className="pointer-events-none" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', width: '100%', position: 'relative', opacity: '0.3' }}>
        <Doughnut data={data} options={options} width="250px"/>
      </div>
    </div>
  )
}

export default memo(DebtChart)