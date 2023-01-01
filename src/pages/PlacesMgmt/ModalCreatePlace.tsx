import React, { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import apiPlaces from "../../apis/apiPlaces";
import apiUpload from "../../apis/apiUpload";
import { ModalFormProps } from "../../models/ModalFormProps";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { toast } from "react-toastify";
import { type } from "os";

const { Title, Text } = Typography;

// const provinceData: any = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};

type CityName = keyof typeof cityData;

const ModalCreatePlace: React.FC<ModalFormProps> = ({
  open,
  onSubmit,
  onCancel,
}) => {
  const [typePlace, setTypePlace] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      apiPlaces
        .getPlaceTypes()
        .then((res) => {
          const newData = res.data.map((item: any, index: any) => ({
            id: item.id,
            name: item.name,
          }));

          setTypePlace(newData);
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

  const [form] = Form.useForm();

  const [valueSelector, setValueSelector] = useState("Chọn loại địa điểm");

  const [thumbnail, setThumbnail] = useState([]);

  const [uploading, setUploading] = useState(false);

  const onChangeThumbnail = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setThumbnail(imageList);
  };

  const handleUploadAvatar = () => {
    if (thumbnail.length === 0) {
      toast.warning("Vui lòng chọn ảnh");
      return;
    }
    if (uploading) {
      toast.warning(
        "Hình ảnh đang được cập nhật, vui lòng không thao tác quá nhiều lần"
      );
      return;
    }
    setUploading(true);
  };

  const handleTypeChange = (value: any) => {
    setValueSelector(value);
  };

  console.log(valueSelector);

  const [images, setImages] = React.useState([]);
  const maxNumber = 11;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <Modal
      open={open}
      title="Thêm loại địa điểm"
      width={1200}
      okText="Tạo địa điểm"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSubmit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="create-place-type"
        initialValues={{ modifier: "public" }}
      >
        <Row justify="space-around">
          <Col span={6}>
            <Form.Item
              name="name"
              label="Tên địa điểm"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="thumbnail"
              label="Thumbnail"
              rules={[
                {
                  required: true,
                  message: "Nhập cái này vào dùm cái",
                },
              ]}
            >
              <ImageUploading
                value={thumbnail}
                onChange={onChangeThumbnail}
                dataURLKey="data_url"
                acceptType={["jpg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    {imageList.length === 0 ? (
                      <Row
                        style={{
                          width: "10rem",
                          height: "10rem",
                          border: "2px dashed grey",
                          borderRadius: "5px",
                        }}
                        justify="center"
                        align="middle"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <Text
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            color: "blue",
                            fontSize: "0.8rem",
                          }}
                        >
                          Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
                        </Text>
                      </Row>
                    ) : (
                      <Row
                        // key={i}
                        style={{
                          width: "auto",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                        className="image-item"
                        justify="start"
                      >
                        <img
                          style={{
                            width: "10rem",
                            height: "10rem",
                            // alignSelf: "center",
                          }}
                          src={imageList[0].data_url}
                          alt=""
                        />
                        <Space
                          direction="vertical"
                          style={{ marginTop: "1rem" }}
                          className="image-item__btn-wrapper"
                          size={30}
                        >
                          <Button type="primary" onClick={handleUploadAvatar}>
                            {uploading} Lưu thay đổi
                          </Button>
                          <Button onClick={() => onImageRemove(0)}>
                            Hủy bỏ
                          </Button>
                        </Space>
                      </Row>
                    )}
                  </div>
                )}
              </ImageUploading>
            </Form.Item>

            <Form.Item
              name="placeType"
              label="Loại địa điểm"
              rules={[
                {
                  required: true,
                  message: "Nhập cái này vào dùm cái",
                },
              ]}
            >
              <Select
                defaultValue={valueSelector}
                style={{ width: 160 }}
                onChange={handleTypeChange}
                options={typePlace.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Please input Intro" }]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
              name="lat"
              label="Lat"
              rules={[{ required: true, message: "Please input website!" }]}
            >
              <InputNumber<string>
                style={{ width: 200 }}
                defaultValue="1"
                min="0"
                max="1000"
                step="0.000001"
                // onChange={onChange}
                stringMode
              />
            </Form.Item>

            <Form.Item
              name="lng"
              label="Lng"
              rules={[{ required: true, message: "Please input website!" }]}
            >
              <InputNumber<string>
                style={{ width: 200 }}
                defaultValue="1"
                min="0"
                max="1000"
                step="0.000001"
                // onChange={onChange}
                stringMode
              />
            </Form.Item>

            <Form.Item name="images" label="Thêm hình ảnh">
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
                    <Row>
                      {imageList.map((image, index) => (
                        <Space
                          direction="vertical"
                          key={index}
                          className="image-item"
                        >
                          <img
                            style={{ width: "8rem", height: "8rem" }}
                            src={image.dataURL}
                            alt=""
                          />
                          <Space className="image-item__btn-wrapper">
                            <Button
                              size="small"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </Button>
                            <Button
                              size="small"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </Space>
                        </Space>
                      ))}

                      <Row
                        style={{
                          width: "8rem",
                          height: "8rem",
                          border: "2px dashed grey",
                          borderRadius: "5px",
                        }}
                        justify="center"
                        align="middle"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <Text
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            color: "blue",
                            fontSize: "0.8rem",
                          }}
                        >
                          Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
                        </Text>
                      </Row>
                    </Row>
                  </div>
                )}
              </ImageUploading>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalCreatePlace;
