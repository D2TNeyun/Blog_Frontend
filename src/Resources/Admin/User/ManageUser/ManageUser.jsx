import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../../Services/apiServer";
import {
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSearch(e.target.value)
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
            <button className={cx("btnAddUser")} >
              Thêm người dùng
            </button>
          </div>
          <table className={cx("table", "table-hover", "table-bordered")}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser.length > 0 ? (
                listUser
                  .filter((user) => user.roles.includes("User"))
                  .map((user, i) => (
                    <tr key={`${user.id}-${i}`}>
                      <td>{i + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.roles}</td>
                      <td>{user.isActive ? "Active" : "Inactive"}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5">No user found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageEmploy;
