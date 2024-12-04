import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import {
  getAllCategori,
  getAllPost,
  increment,
} from "../../../Services/apiServer";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import {
  CameraOutlined 
} from "@ant-design/icons";
const cx = classNames.bind(styles);

const HomePage = (props) => {
  const [listPosts, setListPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchListPosts = async () => {
    try {
      const postRes = await getAllPost();
      const categoryRes = await getAllCategori();

      if (postRes && postRes.posts) {
        setListPosts(postRes.posts);
      }

      if (categoryRes && categoryRes.categories) {
        setCategories(categoryRes.categories);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchListPosts();
  }, []);

  //lay bài viet gan nhat vua moi tao
  const getNewestPost = () => {
    const sortedPosts = listPosts.sort(
      (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    );
    return sortedPosts.slice();
  };
  const newestPosts = getNewestPost();

  //lay bài viết có view nhiều nhất trong tuần vừa qua
  const getMostViewedPost = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const filteredPosts = listPosts.filter(
      (post) => new Date(post.publishedDate) >= oneWeekAgo
    );
    const sortedPosts = filteredPosts.sort((a, b) => b.views - a.views);
    return sortedPosts.slice(0, 7); // trả về 7 bài viết có view nhiều nhất
  };
  const mostViewedPost = getMostViewedPost();

  //lấy bài viết gần đây nhất theo danh mục
  const getMostRecentPostsByCategory = (categoryId) => {
    const filteredPosts = listPosts.filter(
      (post) => post.categoryID === categoryId
    );
    const sortedPosts = filteredPosts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    return sortedPosts.slice(0, 2); // trả về 2 bài viết gần nhất
  };
  //lấy tag theo category
  const getTagsByCategory = (categoryId) => {
    const category = categories.find((cat) => cat.categoryID === categoryId);
    return category ? category.tags : [];
  };

  //handleCick Catagory
  const handleCategoryClick = (categoryID, categoryName) => {
    navigate(`/categories/${categoryID}/${categoryName}`);
  };

  //handleCick Tag
  const handleTagClick = (tagID, tagName) => {
    navigate(`/tags/${tagID}/${tagName}`);
  };

  //handleCick Post
  const handlePostClick = (postID, title) => {
    navigate(`/posts/${postID}/${title}`);
  };

  const recordPageView = async () => {
    const pageName = window.location.href;
    try {
      const res = await increment(pageName);
    } catch (error) {
      console.error("Failed to record page view:", error);
    }
  };

  // Gọi hàm khi người dùng vào trang
  useEffect(() => {
    recordPageView();
  }, []);

  return (
    <>
      <div className={cx("wappercontainer")}>
        <div className={cx("MainContainer")}>
          <div className={cx("NewPostContainer")}>
            <div className={cx("NewPost")}>
              <div className="row">
                <div className={cx("NewPostContainer")}>
                  {newestPosts && newestPosts.length > 0 ? (
                    <Carousel className={cx("carousel")}>
                      {newestPosts.slice(0, 3).map((post) => (
                        <Carousel.Item key={post.postID}>
                          <img
                            className={cx("Preview")}
                            src={post.image}
                            alt="Slide image"
                          />
                          <Carousel.Caption>
                            <h3 className={cx("CaptionTitle")}>{post.title}</h3>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <p>Không tìm thấy bài viết nào</p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className={cx("ViewTop")}>
                  <div className={cx("Group")}>
                    {mostViewedPost && mostViewedPost.length > 0
                      ? mostViewedPost.slice(0, 3).map((post) => (
                          <div className="col-sm-4 col-xs-12 item"
                          key={post.postID}
                          >
                            <div
                              key={post.postID}
                              className={cx("item")}
                              onClick={() =>
                                handlePostClick(post.postID, post.title)
                              }
                            >
                              <div className={cx("image")}>
                                <img
                                  className={cx("b-image")}
                                  src={post.image}
                                  alt="img"
                                />
                              </div>
                              <div className={cx("content")}>
                                <p>{post.title}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("NewTop")}>
              <div className={cx("b-title")}>Sự kiện Mới Nhất</div>
              <div className={cx("b-item")}>
                {listPosts.length > 0 ? (
                  listPosts
                    .sort(
                      (a, b) =>
                        new Date(b.publishedDate) - new Date(a.publishedDate)
                    )
                    .slice(0, 5) // Get the 5 most recent posts
                    .map((post) => (
                      // Use postID
                      <div key={post.postID}>
                        {/* Add your code here */}
                        <div
                          className={cx("item")}
                          onClick={() =>
                            handlePostClick(post.postID, post.title)
                          }
                        >
                          <h5>{post.title}</h5>
                          <div className={cx("b-dec")}>{post.description}</div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No posts found</p>
                )}
              </div>
            </div>
          </div>
          <hr />
          {/* bai viet theo categoty  */}
          <div className={cx("PostCardContainer")}>
            <div className="row">
              <div className="col-12 col-md-8">
                <div className={cx("PostList")}>
                  {categories.length > 0 ? (
                    categories.map((category) => {
                      // Use categoryID as key
                      const mostRecentPosts = getMostRecentPostsByCategory(
                        category.categoryID
                      );
                      return (
                        <div
                          key={category.categoryID}
                          className={cx("CategoryContainer")}
                        >
                          {/* Use categoryID */}
                          <div className={cx("MainCategory")}>
                            <div
                              className={cx("Category")}
                              onClick={() =>
                                handleCategoryClick(
                                  category.categoryID,
                                  category.categoryName
                                )
                              }
                            >
                              {category.categoryName}
                            </div>
                            <div className={cx("Tags")}>
                              {getTagsByCategory(category.categoryID).map(
                                (tag) => (
                                  <span
                                    key={tag.tagID}
                                    className={cx("Tag")}
                                    onClick={() =>
                                      handleTagClick(tag.tagID, tag.tagName)
                                    }
                                  >
                                    {/* Use tagID */}
                                    {tag.tagName}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <div className={cx("news-img-left")}>
                            <div className="row">
                              {mostRecentPosts.length > 0 ? (
                                mostRecentPosts.map((post) => (
                                  <div className="col-md-6" key={post.postID}>
                                    {/* Use postID */}
                                    <ul
                                      className={cx("Box")}
                                      onClick={() =>
                                        handlePostClick(post.postID, post.title)
                                      }
                                    >
                                      <div className={cx("Title")}>
                                        {post.title}
                                      </div>
                                      <div className={cx("preview")}>
                                        <img
                                          src={post.image}
                                          alt={post.title}
                                          className={cx("image")}
                                        />
                                      </div>
                                      <p>
                                        {post.description.length > 200
                                          ? `${post.description.slice(
                                              0,
                                              150
                                            )}...`
                                          : post.description}
                                      </p>
                                    </ul>
                                  </div>
                                ))
                              ) : (
                                <p>No posts found for this category</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Loading categories...</p>
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className={cx("TrendView")}>
                  <div className={cx("Tieudem")}>
                    <div className={cx("text")}>Đọc Nhiều</div>
                  </div>
                  <div className={cx("GroupItem")}>
                    {mostViewedPost?.map((item) => {
                      return (
                        <div key={item.postID} className={cx("item")}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
