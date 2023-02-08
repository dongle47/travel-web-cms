import { Button } from "antd";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import apiUpload from "../../apis/uploadApi";
import { toast } from "react-toastify";

const TestUpload: React.FC = () => {
  const [images, setImages] = React.useState([
    {
      dataURL: "",
      file: new File([""], " "),
    },
  ]);
  const maxNumber = 11;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  const handleUploadAvatar = () => {
    if (images.length === 1) {
      toast.warning("Vui lòng chọn ảnh");
      return;
    }
    let param = { file: images[1].file };
    apiUpload
      .postUploadAvatar(param)
      .then((res) => {
        // toast.success("Cập nhật ảnh đại diện thành công");
        console.log(res);
      })
      .catch((error) => {
        // toast.error("Cập nhật ảnh đại diện thất bại");
        console.log(error);
      });
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

      <Button onClick={handleUploadAvatar}>Get URL</Button>
    </div>
  );
};

export default TestUpload;
