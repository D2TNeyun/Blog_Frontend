import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { useEffect, useState } from "react";
import { deleteUser, getAllUser, searchUser } from "../../../../Services/apiServer";
import {
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Table, Space, Tag } from "antd";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ManageEmploy = (props) => {
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
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleEdit(record)}
            style={{ color: "#106cb2", padding: "3px" }}
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            style={{ color: "#d12323", padding: "3px" }}
          />
        </Space>
      ),
      align: "center",
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

  //modal delete user
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteUserName, setDeleteUser] = useState(null);
  const handleDelete = (user) => {
    setShowModalDelete(true);
    setDeleteUser(user);
  };
  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
    setDeleteUser(null);
  };
  const handleDeleteUser = async () => {
    try {
      if (deleteUserName && deleteUserName.id) {
        let res = await deleteUser(deleteUserName.id);
        if (res && res.message) {
          toast.success("Xóa người dùng thành công!");
          handleCloseModalDelete();
          fetchUserList();
        } else {
          toast.error("Xóa người dùng thất bại!");
        }
      } else {
        toast.error("Người dùng không hợp lệ!");
      }
    } catch (error) {
      toast.error("Xóa người dùng thất bại!");
      console.log("Failed to delete user: ", error);
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
          {/* Modal xoa user */}
          <Modal
            title="Xóa người dùng"
            open={showModalDelete}
            onOk={handleDeleteUser}
            onCancel={handleCloseModalDelete}
            width={520}
          >
            <p>
              Bạn có chắc muốn xóa người dùng này?{" "}
              <b>{deleteUserName ? deleteUserName.username : ""}</b>
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ManageEmploy;
