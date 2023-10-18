import { Button, Card, Form, Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { getListCustomerAction } from "../crm/customer/pages/listCustomer/slice";
import { getAllJob, getLogsByCode, startSchedule, updateStatusJob } from "./service";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import { useAppSelector } from "../../app/hooks";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const [dataLogsCus, setDataLogsCus] = useState<any>();
  const [dataJob, setDataJob] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const mobileMode = useAppSelector((state) => state.common.isMobile);
  useEffectOnce(() => {
    getAll();
  });

  const getAll = async () => {
    var lstJob = await getAllJob();
    if (lstJob) {
      setDataJob(lstJob);
    }
  }

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 200,
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Mã tiến trình',
      dataIndex: 'jobCode',
      key: 'jobCode',
      width: 150,
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalST = () => {
    setIsSettingOpen(true);
  };

  const handleOkST = () => {
    setIsSettingOpen(false);
  };

  const handleCancelST = () => {
    setIsSettingOpen(false);
  };

  const startJob = async (val: any) => {
    var obj = {
      jobName: val?.name,
      jobCode: val?.code,
      status: 1,
      type: val?.type,
      hour: 6,
    }
    await updateStatusJob(obj);
    await startSchedule(obj);
    await getAll();
  }

  const stopJob = async (val: any) => {
    var obj = {
      jobName: val?.name,
      jobCode: val?.code,
      status: 0,
      type: val?.type,
      hour: 6,
    }
    await updateStatusJob(obj);
    await getAll();
  }

  const getLogs = async (jobCode: string) => {
    showModal();
    var dataLog = await getLogsByCode(jobCode);
    if (dataLog) {
      setDataLogsCus(dataLog);
    }
  }

  const setting = (val: any) => {
    // showModalST();
  }

  return (
    <>
      {
        mobileMode ? (
          <div className="">
            {
              dataJob ? (
                dataJob.map((item: any) => {
                  return (
                    <div className="pt-3">
                      <Card title={item?.name} bordered={false}>
                        <div className="d-flex justify-content-between">
                          {!item.status ? (<p>Đã dừng...</p>) : (<p className="pr-3">Tiến trình đang chạy...</p>)}
                          <div>
                            {!item.status ? (
                              <>
                                <Button type="primary" className="mr-1" onClick={() => startJob(item)}> Bắt đầu </Button>
                                <Button className="mr-1" onClick={() => getLogs(item.code)}> Logs </Button>
                                <Button onClick={() => setting(item)}> Cấu hình </Button>
                              </>
                            ) :
                              (
                                <>
                                  <Button type="primary" className="mr-1" danger onClick={() => stopJob(item)}> Dừng </Button>
                                  <Button onClick={() => getLogs(item.code)}> Logs </Button>
                                </>
                              )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                })
              ) : ('')
            }
          </div >
        ) : (
          <div className="d-flex">
            {
              dataJob ? (
                dataJob.map((item: any) => {
                  return (
                    <div className="pr-3">
                      <Card title={item?.name} bordered={false}>
                        <div className="d-flex justify-content-between">
                          {!item.status ? (<p>Đã dừng...</p>) : (<p>Tiến trình đang chạy...</p>)}
                          <div>
                            {!item.status ? (
                              <>
                                <Button type="primary" className="mr-1" onClick={() => startJob(item)}> Bắt đầu </Button>
                                <Button className="mr-1" onClick={() => getLogs(item.code)}> Logs </Button>
                                {/* <Button onClick={() => setting(item)}> Cấu hình </Button> */}
                              </>
                            ) :
                              (
                                <>
                                  <Button type="primary" className="mr-1" danger onClick={() => stopJob(item)}> Dừng </Button>
                                  <Button onClick={() => getLogs(item.code)}> Logs </Button>
                                </>
                              )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                })
              ) : ('')
            }
          </div >
        )
      }
      <Modal
        title="Logs detail"
        width={1000}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table dataSource={dataLogsCus} columns={columns} />
      </Modal>
      <Modal
        title="Cấu hình"
        className="setting"
        width={500}
        footer={null}
        open={isSettingOpen}
        onOk={handleOkST}
        onCancel={handleCancelST}
      >
        {/* <Form
          className="form-create-currency row"
          form={form}
          layout="vertical"
          onFinish={_onFinish}
        >
          
        </Form> */}
      </Modal>
    </>
  );
};

export default DashBoardPage;
