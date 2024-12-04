import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./layoutUser.module.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

import {
  UserOutlined,
  HistoryOutlined,
  LogoutOutlined,
  IdcardOutlined
} from "@ant-design/icons"; //icon dashboards side menu
import { Layout, Menu, theme } from "antd";
import { logoutApi } from "../../../Services/apiServer";
import logo from "../../../assets/iconLogo.png";
import { doLogoutAction } from "../../../Redux/Reducer/UserSlice";
import { toast } from "react-toastify";

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
  // getItem("Thông tin", "Sub1", <UserOutlined />, [
  //   getItem(
  //     <Link to="/user/profile" className="text-decoration-none">
  //       Thông tin cá nhân
  //     </Link>,
  //     "1"
  //   ),
  // ]),
  getItem(
    <Link to="/user" className="text-decoration-none">
      Thông tin 
    </Link>,
    "1",
    <IdcardOutlined />
  ),

  getItem("Lịch sử", "Sub2", <HistoryOutlined />, [
    getItem(
      <Link to="/user/cmt" className="text-decoration-none">
        Binh luận
      </Link>,
      "2"
    ),
    getItem(
      <Link to="/user/historieNews" className="text-decoration-none">
        Bài viết
      </Link>,
      "3"
    ),
  ]),
];

const layoutUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(doLogoutAction());
      navigate("/");
      toast.success("Đăng xuất thành công!");
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
                src={`${user?.user?.avata}`}
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

export default layoutUser;
