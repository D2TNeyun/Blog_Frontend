import classNames from "classnames/bind";
import styles from "./ManagePost.module.scss";
import { useEffect, useState } from "react";
import { getAllPost } from "../../../../Services/apiServer";
import {
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Table, Space, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const ManagePostByEmploy = (props) => {
  const [listPosts, setLisPosts] = useState([]);
  const idUser = useSelector((state) => state.user.user.user.id);
  console.log("id", idUser);

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
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  const [pagination, setPagination] = useState({}); // phan trang
  function handleTableChange(data) {
    setPagination(data);
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => {
        return <span key={index}>{index + 1}</span>;
      },
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (_, record, index) => {
        return (
          <div className={cx("title")}>
            {record?.title}
          </div>
        );
      },
    },
    {
      title: "Thể loại",
      dataIndex: "cate",
      key: "cate",
      render: (_, record, index) => {
        return (
          <div
            className={cx("cate")}
          >
            {record?.category?.categoryName}
          </div>
        );
      },
      align: "center",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (_, record, index) => {
        return (
          <div className={cx("tag")}>
            {record?.tag?.tagName}
          </div>
        );
      },
      align: "center",
    },
    {
      title: "Người đăng",
      dataIndex: "author",
      key: "author",
      render: (_, record, index) => {
        return (
          <div className={cx("author")} >
            {record?.appUser?.username}
          </div>
        );
      },
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle" key={`action-${record?.postID}`}>
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
            <Link to="/employ/addPost" className="text-decoration-none">
              <button type="button" className={cx("btnAddService")}>
                Tạo bài viết
              </button>
            </Link>
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
            rowKey="postID" 
            dataSource={
              listPosts &&
              listPosts.filter((posts) => posts?.appUser.id === idUser)
            }
          />
        </div>
      </div>
    </>
  );
};

export default ManagePostByEmploy;
