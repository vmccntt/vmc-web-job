import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { get } from "lodash";
import { uploadFile } from "../file/services";
import { FileTypeEnum } from "../../utils/enum";

function Tinymce(props: any) {
  const handleEditorChange = (e: any) => {
    props.onChangeHtml(e.target.getContent());
  };
  const handleChange = async ({
    file,
    callback,
  }: {
    file: File;
    callback: (link: string, { alt }: { alt: string }) => void;
  }) => {
    if (file) {
      const data = await uploadFile({
        file: get(file, "[0]"),
        name: get(file, "[0].name"),
        minType: get(file, "[0].type"),
        type: FileTypeEnum.POST,
      });
      const id = get(data, "data.id");
      if (id) {
        const link = `${process.env.REACT_APP_API_URL}file/detail/${id}`;
        callback(link, { alt: get(file, "[0].name") || "" });
      }
    }
  };
  const toolbar = `undo redo | formatselect | bold italic backcolor |
  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
  removeformat | image |
  styleselect | fontsizeselect | sizeselect | fontselect
  `;
  return (
    <div>
      <input
        id="my-file"
        type="file"
        name="my-file"
        style={{ display: "none" }}
        // onChange=""
      />
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        {...props}
        // initialValue="<p>This is the initial content of the editor</p>"
        plugins="advlist autolink lists link image charmap print preview anchor
                          searchreplace visualblocks code fullscreen
                          insertdatetime media table paste code help wordcount"
        init={{
          selector: "textarea",
          toolbar,
          fontsize_formats:
            "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
          font_formats:
            "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
          height: 500,
          init_instance_callback: function (editor) {
            var freeTiny: any = document.querySelector(".mce-notification");
            if(freeTiny) {
              freeTiny.style.display = "none";
            }
          },
          file_picker_callback: function (callback, value, meta) {
            // Provide file and text for the link dialog
            if (meta.filetype === "file") {
              callback("mypage.html", { text: "My text" });
            }

            // Provide image and alt text for the image dialog
            if (meta.filetype === "image") {
              var input = document.getElementById("my-file");
              if (input) {
                input.click();
                input.onchange = function () {
                  const file: any = get(input, "files");
                  handleChange({ file, callback });
                };
              }
              // UploadImgComponent
              // callback(
              //   "https://viettelhightech.com/storage/banner-trang-chu/artboard-4-2880x1380.png",
              //   { alt: "My alt text" }
              // );
            }

            // Provide alternative source and posted for the media dialog
            if (meta.filetype === "media") {
              callback("movie.mp4", {
                source2: "alt.ogg",
                poster: "image.jpg",
              });
            }
          },
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default Tinymce;
