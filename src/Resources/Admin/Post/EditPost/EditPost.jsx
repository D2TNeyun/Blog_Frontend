import classNames from "classnames/bind";
import styles from "./EditPost.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, UpdatePost } from "../../../../Services/apiServer"; 
import { useEffect, useState } from "react";
import { getAllCategori } from "../../../../Services/apiServer";
import { ImSpinner5 } from "react-icons/im";
import { toast } from "react-toastify";
import logo from "../../../../assets/icon-logo.jpg";
import { FcPlus } from "react-icons/fc";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useSelector } from "react-redux";
import LogoImage from "../../../../assets/image-gallery.png";

const mdParser = new MarkdownIt();
import TurndownService from 'turndown';
const cx = classNames.bind(styles);

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [Image, setImage] = useState("");
  const [Preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const AppUserID = useSelector((state) => state.user.user?.user?.id);

const turndownService = new TurndownService();

  // Hàm lấy dữ liệu bài viết theo ID
  const fetchPost = async () => {
    try {
      const res = await getPostById(id);
      console.log("API Response:", res);
      if (res && res.post) {
        const post = res.post;
        console.log("Post Data:", post); 
        setTitle(post.title || "");
        setDescription(post.description || "");
        setSelectedCategory(post.categoryID || "");
        const markdownContent = post.content.includes("<") ? turndownService.turndown(post.content) : post.content;
        setContentMarkdown(markdownContent || "");
        setContentHTML(mdParser.render(markdownContent || ""));
  

        if (post.tag) {
          setTags([post.tag]);
          setSelectedTags([post.tag.tagID]);
        } else {
          setTags([]);
          setSelectedTags([]);
        }

        setPreview(post.image || "");
      }
    } catch (error) {
      console.error("Failed to fetch post details:", error);
      toast.error("Lỗi khi tải bài viết.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategori();
      if (res && res.categories) {
        setCategories(res.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleCategoryChange = (event) => {
    const categoryID = event.target.value;
    setSelectedCategory(categoryID);
    const selectedCategoryData = categories.find(
      (category) => category.categoryID === parseInt(categoryID)
    );
    setTags(selectedCategoryData ? selectedCategoryData.tags : []);
  };

  // const handleTagChange = (e) => {
  //   setSelectedTags(e.target.value);
  // };

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkdown(text);
  };

  const handleUploadAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const CategoryID = selectedCategory;
      const TagID = selectedTags;
      const Content = contentHTML;
      await UpdatePost(
        id,
        CategoryID,
        TagID,
        Title,
        Description,
        Content,
        Image
      );
      toast.success("Bài viết đã được cập nhật thành công!");
      navigate("/admin/managePost");
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Lỗi khi cập nhật bài viết.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx("containerPage")} style={{ backgroundColor: "#F0F3F7" }}>
      <div className={cx("titlePage")}>
        <h4>Chỉnh sửa bài viết</h4>
      </div>
      <div className={cx("contentPage")}>
        <div className={cx("titleContentService")}>
          <img src={logo} alt="" className={cx("iconTitleContentService")} />
          <div className={cx("contentTitleContentService")}>
            <h5>Thông tin bài viết</h5>
            <p>Điên đầy đủ thông tin bài viết bên dưới.</p>
          </div>
        </div>
        <div className={cx("formAddNews")}>
          <div className="row mt-3">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="mb-3">
                <h5>Tiêu đề</h5>
                <textarea
                  className={`form-control mt-2 ${cx("inputForm")} ${
                    errors.Title ? "border border-danger" : ""
                  }`}
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nhập tiêu đề"
                />
                {errors.Title && <p className={cx("error")}>{errors.Title}</p>}
              </div>

              <div className="mb-3" style={{ display: "grid" }}>
                <h5 htmlFor="categorySelect">Chọn danh mục: </h5>
                <select
                  className={`form-control mt-2 ${cx("inputForm")} ${
                    errors.CategoryID ? "border-danger" : ""
                  }`}
                  id="categorySelect"
                  name="categorySelect"
                  value={selectedCategory || ""}
                  onChange={handleCategoryChange}
                >
                  <option value="">Chọn một danh mục</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryID}
                      value={category.categoryID}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                {errors && <p className={cx("error")}>{errors.CategoryID}</p>}

                {tags.length > 0 && (
                  <>
                    <h5 htmlFor="tagName">Chọn tag</h5>
                    <select
                      multiple={false}
                      name="tagName"
                      id="tagName"
                      className={`form-control mt-2 ${cx("inputForm")} ${
                        errors.tagID ? "border-danger" : ""
                      }`}
                      value={selectedTags || ""}
                      onChange={(e) => setSelectedTags(e.target.value)}
                    >
                      <option value="">Chọn một tag</option>
                      {tags.map((tag) => (
                        <option key={tag.tagID} value={tag.tagID}>
                          {tag.tagName}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>

              <div className="mb-3">
                <h5
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Mô tả
                </h5>
                <textarea
                  className={`form-control mt-2 ${cx("inputForm")} ${
                    errors.Description ? "border border-danger" : ""
                  } `}
                  id="exampleFormControlTextarea1"
                  placeholder="Nhập mô tả"
                  rows="5"
                  autoComplete="off"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors && <p className={cx("error")}>{errors.Description}</p>}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="mb-3">
                <div className={cx("upload-avatar")}>
                  <label className={cx("label-upload")} htmlFor="labelUpload">
                    <FcPlus /> Upload Image
                  </label>
                  <input
                    type="file"
                    hidden
                    id="labelUpload"
                    onChange={(event) => handleUploadAvatar(event)}
                  />
                </div>
                <div className={cx("img-preview")}>
                  {Preview ? (
                    <img className={cx("preview")} src={Preview} />
                  ) : (
                    <img className={cx("LogoImage")} src={LogoImage} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <h5>Nội dung bài viết</h5>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={contentMarkdown}
          />

          <button
            type="button"
            className={cx("btnAddService")}
            onClick={handleSubmit}
          >
            {isLoading && <ImSpinner5 className={cx("spinner")} />}
            Cập nhật bài viết
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
