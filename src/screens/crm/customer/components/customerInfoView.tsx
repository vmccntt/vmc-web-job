import { memo, useEffect, useState } from "react"
import BuyAddressView from "./buyAddressView";
import { ReactComponent as Total } from "../../../../assets/img/total.svg";
import { ReactComponent as Avg } from "../../../../assets/img/avg.svg";
import { ReactComponent as TotalPrice } from "../../../../assets/img/totalPrice.svg";
import { cloneDeep } from "lodash";
import { useAppSelector } from "../../../../app/hooks";
import { checkProps, formatDate } from "../../../../utils";

const CustomerInfoView = () => {
	const [state, setState] = useState<any>({
    data: null
  });
  const dataReducer = useAppSelector((state) => state.screens.customer);
	const avgVal = (val1: any, val2: any) => {
		if(val1 && val2 && val1 > 0) {
			return (val2 / val1).toLocaleString('en-US', {style : 'currency', currency : 'VND'})
		} else return 0;
	}
  useEffect(() => {
    if (dataReducer) {
      const newData = cloneDeep({ ...dataReducer?.dataDetail});
      setState(checkProps(newData));
    }
  }, [dataReducer]);
	return (
		<div className="rounded-bottom">
			<div className="d-flex cus-block-info rounded-3 pl-4 pr-4 pb-2">
				<div className="cus-prf">
					<div className="h-100">
						<div className="mt-2">
							<h6 className="bold titleH">Thông tin nhân khẩu học</h6>
							<div className="row row-cols-4 border-bottom pb-3">
								<div>
									<label className="text-start text-gray">Mã khách hàng/ Đối tác:</label>
									<div className="bold cus-people">{state?.maDoiTac}</div>
								</div>
								<div>
									<label className="text-start text-gray">Công ty/Doanh nghiệp:</label>
									<div className="bold cus-people" title={`${state?.tenDoiTac}`}>{state?.tenDoiTac}</div>
								</div>
								<div>
									<label className="text-start text-gray">Mã số thuế:</label>
									<div className="bold cus-people">{state?.maSoThue}</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Nhóm lĩnh vực:</label>
									{/* Viễn thông, điện tử, cơ khí, năng lượng tái tạo */}
									<div className="bold cus-people">Không có dữ liệu</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Nhóm đối tác:</label>
									<div className="bold cus-people" title={`${state?.nhomDoiTac}`}>{state?.nhomDoiTac}</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Tên người đại diện:</label>
									<div className="bold cus-people">{state?.nguoiDaiDien}</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Quy mô:</label>
									{/* Theo doanh thu */}
									<div className="bold cus-people">Không có dữ liệu</div>
								</div>
							</div>
						</div>
						<div className="mt-2">
							<h6 className="bold titleH">Thông tin chi tiết</h6>
							<div className="row row-cols-4 border-bottom pb-3">
								<div>
									<label className="text-start text-gray">Đối tượng:</label>
									<div className="bold cus-people">{state?.doiTuong}</div>
								</div>
								<div>
									<label className="text-start text-gray">Phân loại:</label>
									<div className="bold cus-people">{state?.phanLoai}</div>
								</div>
								<div>
									<label className="text-start text-gray">Số GPKD:</label>
									<div className="bold cus-people">{state?.soDKKD}</div>
								</div>
								<div>
									<label className="text-start text-gray">Ngày cấp đăng ký GPKD:</label>
									<div className="bold cus-people">{formatDate(state?.ngayCapDKKD)}</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Số tài khoản:</label>
									<div className="bold cus-people">{state?.soTaiKhoan}</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Ngân hàng:</label>
									<div className="bold cus-people">{state?.tenNganHang}</div>
								</div>
								<div>
									<label className="text-start mt-2 text-gray">Ngày chăm sóc:</label>
									<div className="bold cus-people">{formatDate(state?.ngayChamSoc)}</div>
								</div>
							</div>
						</div>
						<div className="mt-2 border-bottom pb-3">
							<h6 className="bold titleH">Địa chỉ khách hàng</h6>
							<div className="right-address">
								<div className="pt-2">
									<div className="row row-cols-3">
										<div className="">
											<label>Quốc gia:</label>
											<div className="font-weight-bold">{state?.quocGia}</div>
										</div>
										<div className=" mt-1">
											<label>Tỉnh/thành phố:</label>
											<div className="font-weight-bold">{state?.tinhThanh}</div>
										</div>
										<div className=" mt-1">
											<label>Quận/huyện:</label>
											<div className="font-weight-bold">{state?.quanHuyen}</div>
										</div>
										
									</div>
									<div className="row row-cols-1 pt-2">
											<label>Địa chỉ chi tiết:</label>
											<div className="font-weight-bold address" >{state?.diaChi}</div>
										</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="cus-economy">
					<div className="economy h-100 p-3">
						<h6 className="titleH">Kinh tế</h6>
						<div className="d-flex align-items-center my-3">
							<div><Total /></div>
							<div className="ms-3">
								<div className="text-gray">Số đơn hàng </div>
								<div><strong>{state?.numberOfOrders}</strong></div>
							</div>
						</div>
						<div className="d-flex align-items-center my-3">
							<div><Avg /></div>
							<div className="ms-3">
								<div className="text-gray">Giá trị trung bình trên đơn</div>
								<div><strong>{avgVal(state.numberOfOrders, state.totalValue)}</strong></div>
							</div>
						</div>
						<div className="d-flex align-items-center my-3">
							<div><TotalPrice /></div>
							<div className="ms-3">
								<div className="text-gray">Tổng giá trị đã mua</div>
								<div><strong>{state?.totalValue?.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</strong></div>
							</div>
						</div>
					</div>
				</div>

			</div>
			<BuyAddressView />
		</div>
	)
}

export default memo(CustomerInfoView) 