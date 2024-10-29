import classNames from "classnames/bind";
import styles from "./ManageEmploy2.module.scss";
import { useEffect, useState } from "react";
import {
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Table, Space, Tag } from "antd";
import { getAllUser } from "../../../Services/apiServer";

const cx = classNames.bind(styles);

const ManageEmploy2 = (props) => {
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
        let color = roles.includes("Admin") ? "blue": roles.includes("Employee")? "orange": "green";

        let text = roles.includes("Admin") ? "Admin": roles.includes("Employee")? "Nhân viên": "Đọc giả";
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
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Nhân viên",
          value: "Employee",
        },
      ],
      onFilter: (value, record) => record.roles.includes(value),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { isActives, index }) => {
        let color = isActives.includes("Y")  ? "blue" : isActives.includes("D")  ? "red" : "green";
        let text = isActives.includes("Y") ? "Active" : isActives.includes("D") ? "Deleted" : "Blocked";

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
      ],
      onFilter: (value, record) => record.isActives.includes(value),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record, index) => (
    //     <Space size="middle">
    //       <EditOutlined
    //         onClick={() => handleEdit(record)}
    //         style={{ color: "#106cb2", padding: "3px" }}
    //       />
    //       <DeleteOutlined
    //         onClick={() => handleDelete(record)}
    //         style={{ color: "#d12323", padding: "3px" }}
    //       />
    //     </Space>
    //   ),
    //   align: "center",
    // },
  ];

  const [pagination, setPagination] = useState({}); // phan trang
  function handleTableChange(data) {
    setPagination(data);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("Title")}>
          <div className={cx("b-Title")}>Danh sach nhan vien </div>
        </div>
        <div className={cx("ContentPage")}>
          <div className={cx("headerListUser")}>
            <div className={cx("searchGroup")}>
              <div className={cx("searchBorder")}>
                <input
                  type="text"
                  className={cx("inputSearch")}
                  onKeyDown={handleKeyDown}
                  name=""
                  id="search"
                  placeholder="Tìm kiếm..."
                  autoComplete="off"
                />
                <label htmlFor="search" className={cx("iconSearch")}>
                  <SearchOutlined />
                </label>
              </div>
            </div>
            {/* onClick={() => showModal()} */}
            <button className={cx("btnAddUser")}>Thêm người dùng</button>
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
              listUser &&
              listUser.filter((user) => user.roles.includes("Admin") || user.roles.includes("Employee"))
            }
          />
        </div>
      </div>
    </>
  );
};

export default ManageEmploy2;
