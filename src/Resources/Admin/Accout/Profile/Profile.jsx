import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { getUserById } from "../../../../Services/apiServer";
import { useSelector } from "react-redux";
import { Table } from "antd";
const cx = classNames.bind(styles);

const Profile = (props) => {
  const [dataUser, setDataUser] = useState("");
  const id = useSelector((state) => state.user?.user?.user?.id);
  // Fetch user data from API
  const fetchUser = async () => {
    try {
      const res = await getUserById(id);
      if (res && res.user) {
        setDataUser(res.user);
        console.log(res.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className={cx("PageContainer")}>
        <div className={cx("Title")}>
          <div className={cx("b-Title")}>Thông tin cá nhân </div>
        </div>
        <div className={cx("ProfileContainer")}>
          <div className="row mt-3">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className={cx("ProfileImage")}>
                {/* <img src={dataUser?.avatar} alt="Profile" /> */}
                <div className={cx("Preview")}>
                  <img
                    src="https://i.pinimg.com/564x/75/c7/2c/75c72c999bab78b504f0e331e339fbb2.jpg"
                    alt="profile"
                    className={cx("Image")}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className={cx("ProfileInfo")}>
                <div className="card mb-4 mb-lg-0 border-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <p className={cx("textProfile")}>Full Name</p>
                      </div>
                      <div className="col-sm-8">
                        <p className={cx("textProfile")}>
                          {dataUser?.username}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-4">
                        <p className={cx("textProfile")}>Email</p>
                      </div>
                      <div className="col-sm-8">
                        <p className={cx("textProfile")}>{dataUser?.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-4">
                        <p className={cx("textProfile")}>Vai trò</p>
                      </div>
                      <div className="col-sm-8">
                        <p className={cx("textProfile")}>{dataUser?.roles}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-4">
                        <p className={cx("textProfile")}>
                          Trạng thái tài khoản
                        </p>
                      </div>
                      <div className="col-sm-8">
                        <div className={cx("textProfile")}>
                          <button className={cx("active")}>
                            {dataUser?.isActives?.includes("Y")
                              ? "Yes"
                              : "Block"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button">
                <button
                  className={cx("btn-update")}
                  onClick={() => setShowModalUpdateUser(true)}
                >
                  update profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
