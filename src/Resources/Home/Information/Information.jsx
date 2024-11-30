import styles from "./Information.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Information = () => {
  return (
    <>
      <div className="row"></div>
      <div className={cx("Main")}>
        <div className={cx("infor")}>
          <div className={cx("inforContainer")}>
            <div className={cx("b-title")}>
              <p>Thông Tin Giới Thiệu</p>
            </div>
            <div className={cx("info-box")}>
              <div className={cx("boxItem")}>
                <div className={cx("avatar")}>
                  <img
                    src="https://res.cloudinary.com/nguyenah/image/upload/v1732690678/learn_nodejs/avatar2_idxu0g.webp"
                    alt=""
                  />
                </div>
                <div className={cx("infor-content")}>
                  <h6>Danh Trần Thảo Nguyên</h6>
                  <p>Tổng biên tập</p>
                </div>
              </div>
              <div className={cx("boxItem")}>
                <div className={cx("avatar")}>
                  <img
                    src="https://res.cloudinary.com/nguyenah/image/upload/v1732690707/learn_nodejs/avatar4_qt9wz6.avif"
                    alt=""
                  />
                </div>
                <div className={cx("infor-content")}>
                  <h6>Thạch Thị Thảo Trang</h6>
                  <p>Phó Tổng biên tập</p>
                </div>
              </div>
              <div className={cx("boxItem")}>
                <div className={cx("avatar")}>
                  <img
                    src="https://res.cloudinary.com/nguyenah/image/upload/v1732690710/learn_nodejs/avatar3_ol7zsx.png"
                    alt=""
                  />
                </div>
                <div className={cx("infor-content")}>
                  <h6>Nguyên Thanh Ngọc</h6>
                  <p>Phó tổng biên tập</p>
                </div>
              </div>
              <div className={cx("boxItem")}>
                <div className={cx("avatar")}>
                  <img
                    src="https://res.cloudinary.com/nguyenah/image/upload/v1732690707/learn_nodejs/avatar4_os9fhy.png"
                    alt=""
                  />
                </div>
                <div className={cx("infor-content")}>
                  <h6>Kim Da Lin</h6>
                  <p>Tổng thư ký</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <p>Văn Phòng Đại Diện</p>
        </div>
        <div className={cx("address")}>
          <div className={cx("block-title")}>
            <div className={cx("b-title")}>
              Văn phòng đại diện khu vực quận Ninh Kiều
            </div>
            <div className={cx("block")}>
              <p>Địa chỉ</p>
              <p>
                Đại học Cần Thơ khu II, đường 3/2, phường Xuân Khánh, quận Ninh
                Kiều, Thành phố Cần Thơ
              </p>
            </div>

            <div className={cx("group-info")}>
              <div className={cx("infoItem")}>
                <p>Điện thoại</p>
                <p>0385500502</p>
              </div>
              <div className={cx("infoItem")}>
                <p>Email</p>
                <p>nguyendanh.st03@gmail.com</p>
              </div>
            </div>
          </div>
          <div className={cx("block-title")}>
            <div className={cx("b-title")}>
              Văn phòng đại diện khu vực quận Bình Thủy
            </div>
            <div className={cx("block")}>
              <p>Địa chỉ</p>
              <p>
                Đường 172/18, phường An Thới, quận Bình Thủy, Thành phố Cần Thơ
              </p>
            </div>

            <div className={cx("group-info")}>
              <div className={cx("infoItem")}>
                <p>Điện thoại</p>
                <p>0386700173</p>
              </div>
              <div className={cx("infoItem")}>
                <p>Email</p>
                <p>thaotrang.@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
