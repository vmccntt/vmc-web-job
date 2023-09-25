import { Table } from "antd";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import url from "../../../assets/img/no-avatar.jpg";
import { Image, List, Modal } from "antd-mobile";
import PopUpViewDetailInfo from "./popUpViewDetailInfo";

const BuyAddressMobileView = () => {
  const [state, setState] = useState<any>({
    data: [],
    // total: 1,
    currentPage: 1,
  });

  const dataReducer = useAppSelector((state) => state.screens.customer);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    var newData = dataReducer?.dataDetail?.represents;
    setState({ ...state, data: newData });
  }, [dataReducer]);

  return (
    <div className="rounded">
      <div className="pl-4 pr-4 rounded-3 wap-responsive">
        <div className="row gx-5">
          <div className="right-address">
            <h6 className="titleH">Thông tin liên hệ</h6>
            <div className="address-box">
              <List>
                {state?.data.map((user: any, i: any) => (
                  <List.Item
                    key={i}
                    onClick={() => {
                      Modal.show({
                        title: 'Thông tin chi tiết',
                        content: <PopUpViewDetailInfo user={user} />,
                        closeOnAction: true,
                        closeOnMaskClick: true,
                      })
                    }
                    }
                    prefix={
                      <Image
                        src={url}
                        style={{ borderRadius: 20 }}
                        fit='cover'
                        width={40}
                        height={40}
                      />
                    }
                    description={user.phone}
                  >
                    {user.title}
                  </List.Item>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default memo(BuyAddressMobileView)