import classNames from "classnames/bind";
import styles from "./HistoriesNews.module.scss";
import { getAllPost, viewHistories } from "../../../Services/apiServer";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const HistoriesNews = () => {
  const [historiesNews, setHistoriesNews] = useState([]);
  const [listPosts, setListPosts] = useState([]);
  const userId = useSelector((state) => state.user?.user?.user?.id);

  const fetchHistories = async () => {
    try {
      const data = await viewHistories();
      console.log("Fetched viewHistories:", data);
      if (data && Array.isArray(data.viewHistories)) {
        setHistoriesNews(data.viewHistories);
      } else {
        console.error("Unexpected structure for viewHistories:", data);
        setHistoriesNews([]);
      }
    } catch (error) {
      console.error("Failed to fetch view histories:", error);
      setHistoriesNews([]);
    }
  };

  const fetchPostsList = async () => {
    try {
      const res = await getAllPost();
      console.log("Fetched posts:", res);
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

  useEffect(() => {
    fetchHistories();
    fetchPostsList();
  }, []);

  // Lọc lịch sử an toàn dựa trên userId
  const userHistories = Array.isArray(historiesNews)
    ? historiesNews.filter((history) => history.userId === userId)
    : [];

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

  //handleCick Post
  const navigate = useNavigate();
  const handlePostClick = (postID, title) => {
    navigate(`/posts/${postID}/${title}`);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("Title")}>
        <div className={cx("b-Title")}>Lịch sử xem bài đăng</div>
      </div>
      <div className={cx("ContentPage")}>
        <div className={cx("Content")}>
          <div className={cx("GroupItem")}>
            {displayHistories && displayHistories.length > 0 ? (
              displayHistories.map((item, index) => (
                <div
                  key={index}
                  className={cx("colItem")}
                  onClick={() =>
                    handlePostClick(item.post?.postID, item.post?.title)
                  }
                >
                  {item.post ? (
                    <>
                      <img
                        src={item.post.image || "/default-image.jpg"}
                        alt={item.post.title}
                        className={cx("Image")}
                      />
                      <div className={cx("in4Item")}>
                        <h3 className={cx("Title")}>{item.post.title}</h3>
                        <div className={cx("Desc")}>
                          {item.post.description}
                        </div>
                        <div className={cx("Desc")}>
                          <b>Ngày cập nhật:</b>
                          {moment(item.post.publishedDate).format("DD/MM/YYYY")}
                        </div>
                        <div className={cx("Tag")}>
                          <b>Tag:</b> {item.post.tag?.tagName || "Không có tag"}
                        </div>
                        <div className={cx("DateView")}>
                          <b>Ngày xem:</b>
                          {moment(item.viewedAt).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Bài viết đã bị xóa hoặc không tồn tại.</p>
                  )}
                </div>
              ))
            ) : (
              <p>Không có lịch sử xem bài đăng.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriesNews;
