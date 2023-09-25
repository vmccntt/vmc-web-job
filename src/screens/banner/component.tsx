import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Dropdown, Image, Menu, Modal, Row, Table } from "antd";
import { useAppSelector } from "../../app/hooks";
import SearchComponent from "./component/searchComponent";
import { ReactComponent as Kebab } from "../../assets/img/kebab.svg";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteBannerAction, getBannersAction } from "./slice";
import { BannerInterface, SliderInterface } from "./banner.model";
import { formatDate, isCheckPermisson } from "../../utils";
import Search from "../../Layout/search";
import { IUserState } from "../user/propState";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const BannerPage = () => {
  const dispatch = useDispatch();
  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isBannerCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.BANNER_CREATE
  );
  const isBannerUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.BANNER_UPDATE
  );
  const isBannerList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.BANNER_LIST
  );
  const isBannerDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.BANNER_DELETE
  );

  const [state, setState] = useState<any>({
    data: [],
    currentPage: 1,
  });
  const getImgDetail = (sliders: SliderInterface[]) => {
    if (sliders && Array.isArray(sliders)) {
      const slide = sliders.find((s) => s.imgage);
      if (slide) return slide.imgage;
    }
    return "";
  };
  const header: any = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      width: 50,
      align: "center",
    },
    {
      title: "Tên trình chiếu",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Ảnh bìa",
      key: "icon",
      align: "center",
      render: (_text: string, record: BannerInterface, index: number) => {
        return (
          <Image src={getImgDetail(record?.sliders)} width={100} />
        );
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (_text: string, record: BannerInterface, index: number) => {
        return <>{formatDate(record.updatedAt)}</>;
      },
    },
    {
      title: "",
      key: "action",
      width: 50,
      align: "right" as "right",
      render: (_text: string, record: BannerInterface, index: number) => {
        return (
          <Dropdown
            key={`dr-${index}`}
            overlay={menu(record, index)}
            className="cursor-pointer"
          >
            <Kebab className="m-auto" />
          </Dropdown>
        );
      },
    },
  ];
  const bannerData = useAppSelector((state) => state.screens.banner);
  const menu = (item: BannerInterface, index: number) => {
    return (
      <Menu key={index}>
        {isBannerUpdate && (
          <Menu.Item
            key={`ite-${index}`}
            icon={<EditOutlined />}
            // onClick={_editItem(item)}
          >
            <Link
              key="bannerUpdate"
              to={{ pathname: `/banner/update/${item.id}` }}
              title="Create"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isBannerDelete && (
          <Menu.Item
            key={`itd-${index}`}
            icon={<DeleteOutlined />}
            danger
            onClick={_confirmDelete(item)}
          >
            Xóa
          </Menu.Item>
        )}
      </Menu>
    );
  };

  useEffect(() => {
    isBannerList && dispatch(getBannersAction({}) as any);
  }, [dispatch, isBannerList]);

  useEffect(() => {
    if (bannerData.data) {
      setState(bannerData);
      // console.log("state banner :>> ", bannerData);
    }
  }, [bannerData]);

  const _confirmDelete = (item: BannerInterface) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa Banner không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteBannerAction({ id }) as any);
      },
    });
  };

  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
  };

  return (
    <>
      <Card
        title={
          <>
            <h3 className="text-xl">Trình chiếu</h3>
          </>
        }
        className="rounded-none"
        extra={
          isBannerCreate && (
            <Link key="5" to={{ pathname: `/banner/create` }} title="Create">
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isBannerList && (
          <Search>
            <SearchComponent />
          </Search>
        )}

        {/* <CreateBannerComponent /> */}
        {isBannerList && (
          <Table
            dataSource={state?.data || []}
            columns={header}
            pagination={{
              defaultPageSize: 10,
              total: 1,
              showSizeChanger: false,
              onChange: _onChangePage,
            }}
            bordered
            // scroll={{ y: 400 }}
            key={"id"}
          />
        )}
      </Card>
    </>
  );
};

export default BannerPage;
