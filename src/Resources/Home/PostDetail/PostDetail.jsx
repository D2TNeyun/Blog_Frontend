import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.scss";
import classNames from "classnames/bind";
import { getPostById, getTagById } from "../../../Services/apiServer";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
const PostDetail = (props) => {
  const { id, title } = useParams(); // Get the id and category name from the
  const [postData, setPostData] = useState(null); // chi 1 doi tuong
  const [postByTag, setPostByTag] = useState([]);

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
                      <h1>{postData.title}</h1>
                      <div className={cx("desc")}>{postData.description}</div>
                      <div className={cx("image")}>
                        <div className={cx("preview")}>
                          <img src={postData.image} className={cx("preview")} />
                        </div>
                      </div>
                      <p>{postData.content}</p>
                      <p>Tac gia: {postData.appUser?.username}</p>
                      <p>Ngay dang: {postData.publishedDate}</p>
                    </div>
                  )}
                </div>
                <div className={cx("Comment")}>Binh luan danh gia</div>
              </div>
              <div className={cx("colcate2")}>
                <div className={cx("colName")}>
                  <div className={cx("b-name")}>ĐỌC NHIỀU</div>
                </div>
              </div>
            </div>
            <div className={cx("colcate3")}>
              <div className="row">
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
                        >
                          <div className={cx("news-img-top")}>
                            <div className={cx("preview")}>
                              <img src={post.image} className={cx("b-img")} />
                            </div>
                            <div className={cx("b-title")}>
                              <h4>{post.title}</h4>
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
