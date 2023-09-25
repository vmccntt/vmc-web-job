import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { URL_DOWNLOAD } from '../../../constant';
import { uploadFile } from '../../../services/common';
import { showToast } from '../../../utils';
import { setLoadingAction } from '../../commonSlice';
import { IInputFile } from './propsState';

const InputFileAvatarComponent = (props: IInputFile) => {
  const { option, statusModal } = props;

  const dispatch = useDispatch();
  const [image, setImage] = useState<string | null | ArrayBuffer>('');

  const container = option.uploadType ? option.uploadType : 'defaults';

  useEffect(() => {
    if (!statusModal) {
      setImage('');
    }
  }, [statusModal]);

  const nameDefault = option.getValues!(option.name);

  useEffect(() => {
    if (nameDefault && image !== nameDefault) {
      setImage(nameDefault);
    }
  }, [nameDefault, image]);

  const _changeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      const file = event.target.files![0];
      if (!file) return;
      dispatch(setLoadingAction(true));
      let formData = new FormData();
      formData.append('files', file);
      const response: any = await uploadFile(formData, option.uploadType!);
      dispatch(setLoadingAction(false));
      option.setValue && option.setValue(option.name, response.filename);
      setImage(`${response.containter}?file=${response.filename}`);
    } catch (error: any) {
      dispatch(setLoadingAction(false));
      showToast(error.message, 'error');
    }
  };

  const _renderChooseFile = () => {
    if (image) return null;
    return (
      <>
        <svg className="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
          <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
        </svg>
        <p>Chọn tệp</p>
      </>
    );
  };
  return (
    <div
      className="box-upload-file"
      style={{
        backgroundImage: `url(${URL_DOWNLOAD}${container}?file=${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
      <div className="box__input">
        {_renderChooseFile()}
        <input type="file" onChange={_changeFile} {...props.option.inputAttributes} value="" />
      </div>
    </div>
  );
};

export default InputFileAvatarComponent;
