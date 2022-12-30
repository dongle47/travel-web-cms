import React, { useState } from "react";
import { Button, Space, Table, Tag, Typography } from "antd";

import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  id: string;
  thumbnail: number;
  name: string;
  placeType: string;
  lat: string;
  lng: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    width: "10%",
  },
  {
    title: "Tên địa điểm",
    dataIndex: "name",
    width: "10%",
  },
  {
    title: "Loại địa điểm",
    dataIndex: "placeType",
    width: "10%",
  },
  {
    title: "Lat",
    dataIndex: "lat",
    width: "10%",
  },
  {
    title: "Lng",
    dataIndex: "lng",
    width: "10%",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    width: "20%",
  },
  {
    title: "Action",
    key: "action",
    render: (_) => (
      <Space size="middle">
        <Typography.Link style={{ color: "blue" }}>Chỉnh sửa</Typography.Link>
        <Typography.Link style={{ color: "red" }}>Xoá</Typography.Link>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    id: "312312",
    thumbnail: 1,
    name: "John Brown",
    placeType: "ádsad",
    lat: "đấ",
    lng: "đâs",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    id: "312312",
    thumbnail: 1,
    name: "John Brown",
    placeType: "ádsad",
    lat: "đấ",
    lng: "đâs",
    address: "New York No. 1 Lake Park",
  },
  {
    key: "3",
    id: "312312",
    thumbnail: 1,
    name: "John Brown",
    placeType: "ádsad",
    lat: "đấ",
    lng: "đâs",
    address: "New York No. 1 Lake Park",
  },
];

const PlacesMgmt: React.FC = () => {
  return (
    <div>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        // onClick={() => setOpenModal(true)}
      >
        Tạo địa điểm
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default PlacesMgmt;
