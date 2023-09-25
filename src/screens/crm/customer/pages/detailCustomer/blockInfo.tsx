import { useParams } from "react-router-dom";
import BlockInfoDetail from "../../components/customerDetail360/blockInfoDetail";
import BlockInfoView from "../../components/customerDetail360/blockInfoView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDetailCustomerAction } from "../listCustomer/slice";
import { useAppSelector } from "../../../../../app/hooks";

const BlockInfo = () => {
  const dataReducer = useAppSelector((state) => state.screens.customer);
  const mobileData = useAppSelector((state) => state.common.isMobile);
  const dispatch = useDispatch();
  const { id }: any = useParams();
  useEffect(() => {
    if (id && dataReducer?.dataDetail == null) {
      const detail = async () => {
        await dispatch(getDetailCustomerAction(id) as any);
      };
      detail();
    }
  }, [dispatch, id]);

  return (
    <>
      {
        !mobileData ? (<div className="d-flex wrap-block-info">
          <BlockInfoView />
          <BlockInfoDetail />
        </div>) : (
          <div className="wrap-block-info">
            <div>
              <BlockInfoView />
            </div>
            <div>
              <BlockInfoDetail />
            </div>
          </div>
        )
      }
    </>

  )
}

export default BlockInfo;