import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Button, NavDropdown } from "react-bootstrap";
import logo from "../../../../assets/logo.png";
import AuthModal from "../../../../Resources/Auth/Auth";
import { useEffect, useState } from "react";
import { getAllCategori } from "../../../../Services/apiServer";
import { GiToggles } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

const cx = classNames.bind(styles);

const Header = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [listCategori, setListCategori] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [hiddenCategories, setHiddenCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCategoryDisplay = () => {
      const windowWidth = window.innerWidth;

      // Set how many categories will be visible based on screen size
      const maxVisibleCategories = windowWidth >= 700 ? 5 : 0; // Hiển thị 5 category trên màn hình lớn, 3 trên màn hình nhỏ

      if (listCategori && listCategori.length > maxVisibleCategories) {
        setVisibleCategories(listCategori.slice(0, maxVisibleCategories));
        setHiddenCategories(listCategori.slice(maxVisibleCategories));
      } else {
        setVisibleCategories(listCategori);
        setHiddenCategories([]);
      }
    };

    // Update category display on load and on window resize
    updateCategoryDisplay();
    window.addEventListener("resize", updateCategoryDisplay);

    return () => window.removeEventListener("resize", updateCategoryDisplay);
  }, [listCategori]);

  const fechListCategori = async () => {
    try {
      let res = await getAllCategori();
      if (res && res.categories && res.categories.length > 0) {
        setListCategori(res.categories);
      }
    } catch (error) {
      console.error("Failed to fetch list:", error);
    }
  };
  useEffect(() => {
    fechListCategori();
  }, []);

  const handleCategoryClick = (categoryID, categoryName) => {
    // Navigate to the page related to the clicked category
    navigate(`/categories/${categoryID}/${categoryName}`);
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
            <Nav.Link className="text-decoration-none">
              <Button
                className={cx("btnLogin")}
                onClick={() => setShowModal(true)}
              >
                <FaRegUser /> <div className={cx("b-text")} >Đăng nhập</div>
              </Button>
              <AuthModal
                show={showModal}
                setShow={setShowModal}
                onHide={() => setShowModal(false)}
              />
            </Nav.Link>
          </div>
        </div>
        <div className={cx("navContainer")}>
          <Navbar bg="secondary" variant="dark">
            <Container className={cx("Container")}>
              {/* Hiển thị các category visible */}
              <Nav className={cx("navItem")}>
                <Link to="/">
                  <div className={cx("IconHome")}>
                    <FaHome />
                  </div>
                </Link>
                {visibleCategories.map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link
                      onClick={() =>
                        handleCategoryClick(item.categoryID, item.categoryName)
                      }
                      className={cx("b-Categories")}
                    >
                      {item.categoryName}
                    </Nav.Link>
                  </Nav.Item>
                ))}
                {/* Nếu còn các category ẩn thì hiển thị trong Dropdown */}
                {hiddenCategories.length > 0 && (
                  <div className={cx("menu")}>
                    <Nav>
                      <NavDropdown title={<GiToggles />} id="nav-dropdown">
                        {hiddenCategories.map((item, index) => (
                          <NavDropdown.Item
                            className={cx("ulCategori")}
                            key={index}
                            onClick={() => handleCategoryClick(item.categoryID, item.categoryName)}
                          >
                            {item.categoryName}
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    </Nav>
                  </div>
                )}
              </Nav>
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Header;
