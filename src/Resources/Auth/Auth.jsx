import styles from "./Auth.module.scss";
import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner5 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin } from "../../Services/apiServer";
import { doLoginAction } from "../../Redux/Reducer/UserSlice";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const cx = classNames.bind(styles);

const AuthModal = (props) => {
  const { show, setShow } = props;

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeIcon = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClickLogin = async () => {
    setIsLoading(true);
    try {
      let data = await postLogin(Username, Password);
      if (data && data.success === true) {
        dispatch(doLoginAction(data));
        // localStorage.setItem("token", data.data);
        console.log("Login successful", data);
        handleClose();
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isLogin ? "Đăng nhập tài khoản!" : "Đăng ký tài khoản mới!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cx("MainForm")}>
            <div className={cx("Auth-Container")}>
              <div className={cx("Title-auth")}>
                {isLogin ? "Welcome Back!" : "Create Your Account"}
              </div>
              <div className={cx("Auth-content")}>
                <div className={cx("form-auth")}>
                  {isLogin ? (
                    // Form Đăng nhập
                    <>
                      <div className="col-md-12">
                        {/* <label className={cx("label")}>UserName:</label> */}
                        <input
                          className={cx("input")}
                          type="text"
                          placeholder="UserName"
                          value={Username}
                          onChange={(event) => setUsername(event.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        {/* <label className={cx("label")}>Password:</label> */}
                        <div className={cx("password-container")}>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={cx("input")}
                            name="password"
                            id="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                          />
                          <div className={cx("iconEye")} onClick={onChangeIcon}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Form Đăng ký
                    <>
                      <div className="col-md-12">
                        {/* <label className={cx("label")}>UserName:</label> */}
                        <input
                          className={cx("input")}
                          type="text"
                          placeholder="UserName"
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        {/* <label className={cx("label")}>Email:</label> */}
                        <input
                          className={cx("input")}
                          type="text"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        {/* <label className={cx("label")}>Password:</label> */}
                        <div className={cx("password-container")}>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={cx("input")}
                            name="password"
                            id="password"
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                          />
                          <div className={cx("iconEye")} onClick={onChangeIcon}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className={cx("spanText")}>
                    {isLogin ? (
                      <>
                        <span>Quên mật khẩu?</span>
                        <div className={cx("content")}>
                          Bạn chưa có tài khoản?
                          <button
                            className="text-decoration-none"
                            style={{
                              border: "none",
                              background: "none",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => setIsLogin(false)}
                          >
                            Đăng ký tại đây
                          </button>
                        </div>
                        <div>
                          <Button
                            className={cx("bth-login")}
                            onClick={() => handleClickLogin()}
                            disabled={isLoading}
                          >
                            {isLoading === true && (
                              <ImSpinner5 className={cx("spinner")} />
                            )}
                            Login
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={cx("content")}>
                          Bạn đã có tài khoản?
                          <button
                            className={cx("bth-text")}
                            onClick={() => setIsLogin(true)}
                          >
                            Đăng nhập tại đây
                          </button>
                        </div>
                        <div>
                          <Button className={cx("bth-register")}>
                            Register
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className={cx("hr")} />
            <div className={cx("Auth-Media")}>
              <div className={cx("Auth-Contai")}>
                <div className={cx("Title-Media")}> From with Media!</div>
                <div className={cx("btn-gr")}>
                  <Button className={cx("btn-gg")}>
                    <FcGoogle />
                    <div className={cx("b-text")}>Google</div>
                  </Button>
                  <Button className={cx("btn-fb")}>
                    <FaFacebook /> 
                    <div className={cx("b-text")}>Facebook</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthModal;
