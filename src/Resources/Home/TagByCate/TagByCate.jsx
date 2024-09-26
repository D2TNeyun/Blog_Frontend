import { useNavigate, useParams } from "react-router-dom";
import styles from "./TagByCate.module.scss";
import classNames from "classnames/bind";
import { getAllTag, getTagById } from "../../../Services/apiServer";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const TagByCate = (props) => {
  const { id, categoryName } = useParams(); // Get the id and category name from the URL
  const [latestPosts, setLatestPosts] = useState([]);
   const [listTag, setListTag] = useState([]);

   const navigate = useNavigate();

  // Fetch all tags
  const fetchTag = async () => {
    try {
      let res = await getAllTag();
      if (res && res.tags) {
        // lay 5 bai gan nhat
        const sortedPosts = res.tags.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );
        setListTag(sortedPosts.slice(0, 5));
        console.log("Fetched all tags:", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTag();
  }, []);

   //handleCick Tag
   const handleTagClick = (tagID, tagName) => {
    navigate(`/tags/${tagID}/${tagName}`);
  };

  //handleCick Post
  const handlePostClick = (postID, title) => {
    navigate(`/posts/${postID}/${title}`);
  };

  // Fetch posts by tag
  const fetchPostByTag = async () => {
    try {
      let res = await getTagById(id);
      if (res && res.tag && res.tag.posts) {
        const sortedPosts = res.tag.posts.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );
        setLatestPosts(sortedPosts.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchPostByTag();
  }, [id]);

  return (
    <>
      <div className={cx("wappercontainer")}>
        <div className={cx("Container")}>
          <div className="row">
            <div className={cx("Content")}>
              <div className={cx("colcate1")}>
                <div id="topcate">
                  <div className={cx("Title")}>
                    {listTag && listTag.length >0 ? (
                      listTag
                      .filter((item) => item.tagID === parseInt(id)) 
                      .map((item, i) => (
                        <div  key={`tag-${item.tagID}-${i}`} >
                          <div className={cx("b-name")}>{item.tagName}</div>
                        </div>
                      ) 
                    )): null}
                    </div>
                  <div className={cx("image")}>
                    <div className={cx("preview")}>
                      <img
                        src={latestPosts[0] ? latestPosts[0].image : ""}
                        className={cx("preview")}
                      />
                    </div>
                  </div>
                  <div className={cx("fleft")}
                    onClick={() =>
                      handlePostClick(
                        latestPosts[0].postID,
                        latestPosts[0].title
                      )
                    }>
                    <h2>
                      tieu đê: {latestPosts[0] ? latestPosts[0].title : ""}
                    </h2>
                  </div>
                  <p className={cx("desc")}>
                    mo ta: {latestPosts[0] ? latestPosts[0].description : ""}
                  </p>

                  <div className={cx("boxtopcate")}>
                    <div className={cx("boxtop")}>
                      {latestPosts.slice(1, 3).map((post) => (
                        <div
                          className={cx("b-box")}
                          key={post.postID}
                          onClick={() =>
                            handlePostClick(post.postID, post.title)
                          }
                        >
                          <div className={cx("image")}>
                            <div className={cx("preview")}>
                              <img
                                src={post.image}
                                className={cx("preview")}
                                alt={post.title}
                              />
                            </div>
                          </div>
                          <div className={cx("b-title")}>{post.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr />
                  <div className={cx("boxtinmoi")}>
                    <div className={cx("catename")}>
                      <a href="" className="catename">
                        Tin mới nhất
                      </a>
                    </div>
                    <div className={cx("list-news-img")}>
                      <ul className={cx("list")}>
                        {latestPosts.map((post) => (
                          <li
                            key={post.postID}
                            className={cx("news-img-left")}
                            onClick={() =>
                              handlePostClick(post.postID, post.title)
                            }
                          >
                            <div className={cx("b-title")}>{post.title}</div>
                            <div className={cx("b-img")} href="">
                              <img
                                src={post.image}
                                alt=""
                                className={cx("preview")}
                              />
                            </div>
                            <div className={cx("b-desc")}>
                              <p>{post.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("colcate2")}>
                <div className={cx("colName")}>
                  <div className={cx("b-name")}>ĐỌC NHIỀU</div>
                </div>
              </div>

              <div className={cx("colcate3")}>
                {/* Kiểm tra nếu có dữ liệu và loại trừ phần tử mảng 0 */}
                {listTag && listTag.length > 0 ? (
                  listTag
                  .filter((item) => item.tagID !== parseInt(id)) // Loại trừ tagID đã gọi
                  .slice(0).map((item, i) => (
                    <div
                      key={`tag-${item.tagID}-${i}`}
                      className={cx("colName")}
                    >
                      <div className={cx("b-name")}
                      onClick={() => handleTagClick(item.tagID, item.tagName)}>{item.tagName}</div>
                      <ul className={cx("post-list")}>
                        {item.posts && item.posts.length > 0 ? (
                          item.posts.map((post) => (
                            <li key={post.postID} className={cx("post-item")}>
                              <div
                                className={cx("post-title")}
                                onClick={() =>
                                  handlePostClick(post.postID, post.title)
                                }
                              >
                                <h5>{post.title}</h5>
                                <p>{post.description}</p>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p>Không có bài viết nào cho thẻ này.</p>
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className={cx("colName")}>
                    <div className={cx("b-name")}>Không có dữ liệu</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagByCate;
