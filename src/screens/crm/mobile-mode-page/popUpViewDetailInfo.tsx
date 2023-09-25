import { memo } from "react"

const PopUpViewDetailInfo = (props: any) => {
  return <>
    <div>
      <div>Họ và tên: {props?.user?.title}</div>
      <div>Giới tính:{props?.user?.gender} </div>
      <div>Số điện thoại: {props?.user?.phone}</div>
      <div>Ngày sinh: {props?.user?.birthDay}</div>
      <div>Email: {props?.user?.email}</div>
      <div>Fax: {props?.user?.fax}</div>
      <div>Chức vụ: {props?.user?.position}</div>
      <div>Phòng ban: {props?.user?.department}</div>
    </div>
  </>
}

export default memo(PopUpViewDetailInfo)