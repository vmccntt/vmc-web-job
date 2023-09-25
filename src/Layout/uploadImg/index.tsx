import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { uploadFile } from "../file/services";
import { get } from "lodash";
import { FileTypeEnum } from "../../utils/enum";
import noImage from "../../imgs/no_image.png";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImgComponent = ({
  className,
  url,
  setImg,
  keyPath,
  type,
  accept,
  addOtp
}: {
  className?: string;
  url?: string;
  keyPath: string;
  accept?: string;
  type?: FileTypeEnum;
  addOtp?: any;
  setImg?: (link: string, key: string, addOtp?: any) => void;
}) => {

  const initImg = url
    ? [
        {
          name: "1",
          uid: "1",
          url: url || noImage,
        },
      ]
    : [];
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(initImg);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const onRemoveImg = () => {
    setFileList([]);
    setImg && setImg("", keyPath, addOtp);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length && !fileList.length) {
      const newF = newFileList[0]["originFileObj"];
      const data = await uploadFile({
        file: newF,
        name: newFileList[0]?.fileName,
        minType: newFileList[0].type,
        type,
      });
      const id = get(data, "data.id", "");
      if (id && setImg) {
        const link = `${process.env.REACT_APP_API_URL}file/detail/${id}`;
        setImg(link, keyPath, addOtp);
      }
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        className={className}
        beforeUpload={() => false}
        defaultFileList={fileList}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemoveImg}
        accept={accept || 'image/*'}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default UploadImgComponent;
