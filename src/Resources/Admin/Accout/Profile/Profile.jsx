import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { getUserById, PuteditUser } from "../../../../Services/apiServer";
import { useSelector } from "react-redux";
import { FaUser, FaLock, FaUserCog } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import LogoImage from "../../../../assets/image-gallery.png";
import { Modal, Table, Space, Tag, Avatar } from "antd";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";
const cx = classNames.bind(styles);

const Profile = (props) => {
  // States for user data, avatar preview, and errors
  const [dataUser, setDataUser] = useState(null);
  const [errors, setErrors] = useState({});
  // Get current user ID from Redux state
  const userId = useSelector((state) => state.user?.user?.user?.id);

  // Fetch user details from API
  const fetchUser = async () => {
    try {
      const res = await getUserById(userId);
      if (res?.user) {
        setDataUser(res.user);
        console.log(res.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Handle edit button click
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
    setErrors({});
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
        StatusName,
        Image
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
  //uuload avata
  const [preview, setPreview] = useState("");
  const [Image, setImage] = useState(null);
  const handleUploadAvatar = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      // setPreview("");
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
                src={dataUser?.avata || "https://png.pngtree.com/png-clipart/20190903/original/pngtree-more-photo-icons-png-image_4419912.jpg"}
                alt="profile"
                className={cx("Image", { fallback: !dataUser?.avata })}
              />
            </div>
          </div>
          <div className={cx("ProfileInfo")}>
            <div className="card mb-4 mb-lg-0 border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <p className={cx("textProfile")}>Username</p>
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
                  Cập nhật
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
                      className={`${cx("groupForm3")} ${
                        errors && errors.Role ? "border-danger" : ""
                      }`}
                    >
                      <label htmlFor="userRole" className={cx("iconInputForm")}>
                        <FaUser />
                      </label>
                      <select
                        disabled
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
                      className={`${cx("groupForm3")} ${
                        errors && errors.StatusName ? "border-danger" : ""
                      }`}
                    >
                      <label htmlFor="active" className={cx("iconInputForm")}>
                        <HiStatusOnline />
                      </label>
                      <select
                        disabled
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

                  {/* hình ảnh */}
                  <div className={`${errors && errors.Email ? "" : "mb-4"}`}>
                    <div
                      className={`${cx("groupForm2")} ${
                        errors && errors.Email ? "border-danger" : ""
                      }`}
                    >
                      <label
                        className={cx("label-upload")}
                        htmlFor="labelUpload"
                      >
                        <FcPlus /> Upload Avatar
                      </label>
                      <input
                        type="file"
                        hidden
                        id="labelUpload"
                        onChange={(event) => handleUploadAvatar(event)}
                      />
                      <div className={cx("img-preview")}>
                        {preview ? (
                          <img className={cx("preview")} src={preview} />
                        ) : (
                          <img className={cx("LogoImage")} src={LogoImage} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
