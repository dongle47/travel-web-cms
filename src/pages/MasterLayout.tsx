import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";

import PlacesMgmt from "../feature/PlacesMgmt/PlacesMgmt";
import UpdatePlace from "../feature/PlacesMgmt/UpdatePlace";

import {
  AppstoreAddOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import PlaceTypes from "../feature/PlaceTypesMgmt/PlaceTypesMgmt";
import TestUpload from "../feature/PlacesMgmt/TestUpload";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../feature/Auth/authSlice";

const { Header, Sider, Content } = Layout;

const MasterLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const itemsMenu = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
      link: "/",
    },
    {
      key: "2",
      icon: <AppstoreAddOutlined />,
      label: "Loại địa điểm",
      link: "/place-types",
    },
    {
      key: "3",
      icon: <EnvironmentOutlined />,
      label: "Địa điểm",
      link: "/places",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Test upload",
      link: "/test-upload",
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {itemsMenu?.map((item: any) => (
            <Menu.Item key={item.key}>
              {item.icon}
              <span>{item.label}</span>
              <Link to={item.link} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "1rem 1rem",
            padding: 24,
            minHeight: 500,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="places" element={<PlacesMgmt />} />
            <Route path="places/:id" element={<UpdatePlace />} />
            <Route path="place-types" element={<PlaceTypes />} />
            <Route path="test-upload" element={<TestUpload />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MasterLayout;
