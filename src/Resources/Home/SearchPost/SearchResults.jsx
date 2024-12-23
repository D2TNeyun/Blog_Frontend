import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.scss";
import classNames from "classnames/bind";
import moment from "moment";

const cx = classNames.bind(styles);

const SearchResults = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, query } = location.state || { posts: [], query: "" };
  console.log(posts);

  //handleCick Post
  const handlePostClick = (postID, title) => {
    navigate(`/posts/${postID}/${title}`);
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("pageContent")}>
          <h4>Kết quả tìm kiếm cho: "{query}" </h4>
          <div id="clear"></div>
          <hr />
          <div className={cx("groupQuery")}>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.postID}
                  className={cx("colItem")}
                  onClick={() => handlePostClick(post.postID, post.title)}
                >
                  <img src={post.image} alt="" className={cx("Image")} />
                  <div className={cx("in4Item")}>
                    <h3 className={cx("Title")}>{post.title}</h3>
                    <div className={cx("Desc")}>{post.description}</div>
                    <i className={cx("Desc")}>
                      Ngày cập nhật:{" "}
                      {moment(post.publishedDate).format("DD/MM/YYYY")}
                    </i>
                    <div className={cx("Tag")}>
                      <b>Tag:</b> {post.tag?.tagName}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={cx("noResults")}>
                <p>Không tìm thấy kết quả phù hợp cho "{query}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
