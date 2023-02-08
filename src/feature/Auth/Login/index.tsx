import { Col, Row, Form, Input, Button } from "antd";
import Typography from "antd/es/typography/Typography";
import * as React from "react";

import logo from "../../../assets/imgs/logo.png";
import { useActionData, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { authActions } from "../authSlice";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<{ name: string; age: number }>();

  const username = Form.useWatch("username", form);
  const password = Form.useWatch("password", form);

  const handleLogin = () => {
    // dispatch(authActions.login);
    navigate("/");
  };

  return (
    <Row justify="center" align="middle" className="bg-secondary vw-100 vh-100">
      <Col span={8}>
        <img
          style={{ display: "block", margin: "0 auto 2rem auto" }}
          height={80}
          src={logo}
          alt=""
        />

        <div className="bg-white w-100 h-100 rounded p-5 d-flex flex-column align-items-center">
          <Typography className="h4">Đăng nhập Travel CMS</Typography>
          <Form
            className="w-100"
            form={form}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item name="username" label="Tên đăng nhập">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Mật khẩu">
              <Input />
            </Form.Item>

            <Button
              style={{ height: "2.5rem" }}
              className="w-100"
              type="primary"
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
