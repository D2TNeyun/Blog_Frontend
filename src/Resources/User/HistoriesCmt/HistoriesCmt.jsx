import classNames from "classnames/bind";
import styles from "./HistoriesCmt.module.scss";
import { useEffect, useState } from "react";
import {
  deleteComment,
  getAllPost,
  getComments,
  putComment,
} from "../../../Services/apiServer";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Table, Space } from "antd";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
const HistoriesCmt = () => {
  const [listPosts, setListPosts] = useState([]);
  const [listCmt, setListCmt] = useState([]);
  const userId = useSelector((state) => state.user?.user?.user?.id);

  // Fetch data from API
  const fetchPostsList = async () => {
    try {
      const res = await getAllPost();
      if (res && Array.isArray(res.posts)) {
        setListPosts(res.posts);
      } else {
        console.error("Unexpected structure for posts:", res);
        setListPosts([]);
      }
    } catch (error) {
      console.error("Failed to fetch post list:", error);
      setListPosts([]);
    }
  };
  const fetchCommet = async () => {
    try {
      let data = await getComments();
      if (data && data.comments) {
        setListCmt(data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments list:", error);
      setListCmt([]);
    }
  };

  useEffect(() => {
    fetchCommet();
    fetchPostsList();
  }, []);

  // // Lọc lịch sử an toàn dựa trên userId
  const userHistories = Array.isArray(listCmt)
    ? listCmt.filter((history) => history.appUserID === userId)
    : [];
  //   console.log("cmtidUs", userHistories);

  // trình bày dữ liệu hiển thị
  const displayHistories = userHistories.map((history) => {
    const matchedPost = listPosts.find(
      (post) => post.postID === history.postId
    );
    return {
      ...history,
      post: matchedPost,
    };
  });

  // Tạo table hiển thị lịch sử
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
      dataIndex: "post",
      key: "post",
      render: (post) => {
        return post?.title;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleEditContent(record)}
            style={{ color: "#106cb2", padding: "3px" }}
          />
          <DeleteOutlined
            onClick={() => handleShowDelete(record)}
            style={{ color: "#d12323", padding: "3px" }}
          />
        </Space>
      ),
      align: "center",
    },
  ];

  //modal edit comment
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editContent, setEditContent] = useState({
    id: "",
    content: "",
  });

  // Show modal and set content to be edited
  const handleEditContent = (record) => {
    setShowModalEdit(true);
    setEditContent({
      id: record.commentId,
      content: record.content,
    });
    console.log(record);
  };

  // Handle cancel button
  const handleCancel = () => {
    setShowModalEdit(false);
    setEditContent({
      id: "",
      content: "",
    });
  };

  // Handle saving edited content
  const handleOk = async () => {
    const content = editContent.content;
    const id = editContent.id;
    try {
      const res = await putComment(id, content);
      if (res.commentId) {
        fetchCommet();
        toast.success("Chỉnh sửa thành công!");
        setShowModalEdit(false);
      } else {
        console.error("Failed to update comment:", res);
        toast.error("Chỉnh sửa thất bại!");
      }
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };
  //modal delete comment
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [delContent, setDelContent] = useState({
    id: "",
  });
  const handleShowDelete = (record) => {
    setShowModalDelete(true);
    setDelContent({
      id: record.commentId,
    });
    console.log(record);
  };
  const handleCancelDelete = () => {
    setShowModalDelete(false);
  };
  const handleOkDelete = async () => {
    try {
      const res = await deleteComment(delContent.id);
      if (res.message) {
        fetchCommet();
        toast.success("Xóa bình luận thành công!");
        setShowModalDelete(false);
      } else {
        console.error("Failed to delete comment:", res);
        toast.error("Xóa bình luận thất bại!");
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const [pagination, setPagination] = useState({}); // phan trang
  function handleTableChange(data) {
    setPagination(data);
  }

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("Title")}>
          <div className={cx("b-Title")}>Lịch sử bình luận</div>
        </div>
        <div className={cx("ContentPage")}>
          <div className={cx("Content")}>
            <Table
              columns={columns}
              dataSource={displayHistories}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
              }}
              onChange={handleTableChange}
              rowKey="content"
            />

            {/* "Sửa bình luận" */}
            <Modal
              title="Sửa bình luận"
              open={showModalEdit}
              onOk={handleOk}
              onCancel={handleCancel}
              okButtonProps={{ style: { backgroundColor: "#4caf50" } }}
            >
              <div className={cx("formGroup")}>
                <textarea
                  className={cx("form-control")}
                  placeholder="Nội dung bình luận"
                  value={editContent.content}
                  onChange={(e) =>
                    setEditContent({ ...editContent, content: e.target.value })
                  }
                />
              </div>
            </Modal>

            {/* "Xóa bình luận" */}
            <Modal
              title="Xóa bình luận"
              open={showModalDelete}
              onOk={handleOkDelete}
              onCancel={handleCancelDelete}
              okButtonProps={{ style: { backgroundColor: "#d12323" } }}
            >
              <div className={cx("modal-body")}>
                <p>Bạn chắc chắn muốn xóa bình luận này?</p>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoriesCmt;
