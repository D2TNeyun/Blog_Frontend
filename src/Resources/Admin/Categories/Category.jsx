import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Modal } from "antd";
import { toast } from "react-toastify";
import {
  addCategories,
  addTag,
  deleteCategory,
  deleteTag,
  getAllCategori,
  PuteditCategory,
  puttag,
} from "../../../Services/apiServer";
const cx = classNames.bind(styles);

const Category = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState();
  const [idTag, setIdTag] = useState();
  const [record, setRecord] = useState();

  // Fetch data from API
  const fetchListCategori = async () => {
    try {
      const res = await getAllCategori();
      if (res?.categories?.length > 0) {
        setData(res.categories);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch list:", error);
      setErrors(error.message);
    }
  };

  useEffect(() => {
    fetchListCategori();
  }, []);

  //modal add cate
  const [showModalAddCate, setShowModalAddCate] = useState(false);
  const [CategoryName, setCategoryName] = useState("");
  const handleshow = () => {
    setShowModalAddCate(true);
  };
  const handleCancelAdd = () => {
    setShowModalAddCate(false);
    setErrors({});
    setCategoryName("");
  };

  const handleOkAdd = async () => {
    const newErrors = {};
    if (CategoryName.trim() === "") {
      newErrors.CategoryName = "Thể loại không được để trống";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      let data = await addCategories(CategoryName);
      if (data && data.categoryID) {
        setCategoryName("");
        fetchListCategori();
        toast.success("Thêm mới thể loại thành công!");
        setShowModalAddCate(false);
      } else {
        toast.error("Thể loại đã tồn tại!");
        setErrors({});
      }
    } catch (error) {
      toast.error("Thêm mới thể loại thất bại!");
    }
  };
  //modal edit cate
  const [showModalEditCate, setShowModalEditCate] = useState(false);
  const [editCategory, setEditCategory] = useState({
    categoryID: null,
    categoryName: "",
  });
  const handleShowEditCate = (record) => {
    setShowModalEditCate(true);
    setEditCategory({
      categoryID: record.categoryID,
      categoryName: record.categoryName,
    });
    setRecord(record);
  };
  const handleCancelEdit = () => {
    setShowModalEditCate(false);
    setErrors({});
    setEditCategory({ categoryID: null, categoryName: "" });
    setRecord(null);
  };
  const handleEditSubmit = async () => {
    try {
      let res = await PuteditCategory(
        editCategory.categoryID,
        editCategory.categoryName
      );
      if (res && res.categoryID) {
        toast.success("Cập nhật thể loại thành công!");
        setShowModalEditCate(false);
        fetchListCategori();
      } else {
        toast.error("Cập nhật thể loại thất bại!");
      }
    } catch (error) {
      toast.error("Thêm mới thể loại thất bại!");
      console.error(error);
    }
  };

  //modal delete cate
  const [showModalDeleteCate, setShowModalDeleteCate] = useState(false);
  const handleShowDeleteCate = (record) => {
    setShowModalDeleteCate(true);
    setRecord(record);
  };
  const handleCancelDelete = () => {
    setShowModalDeleteCate(false);
    setRecord(null);
  };
  const handleDelete = async () => {
    if (!record || !record.categoryID) {
      toast.error("Có lỗi xảy ra! Không tìm thấy thể loại để xóa.");
      return;
    }

    const { categoryID } = record;
    try {
      let data = await deleteCategory(categoryID);
      if (data && data.message) {
        toast.success("Xóa thể loại thành công!");
        setShowModalDeleteCate(false);
        fetchListCategori();
      } else {
        toast.error("Xóa thể loại thất bại!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi xóa thể loại!");
    }
  };

  //modal add Tag
  const [showModalAddTag, setShowModalAddTag] = useState(false);
  const [tagName, setTagName] = useState("");
  const handleShowAddTag = (record) => {
    setShowModalAddTag(true);
    setRecord(record);
  };
  const handleCancelAddTag = () => {
    setShowModalAddTag(false);
    setErrors({});
    setTagName("");
  };
  const handleOkAddTag = async () => {
    const newErrors = {};
    if (tagName.trim() === "") {
      newErrors.tagName = "Tag không được để trống";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const CategoryID = record.categoryID;
      let data = await addTag(CategoryID, tagName);
      if (data && data.tagID) {
        setTagName("");
        toast.success("Thêm mới tag thành công!");
        setShowModalAddTag(false);
        fetchListCategori();
      } else {
        toast.error("Tag đã tồn tại!");
        setErrors({});
      }
    } catch (error) {
      toast.error("Thêm mới tag thất bại!");
      console.error("Failed to add tag: " + error);
    }
  };

  //modal edit Tag
  const [showModalEditTag, setShowModalEditTag] = useState(false);
  const [editTag, setEditTag] = useState({
    tagID: null,
    tagName: "",
  });
  const handleShowEditTag = (tag) => {
    setShowModalEditTag(true);
    setEditTag({
      tagID: tag.tagID,
      tagName: tag.tagName,
    });
    setRecord(tag);
    console.log(tag);
  };
  const handleCancelEditTag = () => {
    setShowModalEditTag(false);
    setErrors({});
    setEditTag({ tagID: null, tagName: "" });
    setRecord(null);
  };

  const handleEditTagSubmit = async () => {
    try {
      let res = await puttag(editTag.tagID, editTag.tagName);
      if (res && res.tagID) {
        toast.success("Cập nhật tag thành công!");
        setShowModalEditTag(false);
        fetchListCategori();
      } else {
        toast.error("Cập nhật tag thất bại!");
      }
    } catch (error) {
      toast.error("Thêm mới tag thất bại!");
      console.error(error);
    }
  };

  //modal delete Tag
  const [showModalDeleteTag, setShowModalDeleteTag] = useState(false);
  const handleShowDeleteTag = (record) => {
    setShowModalDeleteTag(true);
    setRecord(record);
    console.log(record);
  };
  const handleCancelDeleteTag = () => {
    setShowModalDeleteTag(false);
    setRecord(null);
  };
  const handleDeleteTag = async () => {
    try {
      const tagID = record.tagID;
      let data = await deleteTag(tagID);
      if (data && data.message) {
        toast.success("Xóa tag thành công!");
        setShowModalDeleteTag(false);
        fetchListCategori();
      } else {
        toast.error("Xóa tag thất bại!");
      }
    } catch (error) {
      toast.error("Xóa tag thất bại!");
      console.error("Failed to delete tag: " + error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("Title")}>
        <div className={cx("b-Title")}>Danh sách thể loại </div>
      </div>
      <div className={cx("ContentPage")}>
        <div className={cx("TitleCategory")}>
          <img src="" alt="" className={cx("iconTitleCategory")} />
          <div className={cx("contentTitleCategory")}>
            <h5>Danh sách các thể loại</h5>
            <p>Các Tag của từng thể loại.</p>
          </div>
          <div className={cx("addCategory")}>
            <button className={cx("btnAdd")} onClick={() => handleshow()}>
              Thêm mới
            </button>
          </div>
        </div>
        <Accordion className="mt-4">
          {data?.map((item, i) => (
            <Accordion.Item key={i} eventKey={i}>
              <Accordion.Header>{item.categoryName}</Accordion.Header>
              <Accordion.Body>
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Tên Tag</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.tags?.map((tag, keyIndex) => (
                      <tr key={keyIndex}>
                        <td>{keyIndex + 1}</td>
                        <td>{tag.tagName}</td>
                        <td>
                          <EditOutlined
                            onClick={() => handleShowEditTag(tag)}
                            style={{
                              color: "#5680c8",
                              marginRight: "10px",
                            }}
                          />
                          <DeleteOutlined
                            onClick={() => handleShowDeleteTag(tag)}
                            style={{ color: "#d72828" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={cx("Actions")}>
                  <h5>Action: </h5>
                  <EditOutlined
                    onClick={() => handleShowEditCate(item)}
                    style={{
                      color: "#5680c8",
                      marginRight: "10px",
                    }}
                  />
                  <DeleteOutlined
                    onClick={() => handleShowDeleteCate(item)}
                    style={{ color: "#d72828", marginRight: "10px" }}
                  />
                  <PlusCircleOutlined
                    onClick={() => handleShowAddTag(item)}
                    style={{ color: "#1ce860", marginRight: "10px" }}
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Chỉnh sửa thể loại! */}
        <Modal
          title="Chỉnh sửa thể loại!"
          open={showModalEditCate}
          onOk={handleEditSubmit}
          onCancel={handleCancelEdit}
          okButtonProps={{ style: { backgroundColor: "#4caf50" } }}
        >
          <div className="mb-3 mt-4">
            <label htmlFor="categoryName">Tên thể loại</label>
            <input
              type="text"
              id="categoryName"
              className="form-control"
              value={editCategory.categoryName}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  categoryName: e.target.value,
                })
              }
            />
          </div>
        </Modal>

        {/* "Xóa thể loại " */}
        <Modal
          title="Xóa thể loại "
          open={showModalDeleteCate}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
          okButtonProps={{ style: { backgroundColor: "red" } }}
        >
          <div className="mb-3 mt-4">
            <p>Bạn chắc chắn muốn xóa thể loại:<b> {record?.categoryName}</b></p>
          </div>
        </Modal>

        {/* "Thêm mới thể loại!" */}
        <Modal
          title="Thêm mới thể loại!"
          open={showModalAddCate}
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
        >
          <div className={cx("formGroup")}>
            <div className={cx("mb-4")}>
              <label htmlFor="categoryName">Tên thể loại</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                placeholder="Nhập tên thể loại"
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              {errors && errors.CategoryName && (
                <div className="text-danger">{errors.CategoryName}</div>
              )}
            </div>
          </div>
        </Modal>

        {/* "Thêm mới Tag" */}
        <Modal
          title="Thêm mới Tag"
          open={showModalAddTag}
          onOk={handleOkAddTag}
          onCancel={handleCancelAddTag}
        >
          <div className={cx("formGroup")}>
            <div className={cx("mb-4")}>
              <label htmlFor="tagName">Tên Tag</label>
              <input
                type="text"
                className="form-control"
                id="tagName"
                placeholder="Nhập tên Tag"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />
              {errors && errors.tagName && (
                <div className="text-danger">{errors.tagName}</div>
              )}
            </div>
          </div>
        </Modal>
            
        {/* "Chỉnh sửa Tag" */}
        <Modal
          title="Chỉnh sửa Tag"
          open={showModalEditTag}
          onOk={handleEditTagSubmit}
          onCancel={handleCancelEditTag}
          okButtonProps={{ style: { backgroundColor: "#4caf50" } }}
        >
          <div className={cx("formGroup")}>
            <div className={cx("mb-4")}>
              <label htmlFor="tagName">Tên Tag</label>
              <input
                type="text"
                className="form-control"
                id="tagName"
                placeholder="Nhập tên Tag"
                value={editTag.tagName}
                onChange={(e) =>
                  setEditTag({
                    ...editTag,
                    tagName: e.target.value,
                  })
                }
              />
              {errors && errors.tagName && (
                <div className="text-danger">{errors.tagName}</div>
              )}
            </div>
          </div>
        </Modal>
            
        {/* "Xóa Tag" */}
        <Modal
          title="Xóa Tag"
          open={showModalDeleteTag}
          onOk={handleDeleteTag}
          onCancel={handleCancelDeleteTag}
          okButtonProps={{ style: { backgroundColor: "red" } }}
        >
          <div className="mb-3 mt-4">
            <p>Bạn chắc chắn muốn xóa Tag:<b> {record?.tagName}</b></p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
