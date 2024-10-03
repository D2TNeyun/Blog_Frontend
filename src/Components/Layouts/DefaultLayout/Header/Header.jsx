import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import logo from "../../../../assets/logo.png";
import AuthModal from "../../../../Resources/Auth/Auth";
import { useEffect, useState } from "react";
import { getAllCategori, logoutApi } from "../../../../Services/apiServer";
import { FaHome } from "react-icons/fa";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../../Redux/Reducer/UserSlice";

const cx = classNames.bind(styles);

const Header = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [listCategori, setListCategori] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log("User:", user);
  // console.log("Roles:", user?.user?.roles);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const items = [
    {
      key: "0",
      label: (
        <Link
          to={user?.user?.roles == "Admin" ? "/admin" : "/user"}
          className={`${cx("dropdownItem")} text-decoration-none`}
        >
          Thông tin cá nhân
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link to="/" className={`${cx("dropdownItem")}`} onClick={() => handleLogout()}>
          ĐĂng xuất
        </Link>
      ),
    },
  ];

  const handleLogout = async () => {
    try {
      await logoutApi();
      // localStorage.removeItem("token");
      dispatch(doLogoutAction());
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchListCategori = async () => {
      try {
        let res = await getAllCategori();
        if (res && res.categories && res.categories.length > 0) {
          setListCategori(res.categories);
        }
      } catch (error) {
        console.error("Failed to fetch list:", error);
      }
    };
    fetchListCategori();
  }, []);

  useEffect(() => {
    const updateViewMode = () => {
      const windowWidth = window.innerWidth;
      setIsMobileView(windowWidth < 700); // Cập nhật chế độ mobile nếu chiều rộng màn hình dưới 700px
    };

    updateViewMode(); // Kiểm tra chế độ màn hình khi tải trang
    window.addEventListener("resize", updateViewMode); // Lắng nghe sự thay đổi kích thước màn hình

    return () => window.removeEventListener("resize", updateViewMode);
  }, []);

  const handleCategoryClick = (categoryID, categoryName) => {
    navigate(`/categories/${categoryID}/${categoryName}`);
  };

  const handleTagClick = (tagID, tagName) => {
    navigate(`/tags/${tagID}/${tagName}`);
  };

  return (
    <>
      <div className={cx("wapperheader")}>
        <div className={cx("navbrand")}>
          <div className={cx("brand")}>
            <Navbar.Brand>
              <Link to="/">
                <img className={cx("imgLogo")} src={logo} alt="Logo" />
              </Link>
            </Navbar.Brand>
          </div>
          <div className={cx("myvne_taskbar")}>
            {isAuthenticated ? (
              <div>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  placement="bottom"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {user?.user?.username || ""}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            ) : (
              <Nav.Link className="text-decoration-none">
                <Button
                  className={cx("btnLogin")}
                  onClick={() => setShowModal(true)}
                >
                  <FaRegUser /> <div className={cx("b-text")}>Đăng nhập</div>
                </Button>
                <AuthModal
                  show={showModal}
                  setShow={setShowModal}
                  onHide={() => setShowModal(false)}
                />
              </Nav.Link>
            )}
          </div>
        </div>
        <div className={cx("navContainer")}>
          <Navbar
            expand="lg"
            bg="secondary"
            variant="dark"
            className={cx("NavItem")}
          >
            <div className={cx("Item")}>
              <Link to="/">
                <FaHome className={cx("IconHome")} />
              </Link>

              {/* Kiểm tra nếu là chế độ mobile thì hiển thị tất cả category trong dropdown */}
              {isMobileView ? (
                <Dropdown
                  menu={{
                    items: listCategori.map((category, index) => ({
                      key: category.categoryID,
                      label: (
                        <Button
                          className={cx("b-cate")}
                          onClick={() =>
                            handleCategoryClick(
                              category.categoryID,
                              category.categoryName
                            )
                          }
                        >
                          {category.categoryName}
                        </Button>
                      ),
                    })),
                  }}
                  placement="bottomRight"
                >
                  <Button className={cx("btn-cate")}>
                    Danh mục <DownOutlined />
                  </Button>
                </Dropdown>
              ) : (
                <>
                  {/* Hiển thị danh mục đầu tiên khi không ở chế độ mobile */}
                  {listCategori.slice(0, 9).map((item, index) => (
                    <div key={index} className={cx("btn-cate")}>
                      <Space direction="vertical">
                        <Dropdown
                          menu={{
                            items: item.tags.map((tag) => ({
                              key: tag.tagID,
                              label: (
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    handleTagClick(tag.tagID, tag.tagName)
                                  }
                                >
                                  {tag.tagName}
                                </a>
                              ),
                            })),
                          }}
                          placement="bottomRight"
                        >
                          <Button
                            className={cx("b-cate")}
                            onClick={() =>
                              handleCategoryClick(
                                item.categoryID,
                                item.categoryName
                              )
                            }
                          >
                            {item.categoryName}
                          </Button>
                        </Dropdown>
                      </Space>
                    </div>
                  ))}

                  {/* Dropdown cho các danh mục còn lại */}
                  {listCategori.length > 9 && (
                    <div className={cx("btn-cate")}>
                      <Space direction="vertical">
                        <Dropdown
                          menu={{
                            items: listCategori
                              .slice(5)
                              .map((category, index) => ({
                                key: category.categoryID,
                                label: (
                                  <Button
                                    className={cx("b-cate")}
                                    onClick={() =>
                                      handleCategoryClick(
                                        category.categoryID,
                                        category.categoryName
                                      )
                                    }
                                  >
                                    {category.categoryName}
                                  </Button>
                                ),
                              })),
                          }}
                          placement="bottomRight"
                        >
                          <Button className={cx("b-cate")}>
                            <MenuOutlined /> <DownOutlined />
                          </Button>
                        </Dropdown>
                      </Space>
                    </div>
                  )}
                </>
              )}
            </div>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Header;