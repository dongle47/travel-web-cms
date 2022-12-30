import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Space, Table, Typography } from "antd";

import { EditableCell } from "../../components";
import ModalCreate from "./ModalCreate";
import { PlaceType } from "../../models/places";

import apiPlaces from "../../apis/apiPlaces";

const PlaceTypesMgmt: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: "",
      id: "",
      code: "",
      name: "",
    },
  ]);
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
            name: item.name,
          }));

          setData(newData);
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

  const isEditing = (record: PlaceType) => record.key === editingKey;

  const edit = (record: Partial<PlaceType> & { key: React.Key }) => {
    form.setFieldsValue({ id: "", code: "", name: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as PlaceType;

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
      dataIndex: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      render: (_: any, record: PlaceType) => {
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
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Chỉnh sửa
            </Typography.Link>

            <Typography.Link
              style={{ color: "red" }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Xoá
            </Typography.Link>
          </Space>
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
      onCell: (record: PlaceType) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  //   modal
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = (values: any) => {
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

    setOpenModal(false);
  };

  //   end modal

  return (
    <div>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => setOpenModal(true)}
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

      <ModalCreate
        open={openModal}
        onSubmit={onSubmit}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
};

export default PlaceTypesMgmt;
