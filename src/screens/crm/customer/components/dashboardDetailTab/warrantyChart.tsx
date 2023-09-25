import { DatePicker, RadioChangeEvent } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { memo, useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2";
import { useAppSelector } from "../../../../../app/hooks";
import _, { cloneDeep } from "lodash";
import { checkProps } from "../../../../../utils";

const WarrantyChart = () => {
  const [size, setSize] = useState<SizeType>('small');
  const { RangePicker } = DatePicker;
  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };
  const [state, setState] = useState<any>({
    data: [10, 10],
  });
  const dataReducer = useAppSelector((state) => state.screens.customer);
  useEffect(() => {
    if (dataReducer?.dataDetail) {
      var newData: any = [dataReducer?.dataDetail?.totalCompletedWarranties,
      dataReducer?.dataDetail?.numberOfWarranties - dataReducer?.dataDetail?.totalCompletedWarranties];
      // setState({ newData });
    }
  }, [dataReducer]);
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
      'Đã xử lý'
    ],
    datasets: [{
      label: 'Giá trị',
      data: state?.data,
      backgroundColor: [
        '#EE0033',
        '#7A5AF8'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <div className="wrap-chart p-2">
      <div className="d-flex pb-4">
        <strong className="w-50">Bảo hành</strong>
        <RangePicker placeholder={["Bắt đầu", "Kết thúc"]} size={size} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', width: '100%', position: 'relative' }}>
        <Doughnut data={data} options={options} width="250px"/>
      </div>
    </div>
  )
}

export default memo(WarrantyChart)