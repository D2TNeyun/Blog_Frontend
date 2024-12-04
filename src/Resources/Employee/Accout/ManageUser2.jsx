import classNames from "classnames/bind";
import styles from "./ManageEmploy2.module.scss";
import { useEffect, useState } from "react";

import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FaUser, FaLock, FaUserCog } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { Modal, Table, Space, Tag } from "antd";
import { toast } from "react-toastify";
import {
  deleteUser,
  getAllUser,
  PuteditUser,
  searchUser,
} from "../../../Services/apiServer";

const cx = classNames.bind(styles);

const ManageUser2 = (props) => {
  const [listUser, setListUser] = useState([]);

  const fetchUserList = async () => {
    try {
      let res = await getAllUser();
      console.log("Data getAll", res); // Kiểm tra giá trị trả về của getAllUser
      if (res && res.users) {
        setListUser(res.users);
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      render: (_, record, index) => {
        return <div className={cx("userName")}>{record?.username}</div>;
      },
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record, index) => {
        return <div className={cx("emailUser")}>{record?.email}</div>;
      },
      align: "center",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (_, { roles, index }) => {
        let color = roles.includes("Admin") // roles la mot mang
          ? "blue"
          : roles.includes("Employee")
          ? "orange"
          : "green";

        let text = roles.includes("Admin")
          ? "Admin"
          : roles.includes("Employee")
          ? "Nhân viên"
          : "Đọc giả";
        return (
          <div className={cx("roleUser")}>
            <Tag
              key={index + 1}
              style={{ width: "75px", textAlign: "center" }}
              color={color}
            >
              {text}
            </Tag>
          </div>
        );
      },
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { isActives, index }) => {
        let color = isActives.includes("Y")
          ? "blue"
          : isActives.includes("D")
          ? "red"
          : "green";
        let text = isActives.includes("Y")
          ? "Active"
          : isActives.includes("D")
          ? "Deleted"
          : "Blocked";

        return (
          <Tag
            key={index + 1}
            style={{ width: "75px", textAlign: "center" }}
            color={color}
          >
            {text}
          </Tag>
        );
      },
      align: "center",
      filters: [
        {
          text: "Active",
          value: "Y",
        },
        {
          text: "Deleted",
          value: "D",
        },
        {
          text: "Blocked",
          value: "B",
        },
      ],
      onFilter: (value, record) => record.isActives.includes(value),
    },
  ];

  const [pagination, setPagination] = useState({}); // phan trang
  function handleTableChange(data) {
    setPagination(data);
  }

  const handleSearch = async (UserName) => {
    try {
      if (UserName.trim() === "") {
        toast.warning("Từ khóa tìm kiếm không được để trống!");
        return;
      } else {
        let res = await searchUser(UserName);
        console.log("Data search", res); // Kiểm tra giá trị trả về của getAllUser
        if (res && res.users) {
          setListUser(res.users);
        } else {
          toast.error(
            "Không tìm thấy người dùng nào phù hợp với từ khóa tìm kiếm!"
          );
          setListUser([]);
        }
      }
    } catch (error) {
      console.log("Failed to search user: " + error);
    }
  };

  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchInput);
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("Title")}>
          <div className={cx("b-Title")}>Danh sach doc gia </div>
        </div>
        <div className={cx("ContentPage")}>
          <div className={cx("headerListUser")}>
            <div className={cx("searchGroup")}>
              <div className={cx("searchBorder")}>
                <input
                  type="text"
                  className={cx("inputSearch")}
                  onKeyDown={handleDown}
                  onChange={handleInputChange}
                  name=""
                  id="search"
                  placeholder="Tìm kiếm..."
                  autoComplete="off"
                />
                <label
                  htmlFor="search"
                  onClick={() => handleSearch(searchInput)}
                  className={cx("iconSearch")}
                >
                  <SearchOutlined />
                </label>
              </div>
            </div>
          </div>
          <Table
            className="mt-4"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15"],
            }}
            onChange={handleTableChange}
            columns={columns}
            rowKey="email"
            dataSource={
              listUser && listUser.filter((user) => user.roles.includes("User"))
            }
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser2;
