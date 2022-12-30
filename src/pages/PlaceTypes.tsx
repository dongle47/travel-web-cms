import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import apiPlaces from "../apis/apiPlaces";
import { toNamespacedPath } from "node:path/win32";

interface Item {
  key: string;
  id: string;
  code: string;
  placeType: string;
}

const originData: Item[] = [];
originData.push({
  key: "1",
  id: "Dong",
  code: "okela",
  placeType: "London Park",
});

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
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

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const PlaceTypes: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    const getData = async () => {
      apiPlaces
        .getPlaceTypes()
        .then((res) => {
          const newData = res.data.map((item: any, index: any) => ({
            key: index,
            id: item.id,
            code: item.code,
            placeType: item.name,
          }));

          setData(newData);
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ id: "", code: "", placeType: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "25%",
      editable: false,
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "15%",
      editable: true,
    },
    {
      title: "Loại địa điểm",
      dataIndex: "placeType",
      width: "40%",
      editable: true,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Typography.Link onClick={cancel} style={{ marginRight: 8 }}>
              Huỷ bỏ
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Chỉnh sửa
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  //   modal
  const [open, setOpen] = useState(false);

  const onSubmit = (values: any) => {
    console.log("Received values of form: ", values);
    const param = {
      code: values.code,
      name: values.name,
    };

    apiPlaces
      .postPlaceType(param)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
    // console.log(param);
    setOpen(false);
  };

  //   end modal

  return (
    <div>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Thêm loại địa điểm
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 4,
            onChange: cancel,
          }}
        />
      </Form>

      <CollectionCreateForm
        open={open}
        onSubmit={onSubmit}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default PlaceTypes;
