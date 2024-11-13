import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { getUserById, PuteditUser } from "../../../../Services/apiServer";
import { useSelector } from "react-redux";

import { FaUser, FaLock, FaUserCog } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

import { Modal, Table, Space, Tag } from "antd";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

const Profile = (props) => {
  const [dataUser, setDataUser] = useState("");
  const id = useSelector((state) => state.user?.user?.user?.id);
  // Fetch user data from API
  const fetchUser = async () => {
    try {
      const res = await getUserById(id);
      if (res && res.user) {
        setDataUser(res.user);
        console.log(res.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  //modal edit user
  const [errors, setErrors] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editUser, setEditUser] = useState({
    id: null,
    username: "",
    password: "",
    email: "",
    roles: [],
    isActives: [],
  });

  const handleEdit = (datauser) => {
    setShowModalEdit(true);
    setEditUser({
      id: datauser.id,
      username: datauser.username,
      password: datauser.password,
      email: datauser.email,
      roles: Array.isArray(datauser.roles) ? datauser.roles : [datauser.roles], // Ensure roles is always an array
      isActives: Array.isArray(datauser.isActives)
        ? datauser.isActives
        : [datauser.isActives],
    });
    console.log("Successfully", datauser);
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
      if (updateUser && updateUser.message) {
        toast.success("Cập nhật thành công!");
        handleCloseModalEdit();
        fetchUser();
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
      <div className={cx("PageContainer")}>
        <div className={cx("Title")}>
          <div className={cx("b-Title")}>Thông tin cá nhân </div>
        </div>
        <div className={cx("ProfileContainer")}>
          <div className={cx("ProfileImage")}>
            {/* <img src={dataUser?.avatar} alt="Profile" /> */}
            <div className={cx("Preview")}>
              <img
                src={dataUser?.avata}
                alt="profile"
                className={cx("Image")}
              />
            </div>
          </div>
          <div className={cx("ProfileInfo")}>
            <div className="card mb-4 mb-lg-0 border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <p className={cx("textProfile")}>Full Name</p>
                  </div>
                  <div className="col-sm-8">
                    <p className={cx("textProfile")}>{dataUser?.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className={cx("textProfile")}>Email</p>
                  </div>
                  <div className="col-sm-8">
                    <p className={cx("textProfile")}>{dataUser?.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className={cx("textProfile")}>Vai trò</p>
                  </div>
                  <div className="col-sm-8">
                    <p className={cx("textProfile")}>{dataUser?.roles}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className={cx("textProfile")}>Trạng thái tài khoản</p>
                  </div>
                  <div className="col-sm-8">
                    <div className={cx("textProfile")}>
                      <button className={cx("active")}>
                        {dataUser?.isActives?.includes("Y") ? "Yes" : "Block"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="button">
                <button
                  className={cx("btn-update")}
                  onClick={() => handleEdit(dataUser)}
                >
                  update profile
                </button>
              </div>
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
                      <label
                        htmlFor="editUsername"
                        className={cx("iconInputForm")}
                      >
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
                  <div
                    className={`${errors && errors.StatusName ? "" : "mb-4"}`}
                  >
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
                          setEditUser({
                            ...editUser,
                            isActives: [e.target.value],
                          })
                        }
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="Y">Active</option>
                        <option value="B">Blocked</option>
                        <option value="D">Deleted</option>
                      </select>
                    </div>
                    {errors && (
                      <p className={cx("error")}>{errors.StatusName}</p>
                    )}
                  </div>
                </div>
              </Modal>
            </div>
          </div>  
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12"></div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
