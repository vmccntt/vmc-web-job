import {  UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type {  UploadProps } from "antd/es/upload";

const UploadFileComponent = ({propsFile, title }: { propsFile?: UploadProps, title?: string }) => {

  const propsDefault: UploadProps = {
    name: 'file',
    beforeUpload: () => false,
  };

  return (
    <>
      <Upload {...{...propsDefault, ...propsFile}}>
        <Button icon={<UploadOutlined />}> { title || 'Click to Upload' } </Button>
        {propsFile?.children}
      </Upload>
    </>
  );
};
export default UploadFileComponent;
