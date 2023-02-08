import React, { useEffect, useState } from "react";
import { Avatar, Button, Space, Table, Typography } from "antd";
import apiPlaces from "../../apis/placesApi";

import ModalCreatePlace from "./ModalCreatePlace";

import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiUpload from "../../apis/uploadApi";
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
  const [openModal, setOpenModal] = useState(false);

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
            address: item.address,
          }));

          setData(newData);
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

  const onSubmit = (values: any) => {
    // console.log(values);

    var thumbnailURL: String = "";
    var imgsURL: any[] = [""];

    const getURL = async () => {
      const paramThumbnail = {
        file: values.thumbnail[0].file,
        type: "thumbnail",
      };
      await apiUpload
        .postUploadAvatar(paramThumbnail)
        .then((res) => {
          thumbnailURL = res.data.full_path;
        })
        .catch((e) => console.log(e));

      const imgsFile = values.images.map((item: any) => item.file);

      for (var item of imgsFile) {
        await apiUpload
          .postUploadAvatar({ file: item, type: "place" })
          .then((res) => {
            imgsURL.push(res.data.full_path);
          })
          .catch((e) => console.log(e));
      }

      // console.log(thumbnailURL);
      // console.log(imgsURL);

      const submitParam = {
        address: values.address,
        // img: [
        //   {
        //     name: "string",
        //     url: "string",
        //   },
        // ],
        img: imgsURL.slice(1).map((item: any) => ({
          name: "place",
          url: item,
        })),
        lat: Number(values.lat),
        lng: Number(values.lng),
        name: values.name,
        place_type_id: values.placeType,
        thumbnail: thumbnailURL,
      };

      // console.log(submitParam);

      await apiPlaces
        .postPlace(submitParam)
        .then((res) => {
          toast(res.message);
        })
        .catch((e) => console.log(e));
    };

    getURL();
    // console.log("images ", imgsURL.slice(1));
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        style={{ marginBottom: 16 }}
        type="primary"
        onClick={() => setOpenModal(true)}
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
      <ModalCreatePlace
        open={openModal}
        onSubmit={onSubmit}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
};

export default PlacesMgmt;
