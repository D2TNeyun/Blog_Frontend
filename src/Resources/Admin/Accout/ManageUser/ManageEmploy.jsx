import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { useEffect, useState } from "react";
import {
  AddUser,
  getAllUser,
  searchUser,
  deleteUser,
  PuteditUser,
} from "../../../../Services/apiServer";
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
        let color = roles.includes("Admin")
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
          text: "Blocked",
          value: "B",
        },
        {
          text: "Deleted",
          value: "D",
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

  //modal adduser
  const [showModal, setShowModal] = useState(false);
  const handleAddUser = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
    setEmail("");
    setUserName("");
    setPassword("");
    setRole("");
  };

  const [Role, setRole] = useState("");
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const SubmitOkAddUser = async () => {
    const newErr = {};

    if (UserName.trim() === "") {
      newErr.UserName = "Tên đăng nhập không được để trống";
    }
    if (Password.trim() === "") {
      newErr.Password = "Mật khẩu không được để trống";
    } else if (Password.length < 6) {
      newErr.Password = "Mật khẩu phải ít nhất 6 ký tự";
    }
    if (Email.trim() == "") {
      newErr.Email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErr.Email = "Email không đúng định dạng";
    }
    if (!Role) {
      newErr.Role = "Vui lòng chọn quyền người dùng";
    }
    if (Object.keys(newErr).length > 0) {
      setErrors(newErr);
      return;
    }
    try {
      let user = await AddUser(UserName, Email, Password, Role);
      if (user && user.message) {
        toast.success("Thêm người dùng thành công!");
        handleCloseModal();
        fetchUserList();
      } else {
        toast.error("Thông tin người dùng đã tồn tại!");
      }
    } catch (error) {
      toast.error("Thêm người dùng thất bại!");
      console.log("Failed to add user: " + error);
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

  //modal edit user
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    password: "",
    email: "",
    roles: [],
    isActives: [],
  });

  const handleEdit = (record) => {
    setShowModalEdit(true);
    setEditUser({
      id: record.id,
      username: record.username,
      password: record.password,
      email: record.email,
      roles: Array.isArray(record.roles) ? record.roles : [record.roles], // Ensure roles is always an array
      isActives: Array.isArray(record.isActives)
        ? record.isActives
        : [record.isActives],
    });
    console.log("Successfully", record);
  };
  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
    setEditUser({
      id: null,
      username: "",
      password: "",
      email: "",
      roles: [],
      isActives: [],
    });
  };

  const handleOk = async () => {
    const newErr = {};

    if (editUser.username.trim() === "") {
      newErr.UserName = "Tên đăng nhập không được để trống";
    }
    if (editUser.email.trim() === "") {
      newErr.Email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
      newErr.Email = "Email không đúng định dạng";
    }

    if (Object.keys(newErr).length > 0) {
      setErrors(newErr);
      return;
    }
    const UserName = editUser.username;
    const Email = editUser.email;
    const Role = editUser.roles;
    const StatusName = editUser.isActives;
    try {
      let updateUser = await PuteditUser(
        editUser.id,
        UserName,
        Email,
        Role,
        StatusName
      );
      if (updateUser &&  updateUser.message) {
        toast.success("Cập nhật thành công!");
        handleCloseModalEdit();
        fetchUserList();
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.error(error);
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
            <button className={cx("btnAddUser")} onClick={handleAddUser}>
              Thêm người dùng
            </button>
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
              listUser.filter(
                (user) =>
                  user.roles.includes("Admin") ||
                  user.roles.includes("Employee")
              )
            }
          />

          {/* modal add user */}
          <Modal
            title="Thêm người dùng"
            open={showModal}
            onOk={SubmitOkAddUser}
            onCancel={handleCloseModal}
            width={520}
            centered
          >
            <div className={cx("formGroup")}>
              <div className={`${errors && errors.UserName ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.UserName ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="Username" className={cx("iconInputForm")}>
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    className={cx("inputForm")}
                    name="Username"
                    id="Username"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete="off"
                    placeholder="Username"
                  />
                </div>
                {errors && <p className={cx("error")}>{errors.UserName}</p>}
              </div>

              <div className={`${errors && errors.Email ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.Email ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="Email" className={cx("iconInputForm")}>
                    <MdEmail />
                  </label>
                  <input
                    type="text"
                    className={cx("inputForm")}
                    name="Email"
                    id="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    placeholder="Email"
                  />
                </div>
                {errors && <p className={cx("error")}>{errors.Email}</p>}
              </div>

              <div className={`${errors && errors.Password ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.Password ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="Password" className={cx("iconInputForm")}>
                    <FaLock />
                  </label>
                  <input
                    type="text"
                    className={cx("inputForm")}
                    name="Password"
                    id="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Password"
                  />
                </div>
                {errors && <p className={cx("error")}>{errors.Password}</p>}
              </div>

              <div className={`${errors && errors.Role ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.Role ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="Role" className={cx("iconInputForm")}>
                    <FaUserCog />
                  </label>
                  <select
                    name="Role"
                    id="Role"
                    className={cx("inputForm")}
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="User">User</option>
                  </select>
                </div>
                {errors && <p className={cx("error")}>{errors.Role}</p>}
              </div>
            </div>
          </Modal>
          {/* modal delete user */}
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

          {/* modal update user */}
          <Modal
            title="Chỉnh sửa User"
            open={showModalEdit}
            onOk={handleOk}
            onCancel={handleCloseModalEdit}
            okButtonProps={{ style: { backgroundColor: "#4caf50" } }}
          >
            <div className={cx("formGroup")}>
              {/* Username Input */}
              <div className={`${errors && errors.UserName ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.UserName ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="editUsername" className={cx("iconInputForm")}>
                    <FaUser />
                  </label>
                  <input
                    type="text"
                    className={cx("inputForm")}
                    name="editUsername"
                    id="editUsername"
                    value={editUser.username}
                    onChange={(e) =>
                      setEditUser({ ...editUser, username: e.target.value })
                    }
                    autoComplete="off"
                    placeholder="Username"
                  />
                </div>
                {errors && <p className={cx("error")}>{errors.UserName}</p>}
              </div>

              {/* Email Input */}
              <div className={`${errors && errors.Email ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.Email ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="editmail" className={cx("iconInputForm")}>
                    <MdEmail />
                  </label>
                  <input
                    type="email"
                    className={cx("inputForm")}
                    name="editmail"
                    id="editmail"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                    autoComplete="off"
                    placeholder="Email"
                  />
                </div>
                {errors && <p className={cx("error")}>{errors.Email}</p>}
              </div>

              {/* Role Select */}
              <div className={`${errors && errors.Role ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.Role ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="userRole" className={cx("iconInputForm")}>
                    <FaUser />
                  </label>
                  <select
                    name="userRole"
                    id="userRole"
                    className={cx("inputForm")}
                    value={editUser.roles[0] || ""} 
                    onChange={(e) =>
                      setEditUser({ ...editUser, roles: [e.target.value] })
                    } 
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="User">User</option>
                  </select>
                </div>
                {errors && <p className={cx("error")}>{errors.Role}</p>}
              </div>

              {/* Active Status Select */}
              <div className={`${errors && errors.StatusName ? "" : "mb-4"}`}>
                <div
                  className={`${cx("groupForm")} ${
                    errors && errors.StatusName ? "border-danger" : ""
                  }`}
                >
                  <label htmlFor="active" className={cx("iconInputForm")}>
                    <HiStatusOnline />
                  </label>
                  <select
                    name="active"
                    id="active"
                    className={cx("inputForm")}
                    value={editUser.isActives[0] || ""} 
                    onChange={(e) =>
                      setEditUser({ ...editUser, isActives: [e.target.value] })
                    } 
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="Y">Active</option>
                    <option value="B">Blocked</option>
                    <option value="D">Deleted</option>
                  </select>
                </div>
                {errors && <p className={cx("error")}>{errors.StatusName}</p>}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ManageEmploy;
