import { DatePicker, DatePickerProps } from "antd";
import { memo, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { currencyVnd } from "../../../../../utils";
import { useAppSelector } from "../../../../../app/hooks";
import { useEffectOnce } from "react-use";
import dayjs from "dayjs";
const TransactionChart = () => {
  const dataReducer = useAppSelector((state) => state.screens.customer);
  const mobileData = useAppSelector((state) => state.common.isMobile);
  const [state, setState] = useState<any>({
    dataDetail: null,
    data: [],
  });
  useEffect(() => {
    if (dataReducer) {
      setState({ dataDetail: dataReducer?.dataDetail })
    }
  }, [dataReducer])
  var xl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    var obj1 = dataReducer?.dataDetail?.orders.filter((x: any, i: any) => {
      var a = new Date(x?.orderedAt.replace(/(\d+[/])(\d+[/])/, '$2$1'));
      return a.getFullYear().toString() === dateString;
    })
    for (let i = 0; i < 12; i++) {
      if (obj1) renderArrData(i, obj1);
    }
    setState({ ...state, data: xl });
  };

  const renderArrData = (i: number, obj: any) => {
    var obj2 = obj.filter((x: any) => {
      var a = new Date(x?.orderedAt.replace(/(\d+[/])(\d+[/])/, '$2$1'));
      return a.getMonth().toString() === i?.toString();
    })
    xl[i] = obj2.reduce((accumulator: any, object: any) => {
      return accumulator + object.amount;
    }, 0);
  }

  useEffect(() => {
    if (dataReducer?.dataDetail) {
      const year = new Date().getFullYear().toString();
      var obj1 = dataReducer?.dataDetail?.orders.filter((x: any, i: any) => {
        var a = new Date(x?.orderedAt.replace(/(\d+[/])(\d+[/])/, '$2$1'));
        return a.getFullYear().toString() === year;
      });
      for (let i = 0; i < 12; i++) {
        if (obj1) renderArrData(i, obj1);
      }
      setState({ ...state, data: xl });
    }
  }, [dataReducer?.dataDetail]);

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#000000',
        font: {
          size: 11,
          weight: "bold" as "bold"
        },
        formatter: (val: number) => {
          return currencyVnd(val)
        }
      },
    },
    scales: {
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
    }
  };

  const optionsMobile = {
    indexAxis: 'y' as const,
    plugins: {
      datalabels: {
        color: '#000000',
        font: {
          size: 11,
          weight: "bold" as "bold"
        },
        formatter: (val: number) => {
          return currencyVnd(val)
        }
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          padding: 5,
          crossAlign: 'far' as const
        }
      }
    }
  };

  const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Giá trị hợp đồng',
        data: state?.data,
        backgroundColor: '#2AB364',
      },
    ],
  };
  return (
    <>
      {!mobileData ? (
        <div className="wrap-chart p-2">
          <div className="d-flex pb-4">
            <strong className="">Giá trị hợp đồng | {state?.dataDetail?.tenDoiTac}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100%', position: 'relative' }}>
            <div id="ctr-abs"><DatePicker placeholder={"Chọn năm"} onChange={onChange} picker="year" defaultValue={dayjs()} /></div>
            <Bar plugins={[ChartDataLabels]} data={data} options={options} height="300px" width="1000px" />
          </div>
        </div>
      ) : (
        <div className="wrap-chart p-2">
          <div>
            <div className="p-3 d-flex mb-3 wrap-ds">
              <div><span className="bold">Tìm kiếm: </span> <DatePicker placeholder={"Chọn năm"} onChange={onChange} picker="year" defaultValue={dayjs()} /></div>
            </div>
            <Bar plugins={[ChartDataLabels]} data={data} options={optionsMobile} height="350px" />
            <h1 className="title-mobile">Giá trị hợp đồng</h1>
          </div>
        </div>
      )}
    </>
  )
}
export default memo(TransactionChart)