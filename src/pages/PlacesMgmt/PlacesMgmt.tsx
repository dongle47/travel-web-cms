import React, { useEffect, useState } from "react";
import { Avatar, Button, Space, Table, Tag, Typography } from "antd";
import apiPlaces from "../../apis/apiPlaces";

import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
interface DataType {
  id: string;
  thumbnail: string;
  name: string;
  placeType: string;
  lat: number;
  lng: number;
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
    render: (_, { thumbnail }) => (
      <Avatar shape="square" size={70} src={thumbnail} />
    ),
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
    title: "Hành động",
    dataIndex: "action",
    render: (_, { id }) => (
      <Space size="middle">
        <Link to={id}>
          <Typography style={{ color: "blue" }}>Chỉnh sửa</Typography>
        </Link>
        <Typography style={{ color: "red" }}>Xoá</Typography>
      </Space>
    ),
  },
];

const PlacesMgmt: React.FC = () => {
  const [data, setData] = useState([
    {
      id: "312312",
      thumbnail: "dasd",
      name: "John Brown",
      placeType: "ádsad",
      lat: 1,
      lng: 1,
      address: "New York No. 1 Lake Park",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      var placeType: any[] = [];
      await apiPlaces.getPlaceTypes().then((res) => (placeType = res.data));
      await apiPlaces
        .getPlaces()
        .then((res) => {
          const newData = res.data.map((item: any, index: any) => ({
            id: item.id,
            thumbnail: item.thumbnail,
            name: item.name,
            placeType: placeType.find(
              (element) => element.id === item.place_type_id
            ).name,
            lat: item.lat,
            lng: item.lng,
            address: "New York No. 1 Lake Park",
          }));

          setData(newData);
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

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
