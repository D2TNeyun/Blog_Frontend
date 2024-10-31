import classNames from "classnames/bind";
import styles from "./ManageCate.module.scss";
import { useEffect, useState } from "react";
import {
  addCategories,
  deleteCategory,
  getAllCategori,
  PuteditCategory,
  addTag,
  puttag,
  deleteTag,
} from "../../../Services/apiServer";
import {
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ImSpinner5 } from "react-icons/im";
import { Modal, Table, Space, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const ManageCategory = () => {
  const [listCategories, setListCagories] = useState([]);
  const [CategoryName, setCategoryName] = useState("");
  const [tagName, setTagName] = useState("");
  const [listTag, setListTag] = useState([]); // State for tags of selected category
  const [selectedCategoryID, setSelectedCategoryID] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  const fetchListCategori = async () => {
    try {
      let res = await getAllCategori();
      if (res && res.categories && res.categories.length > 0) {
        setListCagories(res.categories); // Update categories
      }
    } catch (error) {
      console.error("Failed to fetch list:", error);
    }
  };
  useEffect(() => {
    fetchListCategori();
  }, []);

  // Handle category change and update the tags
  const handleCategoryChange = (e) => {
    const selectedCategoryID = e.target.value;
    setSelectedCategoryID(selectedCategoryID); // Set selected category ID for display

    // Find and update tags for the selected category
    const selectedCategory = listCategories.find(
      (category) => category.categoryID == selectedCategoryID
    );
    setListTag(selectedCategory ? selectedCategory.tags : []);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => {
        return <span key={index}>{index + 1}</span>;
      },
      align: "center",
    },
    {
      title: "Thể loại",
      dataIndex: "cate",
      key: "cate",
      render: (_, record, index) => {
        return <div className={cx("cate")}>{record?.categoryName}</div>;
      },
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleShowEdit(record)}
            style={{ color: "#106cb2", padding: "3px" }}
          />
          <DeleteOutlined
            onClick={() => showModal(record)}
            style={{ color: "#d12323", padding: "3px" }}
          />
        </Space>
      ),
      align: "center",
    },
  ];

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (record) => {
    setIsModalOpen(true);
    setRecord(record);
  };

  //add Cate
  const handleSubmit = async () => {
    const newErrors = {};
    setIsLoading(true);

    if (CategoryName.trim() === "") {
      newErrors.CategoryName = "Thể loại không được để trống";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      let data = await addCategories(CategoryName);
      if (data && data.categoryID) {
        setCategoryName("");
        fetchListCategori();
        toast.success("Thêm mới thể loại thành công!");
        setIsLoading(false);
      } else {
        toast.error("Thêm mới thể loại không thành công. Vui lòng thử lại!");
        setIsLoading(true);
        setCategoryName("");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Thêm mới thể loại thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  //add tag
  const handleAddTag = async () => {
    const newErrors = {};
    setIsLoading(true);
    if (tagName.trim() === "") {
      newErrors.tagName = "Tag không được để trống";
    }

    if (selectedCategoryID === "") {
      newErrors.CategoryID = "Chọn thể loại để thêm tag";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    try {
      const CategoryID = selectedCategoryID;
      let data = await addTag(CategoryID, tagName);
      if (data && data.tagID) {
        setTagName("");
        fetchListCategori();
        toast.success("Thêm mới tag thành công!");
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Thêm mới tag thất bại!");
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  //DeleteModal
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
        setIsModalOpen(false);
        fetchListCategori();
      } else {
        toast.error("Xóa thể loại thất bại!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi xóa thể loại!");
    }
  };

 

  //EditModal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState({
    categoryID: null,
    categoryName: "",
  });

  const handleShowEdit = (record) => {
    setIsEditModalOpen(true);
    setEditCategory({
      categoryID: record.categoryID,
      categoryName: record.categoryName,
    });
    setRecord(record);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditCategory({ categoryID: null, categoryName: "" });
    setRecord(null);
  };

  const handleEditSubmit = async () => {
    setIsLoading(true);

    try {
      let res = await PuteditCategory(
        editCategory.categoryID,
        editCategory.categoryName
      );
      if (res && res.categoryID) {
        toast.success("Cập nhật thể loại thành công!");
        setIsEditModalOpen(false);
        fetchListCategori();
      } else {
        toast.error("Cập nhật thể loại thất bại!");
      }
    } catch (error) {
      toast.error("Thêm mới thể loại thất bại!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //editTag
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false);
  const [editTag, setEditTag] = useState({
    tagID: null,
    tagName: "",
  });
  const handleShoweditTag = (tag) => {
    setIsEditTagModalOpen(true);
    setEditTag({
      tagID: tag.tagID,
      tagName: tag.tagName,
    });
  };
  const handleCloseEditTag = () => {
    setIsEditTagModalOpen(false);
    setEditTag({ tagID: null, tagName: "" });
  };

  const SubmitEdit = async () => {
    try {
      let res = await puttag(editTag.tagID, editTag.tagName);
      if (res && res.tagID) {
        toast.success("Cập nhật tag thành công!");
        setIsEditTagModalOpen(false);
        fetchListCategori();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Cập nhật tag thất bại!");
      }
    } catch (error) {
      toast.error("Thêm mới thể loại thất bại!");
    }
  };

  const [selectedTagID, setSelectedTagID] = useState(null); 
  const handleShowDeleteTag = (tag) => {
    setIsModalOpen(true);
    setSelectedTagID(tag.tagID); 
    setRecord(tag); 
  };
  const handleDeleteTag = async () => {
    try {
      if (selectedTagID) {
        let res = await deleteTag(selectedTagID);
        if (res && res.message) {
          toast.success("Xóa tag thành công!");
          setIsModalOpen(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Xóa tag thất bại!");
        }
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa tag!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  const [pagination, setPagination] = useState({}); // phan trang
  function handleTableChange(data) {
    setPagination(data);
  }

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("Title")}>
          <div className={cx("b-Title")}>Danh sách thể loại </div>
        </div>
        <div className={cx("ContentPage")}>
          <div className={cx("headerListPost")}>
            <div className={cx("searchGroup")}>
              <div className={cx("searchBorder")}>
                <input
                  type="text"
                  className={cx("inputSearch")}
                  onKeyDown={handleKeyDown}
                  name=""
                  id="search"
                  placeholder="Tìm kiếm..."
                  autoComplete="off"
                />
                <label htmlFor="search" className={cx("iconSearch")}>
                  <SearchOutlined />
                </label>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className={cx("FormAdd")}>
                <div className={cx("Add-Cate")}>
                  <h5>Thêm mới thể loại</h5>
                  <input
                    type="text"
                    className={`form-control mt-2 ${cx("inputForm")} ${
                      errors.CategoryName ? "border border-danger" : ""
                    } `}
                    placeholder="Tên thể loại"
                    value={CategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    autoComplete="off"
                  />
                  {errors.CategoryName && (
                    <p className={cx("error")}>{errors.CategoryName}</p>
                  )}
                  <button className={cx("btnAdd")} onClick={handleSubmit}>
                    {isLoading === true && (
                      <ImSpinner5 className={cx("spinner")} />
                    )}
                    Thêm mới
                  </button>
                </div>
                <div className={cx("Add-Tag")}>
                  <h5>Thêm mới Tag</h5>
                  <select
                    onChange={handleCategoryChange}
                    value={selectedCategoryID}
                    className={`form-control mt-2 ${cx("inputForm")} ${
                      errors.CategoryID ? "border border-danger" : ""
                    } `}
                  >
                    <option value="">Chọn thể loại</option>
                    {listCategories.map((item) => (
                      <option key={item.categoryID} value={item.categoryID}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                  {errors.CategoryID && (
                    <p className={cx("error")}>{errors.CategoryID}</p>
                  )}
                  {listTag.length > 0 && (
                    <>
                      <div className={cx("listTag")}>
                        <p>Tag đã thêm:</p>
                        <ul>
                          {listTag.map((tag) => (
                            <li key={tag.tagID}>
                              {tag.tagName}
                              <EditOutlined
                                onClick={() => handleShoweditTag(tag)}
                                style={{ color: "#106cb2", padding: "3px" }}
                              />
                              <DeleteOutlined
                                onClick={() => handleShowDeleteTag(tag)}
                                style={{ color: "#d12323", padding: "3px" }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                  <input
                    type="text"
                    className={`form-control mt-2 ${cx("inputForm")} ${
                      errors.tagName ? "border border-danger" : ""
                    } `}
                    placeholder="Tên Tag"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    autoComplete="off"
                  />
                  {errors.tagName && (
                    <p className={cx("error")}>{errors.tagName}</p>
                  )}
                  <button className={cx("btnAdd")} onClick={handleAddTag}>
                    {isLoading === true && (
                      <ImSpinner5 className={cx("spinner")} />
                    )}
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12">
              <Table
                className="mt-4"
                pagination={{
                  defaultPageSize: 5,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "15"],
                }}
                onChange={handleTableChange}
                columns={columns}
                rowKey="categoryID"
                dataSource={listCategories}
              />
              <Modal
                title="Xóa thể loại "
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: "red" } }}
              >
                <div className="mb-3 mt-4">
                  <p>Bạn chắc chắn muốn xóa thể loại: {record?.categoryName}</p>
                </div>
              </Modal>

              <Modal
                title="Chỉnh sửa thể loại"
                open={isEditModalOpen}
                onOk={handleEditSubmit}
                onCancel={handleCloseEdit}
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

              <Modal
                title="Chỉnh sửa Tag"
                open={isEditTagModalOpen}
                onOk={SubmitEdit}
                onCancel={handleCloseEditTag}
                okButtonProps={{
                  style: { backgroundColor: "#4caf50" },
                }}
              >
                <div className="mb-3 mt-4">
                  <label htmlFor="tagName">Tên Tag</label>
                  <input
                    type="text"
                    id="tagName"
                    className="form-control"
                    value={editTag.tagName}
                    onChange={(e) =>
                      setEditTag({
                        ...editTag,
                        tagName: e.target.value,
                      })
                    }
                  />
                </div>
              </Modal>

              <Modal
                title="Xóa Tag"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleDeleteTag}
                okButtonProps={{ style: { backgroundColor: "red" } }}
              >
                <div className="mb-3 mt-4">
                  <p>Bạn chắc chắn muốn xóa Tag: {record?.tagName}</p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategory;
