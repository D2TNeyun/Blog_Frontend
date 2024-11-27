import classNames from "classnames/bind";
import styles from "./ManagePost.module.scss";
import { useEffect, useState } from "react";
import {
  deletePost,
  getAllPost,
  searchTerm,
} from "../../../../Services/apiServer";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Table, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ManageEmploy = (props) => {
  const [listPosts, setLisPosts] = useState([]);

  const fetchPostsList = async () => {
    try {
      let res = await getAllPost();
      // console.log("Data getAll", res); // Kiểm tra giá trị trả về của getAllPost
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
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (_, record, index) => {
        return <div className={cx("title")}>{record?.title}</div>;
      },
    },
    {
      title: "Thể loại",
      dataIndex: "content",
      key: "content",
      render: (_, record, index) => {
        return (
          <div className={cx("content")}>{record?.category?.categoryName}</div>
        );
      },
      align: "center",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (_, record, index) => {
        return <div className={cx("tags")}>{record?.tag?.tagName}</div>;
      },
      align: "center",
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      render: (_, record, index) => {
        return <div className={cx("views")}>{record?.views}</div>;
      },
      align: "center",
    },
    {
      title: "Người đăng",
      dataIndex: "author",
      key: "author",
      render: (_, record, index) => {
        // console.log(record);
        return <div className={cx("author")}>{record?.appUser?.username}</div>;
      },
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleEditPost(record)}
            style={{ color: "#106cb2", padding: "3px" }}
          />
          <DeleteOutlined
            onClick={() => showModal(record)}
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

  const handleSearch = async (Title) => {
    try {
      if (Title.trim() === "") {
        toast.warning("Từ khoá tìm kiếm không được để trống!");
        return;
      } else {
        const res = await searchTerm(Title);
        if (res && res.posts) {
          setLisPosts(res.posts);
        } else {
          toast.info("Không tìm thấy bài viết phù hợp.");
          setLisPosts([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const [searchTitle, setSearchTitle] = useState("");

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTitle);
    }
  };

  //handle edit
  const navigate = useNavigate();
  const handleEditPost = (record) => {
    navigate(`/admin/edit-post/${record.postID}`);
  };

  //modalDele
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (record) => {
    setIsModalOpen(true);
    setRecord(record);
  };
  const handleDelete = async () => {
    if (!record || !record.postID) {
      toast.error("Có lỗi xảy ra! Không tìm thấy thể loại để xóa.");
      return;
    }
    const { postID } = record;
    try {
      let result = await deletePost(postID);
      if (result && result.message) {
        toast.success("Xóa thể loại thành công!");
        setIsModalOpen(false);
        fetchPostsList();
      } else {
        toast.error("Xóa thể loại thất bại!");
      }
    } catch (error) {
      console.log(error);
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
                  onKeyDown={handleDown}
                  onChange={handleInputChange}
                  name=""
                  id="search"
                  placeholder="Tìm kiếm..."
                  autoComplete="off"
                />
                <label
                  htmlFor="search"
                  className={cx("iconSearch")}
                  onClick={() => handleSearch(searchTitle)}
                >
                  <SearchOutlined />
                </label>
              </div>
            </div>
            <Link to="/admin/addPost" className="text-decoration-none">
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
            rowKey="title"
            dataSource={listPosts}
          />
          <Modal
            title="Xóa thể loại "
            open={isModalOpen}
            onOk={handleDelete}
            onCancel={handleCancel}
            okButtonProps={{ style: { backgroundColor: "red" } }}
          >
            <div className="mb-3 mt-4">
              <p>Bạn chắc chắn muốn xóa thể loại: <b>{record?.title}</b></p>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ManageEmploy;
