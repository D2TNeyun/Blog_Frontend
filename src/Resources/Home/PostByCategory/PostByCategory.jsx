import { useNavigate, useParams } from "react-router-dom";
import styles from "./PostByCategory.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { getCategoryById } from "../../../Services/apiServer";

const cx = classNames.bind(styles);

const PostByCategory = (props) => {
  const { id, categoryName } = useParams(); // Get the id and category name from the URL
  const [categoryData, setCategoryData] = useState([]); // Get CateByID
  const [latestPosts, setLatestPosts] = useState([]); // các bao viet mới nhất

  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      let res = await getCategoryById(id);
      if (res && res.category) {
        setCategoryData(res.category);
        console.log("Fetched posts by category:", res);

        // Sắp xếp bài viết theo ngày xuất bản theo thứ tự giảm dần
        const sortedPosts = res.category.posts.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );

        // Đặt 5 bài viết mới nhất
        setLatestPosts(sortedPosts.slice(0, 5));
      } else {
        console.error("Failed to fetch posts by category:", res);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  //handleCick Tag
  const handleTagClick = (tagID, tagName) => {
    navigate(`/tags/${tagID}/${tagName}`);
  };

  //handleCick Post
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
                <div id="topcate">
                  <div className={cx("Title")}>{categoryName}</div>
                  <div className={cx("image")}>
                    <div className={cx("preview")}>
                      <img
                        src={latestPosts[0] ? latestPosts[0].image : ""}
                        className={cx("preview")}
                      />
                    </div>
                  </div>
                  <div
                    className={cx("fleft")}
                    onClick={() =>
                      handlePostClick(
                        latestPosts[0].postID,
                        latestPosts[0].title
                      )
                    }
                  >
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
                </div>=
              </div>

              <div className={cx("colcate3")}>
                {/* Check if there are tags to display */}
                {categoryData?.tags?.length > 0 ? (
                  <div className={cx("tag-group")}>
                    {/* Loop through each tag */}
                    {categoryData.tags.map((tag) => (
                      <div key={tag.tagID} className={cx("b-group")}>
                        {/* Display the tag name */}
                        <div className={cx("tag-name")}>
                          <div
                            className={cx("b-name")}
                            onClick={() =>
                              handleTagClick(tag.tagID, tag.tagName)
                            }
                          >
                            {tag.tagName}
                          </div>
                        </div>

                        {/* Filter and display posts associated with this tag */}
                        <ul>
                          {categoryData.posts
                            .filter((post) => post.tagID === tag.tagID) // Filter posts by tagID
                            .map((post) => (
                              <li key={post.postID}>
                                <div
                                  className={cx("b-li")}
                                  onClick={() =>
                                    handlePostClick(post.postID, post.title)
                                  }
                                >
                                  <h5>{post.title}</h5>
                                  <p>{post.description}</p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No tags available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostByCategory;
