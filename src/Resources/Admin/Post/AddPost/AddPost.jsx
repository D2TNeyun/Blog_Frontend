import classNames from "classnames/bind";
import styles from "./AddPost.module.scss";
import { useEffect, useState } from "react";
import { createNewPost, getAllCategori } from "../../../../Services/apiServer";
import { ImSpinner5 } from "react-icons/im";
import { toast } from "react-toastify";
import logo from "../../../../assets/icon-logo.jpg";
import { FcPlus } from "react-icons/fc";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoImage from "../../../../assets/image-gallery.png";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const cx = classNames.bind(styles);

const AddPost = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Lưu category được chọn
  const [selectedTags, setSelectedTags] = useState([]); // Lưu danh sách tag được chọn theo category
  const [tags, setTags] = useState([]); // Lưu danh sách tag theo category

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [Image, setImage] = useState("");
  const [Preview, setPreview] = useState("");
  const AppUserID = useSelector((state) => state.user.user?.user?.id);
  const UserRole = useSelector((state) => state.user.user?.user?.roles);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await getAllCategori();
      if (res && res.categories && res.categories.length > 0) {
        setCategories(res.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Khi người dùng chọn category
  const handleCategoryChange = (event) => {
    const categoryID = event.target.value;
    setSelectedCategory(categoryID);

    // Lọc danh sách tags dựa trên categoryID
    const selectedCategoryData = categories.find(
      (category) => category.categoryID === parseInt(categoryID)
    );
    setTags(selectedCategoryData ? selectedCategoryData.tags : []);
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setSelectedTags(selectedTag); // Cập nhật state với tag đã chọn
  };

  function handleEditorChange({ html, text }) {
    setContentHTML(html);
    setContentMarkdown(text);
  }

  const handleUploadAvatar = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    setIsLoading(true);

    if (Title.trim() === "") {
      newErrors.Title = "Tiêu đề không được để trống";
    }
    if (Description.trim() === "") {
      newErrors.Description = "Mô tả không được để trống";
    }
    if (contentMarkdown.trim() === "") {
      newErrors.Content = "Nội dung bài viết không được để trống";
    }
    if (selectedCategory === "") {
      newErrors.CategoryID = "Vui lòng chọn danh mục";
    }

    if (selectedTags.length === 0) {
      newErrors.tagID = "Vui lòng chọn tag";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const CategoryID = selectedCategory;
      const TagID = selectedTags;
      const Content = contentHTML;
      // Gọi API tạo bài viết
      let res = await createNewPost(
        AppUserID,
        Title,
        Description,
        Content,
        TagID,
        CategoryID,
        Image
      );
      if (res && res.postID) {
        setIsLoading(false);
        toast.success("Thêm bài viết thành công!");

        // kiêm tra role trả về:
        if (UserRole.includes("Admin")) {
          navigate("/admin/managePost");
        } else {
          navigate("/employ/managePost");
        }
      } else {
        setIsLoading(true);
        toast.error("Thêm bài viết không thành công. Vui lòng thử lại!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Thêm bài viết không thành công. Vui lòng thử lại!");
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className={cx("containerPage")} style={{ backgroundColor: "#F0F3F7" }}>
      <div className={cx("titlePage")}>
        <h4 className="d-inline-block">Thêm bài viết</h4>
      </div>
      <div className={cx("contentPage")}>
        <div className={cx("titleContentService")}>
          <img src={logo} alt="" className={cx("iconTitleContentService")} />
          <div className={cx("contentTitleContentService")}>
            <h5>Thông tin bài viết</h5>
            <p>Điên đầy đủ thông tin bài viết bên dưới.</p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className={cx("formAddNews")}>
              <div className="mb-3">
                <h5>Tiều đề</h5>
                <textarea
                  type="text"
                  className={`form-control mt-2 ${cx("inputForm")} ${
                    errors.Title ? "border border-danger" : ""
                  } `}
                  id="title"
                  placeholder="Nhập tiêu đề"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                />
                {errors && <p className={cx("error")}>{errors.Title}</p>}
              </div>

              <div className="mb-3" style={{ display: "grid" }}>
                <h5 htmlFor="categorySelect">Chọn danh mục: </h5>
                <select
                  className={`form-control mt-2 ${cx("inputForm")} ${
                    errors.CategoryID ? "border-danger" : ""
                  }`}
                  aria-label="Default select example"
                  id="categorySelect"
                  value={selectedCategory}
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
                    <h5 htmlFor="tagSelect">Chọn tag: </h5>
                    <select
                      className={`form-control mt-2 ${cx("inputForm")} ${
                        errors.tagID ? "border-danger" : ""
                      }`}
                      id="tagSelect"
                      onChange={handleTagChange}
                    >
                      <option value="">Chọn một tag</option>
                      {tags.map((tag) => (
                        <option key={tag.tagID} value={tag.tagID}>
                          {tag.tagName}
                        </option>
                      ))}
                    </select>
                    {errors && <p className={cx("error")}>{errors.tagID}</p>}
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
                  rows="3"
                  autoComplete="off"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors && <p className={cx("error")}>{errors.Description}</p>}
              </div>
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
                  // <span className={cx("preview")}>Preview Image</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <h5>Nội dung bài viết</h5>
        <div
          className={`${cx("desService")} ${
            errors.contentMarkdown ? "border-danger" : ""
          }`}
        >
          <MdEditor
            style={{ height: "600px", border: "1px soild red" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={contentMarkdown}
          />
        </div>
        {errors.contentMarkdown && (
          <p className={cx("errors")}>{errors.contentMarkdown}</p>
        )}

        <button
          type="button"
          className={cx("btnAddService")}
          onClick={handleSubmit}
        >
          {isLoading === true && <ImSpinner5 className={cx("spinner")} />}
          Tạo bài viết
        </button>
      </div>
    </div>
  );
};

export default AddPost;
