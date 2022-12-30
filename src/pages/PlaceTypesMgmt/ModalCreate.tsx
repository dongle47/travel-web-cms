import { Form, Input, Modal } from "antd";
import React from "react";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface ModalFormProps {
  open: boolean;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}

const ModalCreate: React.FC<ModalFormProps> = ({
  open,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title="Thêm loại địa điểm"
      okText="Create"
      cancelText="Cancel"
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
        <Form.Item
          name="name"
          label="Loại địa điểm"
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
          name="code"
          label="Code"
          rules={[
            {
              required: true,
              message: "Nhập cái này vào dùm cái",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
