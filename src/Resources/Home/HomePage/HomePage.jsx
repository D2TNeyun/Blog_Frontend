import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { getAllCategori, getAllPost } from "../../../Services/apiServer";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const HomePage = (props) => {
  const [listPosts, setListPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchListPosts = async () => {
    try {
      const postRes = await getAllPost();
      const categoryRes = await getAllCategori();

      console.log("Fetched posts:", postRes);
      // console.log("Fetched categories:", categoryRes);

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

  return (
    <>
      <div className={cx("wappercontainer")}>
        <div className={cx("MainContainer")}>
          <div className={cx("NewPostContainer")}>
            <div className={cx("NewPost")}>
              {newestPosts && newestPosts.length > 0 ? (
                <Carousel className={cx("carousel")}>
                  {newestPosts.slice(0, 3).map((post) => (
                    <Carousel.Item key={post.postID}>
                      <div className={cx("PostImage")}>
                        <img
                          className={cx("Preview")}
                          src={post.image}
                          alt="First slide"
                        />
                      </div>
                      <div className={cx("Caption")}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <p>Không tìm thấy bài viết nào</p>
              )}

              <div>thay thế vào là quảng cáo hoặc các bài biết top view!</div>
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
                          <h4>{post.title}</h4>
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
                                      <div className={cx("description")}>
                                        <p> {post.description}</p>
                                      </div>
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
                    <div className={cx("text")}>Doc Nhieu</div>
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
