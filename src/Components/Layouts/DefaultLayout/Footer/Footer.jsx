import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { getAllCategori } from "../../../../Services/apiServer";

import logo from "../../../../assets/logo.png";
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined   } from "@ant-design/icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Footer = (props) => {
  const [listCategori, setListCategori] = useState([]);

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
  return (
    <>
      <div className={cx("footer")}>
        <div className={cx("footer-top")}>
          <div className={cx("container")}>
            <ul className={cx("list-categori")}>
              {listCategori.map((item) => (
                <li className={cx("list")} key={item.categoryID}>
                  {item.categoryName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={cx("footer__middle")}>
          <div className={cx("container")}>
            <div className={cx("footer__middle-flex")}>
              <div className={cx("logo")}>
                <img src={logo} alt="logo" className={cx("b-img")} />
              </div>
              <div className={cx("footer__m-content")}>
                <div className={cx("b-list")}>
                  <Link to="/policy" className={cx("listItem")} >Chính sách bảo mật</Link>
                  <Link to="/information" className={cx("listItem")}>Giới thiệu</Link>
                </div>
                <div className={cx("social")}>
                  <span>Theo dõi</span>
                  <div className={cx("list-sc")}>
                    <div className={cx("item")}>
                       <a href="http://"> <YoutubeOutlined/></a>
                       <a href="http://"> <FacebookOutlined/></a>
                       <a href="http://"> <InstagramOutlined/></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("footer__bottom")}>
            <div className={cx("container")}>
            <div className={cx("footer__bottom-flex")}>
                    <div className={cx("footer__contact")}>
                        <p className="text">Hotline</p>
                        <p className="value">038 5500 502</p>
                        <p className="text">Liên hệ quảng cáo</p>
                        <p className="value">0906 645 777</p>
                    </div>
                    <div className={cx("footer__info")}>
                        <p className="text">
                            Tổng biên tập: Danh Trần Thảo Nguyên
                        </p>
                        <p className="text">
                            Phó tổng biên tập: Thạch Thị Thảo Trang 
                        </p>
                        <p className="text" ms-plugin="multiple-text">
                            Phó tổng biên tập: Lý Tú Nguyên</p>
                        <p className="text" ms-plugin="multiple-text">
                            Phó tổng biên tập - Tổng Thư ký tòa soạn: Kim DaLin
                        </p>
                    </div>
                    <div className={cx("copy-right")}>
                        Giấy phép xuất bản số 110/GP - BTTTT cấp ngày 24.3.2023
                        © 2023-2024 Bản quyền thuộc về Tin Tức Cần Thơ. Cấm sao chép dưới mọi hình thức nếu không có sự
                        chấp
                        thuận bằng văn bản.
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
