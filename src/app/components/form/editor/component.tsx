import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { API_MEDIA, EDITOR, URL_DOWNLOAD } from "../../../../constant";
import { BlobInfo } from "../../../../models";
import { uploadFile, uploadFileVideo } from "../../../../services/common";
import { setLoadingAction } from "../../../commonSlice";
import { IInputCurrency } from "../propsState";
import "./styles.scss";
const EditorComponent = (props: IInputCurrency) => {
  //#region declare
  const editorRef = useRef<any>();
  const dispatch = useDispatch();
  const { option, statusModal } = props;

  const defaultValue = option.getValues && option.getValues(option.name);

  useEffect(() => {
    if (defaultValue && editorRef.current) {
      editorRef.current.setContent(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (!statusModal && editorRef.current) {
      editorRef.current.setContent("");
    }
  }, [statusModal]);
  //#endregion declare
  //#region action

  const _uploadImage = async (
    blobInfo: BlobInfo,
    success: (url: string) => void,
    failure: (url: string) => void
  ) => {
    try {
      if (!blobInfo) return;
      const file = blobInfo.blob();
      if (!file) return;
      dispatch(setLoadingAction(true));
      let formData = new FormData();
      formData.append("files", file);
      const response: any = await uploadFile(formData, "");
      success(`${URL_DOWNLOAD}defaults?file=${response.filename}`);
      dispatch(setLoadingAction(false));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  };

  const _onBlur = () => {
    if (editorRef.current) {
      option.setValue &&
        option.setValue(option.name, editorRef.current.getContent());
    }
  };

  //#endregion action
  return (
    <div className="editor">
      <Editor
        apiKey="eaede523y3uous2xdcjfux6m0mv45r618niq4lsce6x4izci"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onBlur={_onBlur}
        init={{
          ...EDITOR,
          // images_upload_handler: (
          //   blobInfo: any,
          //   success: any,
          //   failure: any
          // ) => {
          //   _uploadImage(blobInfo, success, failure);
          // },
          file_picker_callback: async function (
            callback: any,
            value: any,
            meta: any
          ) {
            const input: any = document.getElementById("media-editor-input");
            if (!input) return;
            input.click();
            input.onchange = async function () {
              var file = input.files[0];
              const fileType = file.type;
              if (
                meta.filetype === "image" &&
                fileType.indexOf("image") !== -1
              ) {
                var reader = new FileReader();
                reader.onload = function (e: any) {
                  callback(e.target.result, {
                    alt: file.name,
                  });
                };
                reader.readAsDataURL(file);
              }

              if (
                meta.filetype === "media" &&
                fileType.indexOf("video") !== -1
              ) {
                dispatch(setLoadingAction(true));
                try {
                  let formData = new FormData();
                  formData.append("file", file);
                  const response: any = await uploadFileVideo(formData);
                  callback(`${API_MEDIA}${response.url.mp4}`, {
                    source2: "alt.ogg",
                  });
                  dispatch(setLoadingAction(false));
                } catch (error) {
                  dispatch(setLoadingAction(false));
                }
              }
              input.value = "";
            };

            /* Provide alternative source and posted for the media dialog */
            // if (meta.filetype === 'media') {
            //   input.onchange = function () {
            //     var file = input.files[0];
            //     var reader = new FileReader();
            //     reader.onload = function (e) {
            //       console.log('name', e.target.result);
            //       callback(e.target.result, {
            //         alt: file.name,
            //       });
            //     };
            //     reader.readAsDataURL(file);
            //   };

            //   // callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            // }
          },
        }}
      />
      <input id="media-editor-input" type="file" />
    </div>
  );
};

export default EditorComponent;
