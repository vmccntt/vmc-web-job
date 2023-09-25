import React, { useState } from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
// import "./styles.scss";

const Search = (props: any) => {
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const onChange = (key: string | string[]) => {
    if (activeKey.length) setActiveKey(["1"]);
    else setActiveKey([]);
  };
  return (
    <>
      <Collapse
        defaultActiveKey={activeKey}
        onChange={onChange}
        className="mt-2 mb-3"
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        bordered={false}
      >
        <Panel
          header={<> <b className="text-center">Tìm kiếm</b> </>}
          key="1"
          className="bg-white pb-0 vmc-search"
        >
          {props.children}
        </Panel>
      </Collapse>
    </>
  );
};

export default Search;
