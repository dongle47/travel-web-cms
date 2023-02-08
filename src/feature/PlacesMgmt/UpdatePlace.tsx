import {
  ArrowLeftOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import Upload, { RcFile, UploadFile, UploadProps } from "antd/es/upload";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const provinceData: any = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};

type CityName = keyof typeof cityData;

const UpdatePlace: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);

  const [secondCity, setSecondCity] = useState(
    cityData[provinceData[0] as CityName][0]
  );

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
  };

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onChange = (value: string) => {
    console.log("changed", value);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

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

  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Space direction="vertical">
      <Button
        style={{ width: "8rem", height: "3rem" }}
        type="text"
        icon={<ArrowLeftOutlined style={{ fontSize: "2rem" }} />}
        onClick={() => navigate(-1)}
      ></Button>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        // initialValues={{
        //   residence: ["zhejiang", "hangzhou", "xihu"],
        //   prefix: "86",
        // }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Thumbnail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Avatar shape="square" size={100} icon={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Tên địa điểm"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Loại địa điểm"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Select
            defaultValue={provinceData[0]}
            style={{ width: 120 }}
            onChange={handleProvinceChange}
            options={provinceData.map((province: any) => ({
              label: province,
              value: province,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="website"
          label="Lat"
          rules={[{ required: true, message: "Please input website!" }]}
        >
          <InputNumber<string>
            style={{ width: 200 }}
            defaultValue="1"
            min="0"
            max="10"
            step="0.00000000000001"
            // onChange={onChange}
            stringMode
          />
        </Form.Item>

        <Form.Item
          name="website"
          label="Lng"
          rules={[{ required: true, message: "Please input website!" }]}
        >
          <InputNumber<string>
            style={{ width: 200 }}
            defaultValue="1"
            min="0"
            max="10"
            step="0.00000000000001"
            // onChange={onChange}
            stringMode
          />
        </Form.Item>

        <Form.Item
          name="intro"
          label="Địa chỉ"
          rules={[{ required: true, message: "Please input Intro" }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          name="intro"
          label="Hình ảnh"
          rules={[{ required: true, message: "Please input Intro" }]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default UpdatePlace;
