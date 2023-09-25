import { DualAxes } from "@ant-design/plots";

const DemoDualAxesComponent = ({
  dataColum,
  lastYear,
  year,
}: {
  dataColum: any[];
  lastYear: number;
  year: number;
}) => {
  const config: any = {
    data: [dataColum || [], dataColum || []],
    xField: "time",
    yField: [year.toString(), lastYear.toString()],
    yAxis: {
      // 格式化左坐标轴
      value: {
        min: 0,
        label: {
          formatter: (val: any) => `${val}个`,
        },
      },
      count: false,
    },
    geometryOptions: [
      {
        geometry: "column",
        color: "#5B8FF9",
        columnWidthRatio: 0.4,
        label: {
          position: "middle",
        },
      },
      {
        geometry: "line",
        smooth: true,
        color: "#5AD8A6",
      },
    ],
    interactions: [
      {
        type: "element-highlight",
      },
      {
        type: "active-region",
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default DemoDualAxesComponent;
// ReactDOM.render(<DemoDualAxes />, document.getElementById('container'));
