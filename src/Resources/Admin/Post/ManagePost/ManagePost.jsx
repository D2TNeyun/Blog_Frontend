import classNames from "classnames/bind";
import styles from "./ManagePost.module.scss";
import { useEffect, useState } from "react";
import { getAllPost } from "../../../../Services/apiServer";
import {
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const cx = classNames.bind(styles);

const ManageEmploy = (props) => {
  const [listPosts, setLisPosts] = useState([]);

  const fetchPostsList = async () => {
    try {
      let res = await getAllPost();
      console.log("Data getAll", res); // Kiểm tra giá trị trả về của getAllPost
      if (res && res.posts) {
        setLisPosts(res.posts);
      }
    } catch (error) {
      console.error("Failed to fetch post list:", error);
    }
  };

  useEffect(() => {
    fetchPostsList();
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
          <div className={cx("headerListPost")}>
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
            <button className={cx("btnAddPost")} >
              Thêm tin tức
            </button>
          </div>
          <table className={cx("table", "table-hover", "table-bordered")}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Thể loại</th>
                <th scope="col">Tác Giả</th>
                <th scope="col">Ngày đăng</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listPosts && listPosts.length > 0 ? (
                listPosts
                  .map((post, i) => (
                    <tr key={`${post.postID}-${i}`}>
                      <td>{i + 1}</td>
                      <td>{post.title}</td>
                      <td>{post.category?.categoryName}</td>
                      <td>{post.appUser?.username}</td>
                      <td>{post.publishedDate}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5">No post found</td>
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
