import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { URL_DOWNLOAD, URL_UPLOAD } from '../../../constant';
import { getToken } from '../../../utils';
import { IInputFile } from './propsState';
const InputFileComponent = (props: IInputFile) => {
  const { option, statusModal } = props;
  const [fileList, setFileList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  useEffect(() => {
    if (!statusModal) {
      setFileList([]);
      setFirstLoad(false);
    }
  }, [statusModal]);
  const nameDefault = option.getValues!(option.name);

  useEffect(() => {
    if (!nameDefault || firstLoad) return;
    setFirstLoad(true);
    const arFile = nameDefault.split(',');
    if (arFile.length && !_.isEqual(fileList, arFile)) {
      const fList = arFile.map((file: string, index: number) => {
        return {
          uid: index,
          name: file,
          status: 'done',
          response: {
            [option.name]: file,
            filename: file,
          },
          url: `${URL_DOWNLOAD}${option.uploadType}?file=${file}`,
        };
      });
      setFileList(fList);
    }
  }, [nameDefault, firstLoad, fileList, option.name, option.uploadType]);

  const propsUpload = {
    accept: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf",
    name: 'files',
    multiple: true,
    action: `${URL_UPLOAD}${option.uploadType}`,
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
    onChange(info: any) {
      const arFile = info.fileList
        .filter((file: any) => file.response && file.response.filename)
        .map((file: any) => {
          return `${file.response.filename}`;
        });
      option.setValue && option.setValue(option.name, arFile.toString());
      const fList = info.fileList.map((fl: any) => {
        const url =
          fl.response && fl.response.filename ? `${URL_DOWNLOAD}${option.uploadType}?file=${fl.response.filename}` : '';
        fl.name = url ? fl.response.filename : '';
        return { ...fl, url };
      });
      setFileList(fList);
      setFirstLoad(true);
    },
    fileList,
  };

  return (
    <div>
      <Upload {...propsUpload}>
        <Button icon={<UploadOutlined />}>Chọn tệp đính kèm</Button>
      </Upload>
    </div>
  );
};

export default InputFileComponent;
