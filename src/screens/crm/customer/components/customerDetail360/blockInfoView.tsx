import * as antIc from "@ant-design/icons";
import { Avatar, Progress, Steps } from "antd";
import TextArea from "antd/es/input/TextArea";
import _, { cloneDeep } from "lodash";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import url from '../../../../../assets/img/no-avatar.jpg';
import { checkProps } from "../../../../../utils";
const BlockInfoView = () => {
  const [state, setState] = useState<any>({
    data: null,
    percent: 0
  });
  const dataReducer = useAppSelector((state) => state.screens.customer);
  const mobileMode = useAppSelector((state) => state.common.isMobile);
  const checkPropsAvaliable = (obj: any) => {
    var count = 0
    if (obj && obj !== undefined) {
      for (let prop in obj) {
        if (typeof obj[prop] === 'string' && obj[prop].length !== 0) {
          count++;
        }
      }
    }
    return count;
  }
  const percentVal = (totalField: number, totalFieldDone: number) => {
    if (totalField && totalFieldDone && totalField > 0) {
      return (totalFieldDone * 100 / totalField).toFixed();
    }
    return 0;
  }
  const getStatus = (percent: number) => {
    if (percent >= 0 && percent <= 50) {
      return "exception"
    } else if (percent > 50 && percent <= 75) {
      return "normal"
    } else return "success"
  }
  useEffect(() => {
    if (dataReducer) {
      const newData = cloneDeep({ ...dataReducer?.dataDetail });
      if (!_.isEmpty(newData)) {
        setState({
          data: checkProps(newData),
          percent: percentVal(Object.keys(dataReducer?.dataDetail).length, checkPropsAvaliable(dataReducer?.dataDetail))
        });
      }
    }
  }, [dataReducer]);
  return (
    <>
      <div className="block-info-view">
        <div className="d-flex justify-content-between border-bottom header-content-info align-items-center">
          <h5 className="mb-0 text-xl">Hồ sơ</h5>
        </div>
        <div className="content-info-customer">
          <div className="text-center mt-3">
            <div className="info-customer">
              <div className="info-customer-left position-relative" >
                <Avatar className="avt" size="large" src={<img src={url} alt="avatar" />} />
              </div>
              <div className="info-customer-right text-left">
                <div title={`${state?.data?.tenDoiTac}`} className="name-customer">
                  <div className="text-view">{state?.data?.tenDoiTac}</div>
                </div>
                <div className="extra-name mb-1" title={"Diện đối tác: " + `${state?.data?.dienDoiTac}`}>{state?.data?.dienDoiTac}</div>
                <div className="d-flex mb-2 font-weight-bold align-items-center info-phone">
                  <antIc.PhoneOutlined />
                  <div className="text-decoration-underline px-2" title="Số điện thoại"> {state?.data?.dienThoai} </div>
                </div>
              </div>
            </div>
            <div className="info-customer">
              <div className="typeBusiness info-customer-left" title="Loại khách hàng">Doanh nghiệp</div>
              <div className="info-customer-right d-flex font-weight-bold align-items-center">
                <antIc.CalendarOutlined />
                <div className="px-2"> {state?.data?.tinhThanh} </div>
              </div>
            </div>
            <div className="d-flex justify-content-between pt-3">
              <span>Tỷ lệ hoàn thiện thông tin</span>
              <span className="Percent">{state?.percent}%</span>
            </div>
            <Progress percent={state?.percent} status={getStatus(state?.percent)} showInfo={false} />
            {/* success, exception, normal,  */}
            <div>
              <div className="mt-2 border-bottom">
                <div className="grid-record-cus mb-2">
                  <antIc.GlobalOutlined className="grid-record-cus--icon" title="Quốc tịch" />
                  <div className="grid-record-cus--content" title="Quốc tịch">{state?.data?.quocGia}</div>
                </div>
                <div className="grid-record-cus mb-2">
                  <antIc.IdcardOutlined className="grid-record-cus--icon" title="Mã số thuế" />
                  <div title="Mã số thuế" className="info-text grid-record-cus--content">{state?.data?.maSoThue}</div>
                </div>
                <div className="grid-record-cus mb-2">
                  <antIc.CreditCardOutlined className="grid-record-cus--icon" title="Ngân hàng" />
                  <div className="info-text grid-record-cus--content" title="Ngân hàng">{state?.data?.tenNganHang}</div>
                </div>
                <div className="grid-record-cus mb-2" >
                  <antIc.CreditCardOutlined className="grid-record-cus--icon" title="Email" />
                  <div className="grid-record-cus--content" title="Email">{state?.data?.email}</div>
                </div>
                {/* <div className="grid-record-cus mb-2">
                  <antIc.SolutionOutlined className="grid-record-cus--icon" title="Trình độ" />
                  <div className="grid-record-cus--content" title="Đại học">Đại học</div>
                </div> */}
              </div>
            </div>
            {/* Thông tin trạng thái khách hàng */}
            {!mobileMode ? (
              <>
                <div className="step-wrap py-sm-2 border-bottom">
                  <div className="step-container">
                    <Steps
                      size="small"
                      current={1}
                      status="error"
                      direction="vertical"
                      items={[
                        {
                          title: 'Khách hàng tiềm năng',
                          description: "22/12/2020",
                          icon: <><antIc.UserSwitchOutlined /></>
                        },
                        {
                          title: 'Khách hàng chính thức',
                          description: "22/12/2021",
                          icon: <><antIc.UserSwitchOutlined /></>

                        },
                        {
                          title: 'Khách hàng thân thiết',
                          description: "22/12/2022",
                          icon: <><antIc.UserSwitchOutlined /></>
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="content-note-customer mr-1 mt-2">
                  {/* Chạy vòng lặp hiển thị thông tin lịch sử tác động */}
                  <div className="note-box mt-2 mr-1 p-2">
                    <div className="d-flex justify-content-between">
                      <div className="note-user">Khách hàng: T***</div>
                      <div className="note-time">15:00 - 15/05/2023</div>
                    </div>
                    <div className="text-left" style={{ textOverflow: "ellipsis", color: "#667085" }}>Trung tâm SX cơ khí</div>
                    <hr className="hr" />
                    <div>
                      <TextArea className="content-note" disabled={true} value="Đã quan tâm sản phẩm XXX" />
                    </div>
                  </div>
                  <div className="note-box mt-2 mr-1 p-2">
                    <div className="d-flex justify-content-between">
                      <div className="note-user">Khách hàng: T***</div>
                      <div className="note-time">15:00 - 15/05/2023</div>
                    </div>
                    <div className="text-left" style={{ textOverflow: "ellipsis", color: "#667085" }}>Trung tâm SX cơ khí</div>
                    <hr className="hr" />
                    <div>
                      <TextArea className="content-note" disabled={true} value="Đã quan tâm sản phẩm XXX" />
                    </div>
                  </div>
                  <div className="note-box mt-2 mr-1 p-2">
                    <div className="d-flex justify-content-between">
                      <div className="note-user">Khách hàng: T***</div>
                      <div className="note-time">15:00 - 15/05/2023</div>
                    </div>
                    <div className="text-left" style={{ textOverflow: "ellipsis", color: "#667085" }}>Trung tâm SX cơ khí</div>
                    <hr className="hr" />
                    <div>
                      <TextArea className="content-note" disabled={true} value="Đã quan tâm sản phẩm XXX" />
                    </div>
                  </div>
                </div></>
            ) : ('')}
          </div>
        </div>
      </div >
    </>
  )
}

export default memo(BlockInfoView);