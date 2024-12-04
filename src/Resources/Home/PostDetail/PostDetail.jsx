import { useNavigate, useParams } from "react-router-dom";
import styles from "./PostDetail.module.scss";
import classNames from "classnames/bind";
import {
  getAllPost,
  getComments,
  getPostById,
  getTagById,
  incrementView,
  postCmt,
} from "../../../Services/apiServer";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ImSpinner5 } from "react-icons/im";
import Cookies from "js-cookie";
import moment from "moment";

const cx = classNames.bind(styles);
const PostDetail = (props) => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null); // chi 1 doi tuong
  const [postByTag, setPostByTag] = useState([]);
  const [Content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const AppUserID = useSelector((state) => state.user.user?.user?.id);
  const PostId = id;
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const in4User = useSelector((state) => state.user.user.user);
  //Apipost
  const fetchPostById = async () => {
    try {
      // Fetch the post data from the API
      let postData = await getPostById(id);
      if (postData && postData.post) {
        // Set the post data in the component state
        setPostData(postData.post);
        console.log(postData);

        //call api post cung tag
        let postByTag = await getTagById(postData.post.tagID);
        if (postByTag && postByTag.tag) {
          setPostByTag(postByTag.tag.posts);
          console.log(postByTag);
        }
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };
  useEffect(() => {
    fetchPostById();
  }, [id]);

  const [listPosts, setListPosts] = useState([]);
  const fetchListPosts = async () => {
    try {
      const postRes = await getAllPost();

      console.log("Fetched posts:", postRes);

      if (postRes && postRes.posts) {
        setListPosts(postRes.posts);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchListPosts();
  }, []);
  //lay bài viết có view nhiều nhất
  const getMostViewedPost = () => {
    const sortedPosts = listPosts.sort((a, b) => b.views - a.views);
    return sortedPosts.slice(0, 7); // trả về 7 bài viết có view nhiều nhất
  };
  const mostViewedPost = getMostViewedPost();
  console.log(mostViewedPost);

  //incrementViewpost
  const viewpost = async () => {
    const cookieName = `viewed_${id}`;
    const hasViewed = Cookies.get(cookieName);
    if (!hasViewed) {
      try {
        let viewData = await incrementView(id);
        if (viewData) {
          Cookies.set(cookieName, true, { expires: 1 / 144 }); // lưu cookie trong 10p
        }
        console.log("view", viewData);
      } catch (error) {
        console.error("Failed to record post view:", error);
      }
    }
  };

  useEffect(() => {
    viewpost();
  }, [id]);
  //Api Cmt
  const fetchComments = async () => {
    try {
      // Fetch the comments data from the API
      let commentsData = await getComments();
      if (commentsData && commentsData.comments) {
        // Set the comments data in the component state
        setComments(commentsData.comments);
      }
    } catch (error) {
      console.error("Error fetching comments data:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  //handlePOSRCMT
  const handlePostComment = async () => {
    setIsLoading(true);

    if (!Content || Content.trim() === "") {
      toast.error("Nội dung bình luận không được để trống!");
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Thời gian delay là 2000 milliseconds (2 giây)
      return;
    }
    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để bình luận!");
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return;
    }

    if (in4User.isActives.includes("B")) {
      toast.error("Tài khoản của bạn đã bị chặn bình luận!");
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return;
    }

    try {
      // Gửi bình luận qua API
      let updatedPost = await postCmt(PostId, AppUserID, Content);
      if (updatedPost && updatedPost.comment) {
        setIsLoading(true);
        toast.success("Bình luận được ghi nhận!");
        fetchComments();
      } else {
        setIsLoading(true);
        toast.error("Bình luận không thành công. Vui lòng thử lại!");
      }
    } catch (error) {
      setIsLoading(true);
      toast.error("Bình luận không thành công. Vui lòng thử lại!");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const handlePostClick = (postID, title) => {
    navigate(`/posts/${postID}/${title}`);
  };

  return (
    <>
      <div className={cx("wappercontainer")}>
        <div className={cx("Container")}>
          <div className="row">
            <div className={cx("Content")}>
              <div className={cx("colcate1")}>
                <div id="Content">
                  <div className="timeDate"></div>
                  {postData && (
                    <div className={cx("b-Content")}>
                      <b>{postData?.category?.categoryName}</b> &gt;
                      {postData?.tag?.tagName}
                      <h1>{postData.title}</h1>
                      <div className={cx("desc")}>{postData.description}</div>
                      <div className={cx("image")}>
                        <div className={cx("preview")}>
                          <img src={postData.image} className={cx("preview")} />
                        </div>
                      </div>
                      <p
                        className="mt-2"
                        dangerouslySetInnerHTML={{ __html: postData?.content }}
                      ></p>
                      <p>Tac gia: {postData.appUser?.username}</p>
                      <p>
                        Ngay dang:{" "}
                        {moment(postData.publishedDate).format("DD/MM/YYYY")}
                      </p>
                      <p>Lượt xem: {postData.views}</p>
                    </div>
                  )}
                </div>
                <div className={cx("Comment")}>
                  <p>Bình luận đánh giá</p>
                  <div className={cx("b-Comment")}>
                    {comments && comments.length > 0 ? (
                      comments
                        .filter((comment) => comment.postId === parseInt(id))
                        .map((comment) => (
                          <div
                            key={comment.commentId}
                            className={cx("comment-item")}
                          >
                            <div className={cx("comment-author")}>
                              <div className={cx("b-name")}>
                                {comment.appUser?.username}
                              </div>
                            </div>
                            <div className={cx("comment-content")}>
                              <p>{comment.content}</p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p>Không có bình luận.</p>
                    )}
                  </div>
                  <div className={cx("b-CreateCmt")}>
                    <form className={cx("b-form")}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Bình luận
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={Content}
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                      </div>
                      <div className={cx("b-btn")}>
                        <button
                          type="submit"
                          className={cx("btn-send")}
                          onClick={handlePostComment}
                          disabled={isLoading}
                        >
                          <IoSend /> Gửi bình luận
                          {isLoading === true && (
                            <ImSpinner5 className={cx("spinner")} />
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={cx("colcate2")}>
                <div className={cx("colName")}>
                  <div className={cx("b-name")}>ĐỌC NHIỀU</div>
                </div>
                <div className={cx("GroupItem")}>
                  {mostViewedPost?.map((item, index) => {
                    return (
                      <div key={index} className={cx("item")}>
                        <div
                          className={cx("b-title")}
                          onClick={() =>
                            handlePostClick(item.postID, item.title)
                          }
                        >
                          {item.title}
                        </div>
                        <div className={cx("b-desc")}>
                          <p> {item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={cx("colcate3")}>
              <div className={cx("colContent")}>
                <div className={cx("colName")}>
                  <div className={cx("b-name")}>ĐỌC THÊM</div>
                </div>
                <div className={cx("ColItem")}>
                  <ul className={cx("related-list")}>
                    {postByTag && postByTag.length > 0 ? (
                      postByTag.map((post) => (
                        <li
                          key={post.postID}
                          className="related-item col-xs-12 col-sm-4"
                          onClick={() =>
                            handlePostClick(post.postID, post.title)
                          }
                        >
                          <div className={cx("news-img-top")}>
                            <div className={cx("preview")}>
                              <img src={post.image} className={cx("b-img")} />
                            </div>
                            <div className={cx("b-title")}>
                              <p>{post.title}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No related posts found.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
