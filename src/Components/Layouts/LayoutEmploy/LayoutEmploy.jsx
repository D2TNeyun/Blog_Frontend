import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./LayoutEmploy.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, theme } from "antd";
import { logoutApi } from "../../../Services/apiServer";

import {
  DashboardOutlined,
  UserOutlined,
  ProjectOutlined,
  WechatOutlined,
  LogoutOutlined,
  IdcardOutlined,
} from "@ant-design/icons"; //icon dashboards side menu
import logo from "../../../assets/iconLogo.png";
import { doLogoutAction } from "../../../Redux/Reducer/UserSlice";

const cx = classNames.bind(styles);
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const itemsSlider = [
  getItem(
    <Link to={"/"}>
      <p
        style={{
          fontWeight: "bold",
          fontFamily: "'Reem Kufi', sans-serif",
          display: "inline-block",
          transform: "translate(0, 7px)",
          fontSize: "16px",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        NEWs Can Tho
      </p>
    </Link>,
    "0",
    <img
      className="m-0"
      style={{
        width: "30px",
        display: "inline-block",
      }}
      src={logo}
      alt=""
    />
  ),
  getItem(
    <Link to="/employ" className="text-decoration-none">
      Dashboard
    </Link>,
    "1",
    <DashboardOutlined />,
    []
  ),
  getItem("Tài Khoản", "Sub1", <UserOutlined />, [
    getItem(
      <Link to="/employ/manageEmploy" className="text-decoration-none">
        Nhân viên
      </Link>,
      "2"
    ),
    getItem(
      <Link to="/employ/manageUser" className="text-decoration-none">
        Đọc giả
      </Link>,
      "3"
    ),
  ]),

  getItem("Bài đăng", "Sub2", <ProjectOutlined />, [
    getItem(
      <Link to="/employ/managePost" className="text-decoration-none">
        Danh sách bài đăng
      </Link>,
      "4"
    ),
  ]),

  getItem("Chat", "Sub3", <WechatOutlined />, [
    getItem(
      <Link to="/employ/chat" className="text-decoration-none">
        Phòng chat
      </Link>,
      "5"
    ),
  ]),

  getItem("Phản hồi", "Sub4", <WechatOutlined />, [
    getItem(
      <Link to="/employ/cmt" className="text-decoration-none">
        Phòng chat
      </Link>,
      "6"
    ),
  ]),

  getItem("Thông tin", "Sub5", <IdcardOutlined />, [
    getItem(
      <Link to="/employ/profile" className="text-decoration-none">
        Thông tin cá nhân
      </Link>,
      "7"
    ),
  ]),
];

const LayoutEmploy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await logoutApi();
      // localStorage.removeItem("token");
      dispatch(doLogoutAction());
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const items = [
    {
      label: (
        <p className="m-0">
          <LogoutOutlined /> Đăng xuất
        </p>
      ),
      key: "0",
      onClick: handleLogout,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={itemsSlider}
          />
        </Sider>
        <Layout>
          <Header className={cx("headerAdminLayout")}>
            <div className={cx("infoUser")}>
              <img
                className={cx("imgAvatar")}
                src={`${user?.user?.avatar}`}
                alt=""
              />
              <Dropdown
                menu={{
                  items,
                }}
                placement="top"
              >
                <Button> {user?.user?.username || ""}</Button>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ backgroundColor: "#F0F3F" }}>
            <div>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutEmploy;
