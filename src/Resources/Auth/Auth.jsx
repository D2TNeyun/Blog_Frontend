import styles from "./Auth.module.scss";
import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ImSpinner5 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogin, Register } from "../../Services/apiServer";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { doLoginAction } from "../../Redux/Reducer/UserSlice";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

const AuthModal = (props) => {
  const { show, setShow } = props;

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeIcon = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClickLogin = async () => {
    const newErr = {};
    setIsLoading(true);

    if (Username.trim() === "") {
      newErr.Username = "Tên đăng nhập không được để trống";
    }

    if (Password.trim() === "") {
      newErr.Password = "Mật khẩu không được để trống";
    } else if (Password.length < 6) {
      newErr.Password = "Mật khẩu phải ít nhất 6 ký tự";
    }

    // If there are validation errors, set them and stop further processing
    if (Object.keys(newErr).length > 0) {
      setErrors(newErr); // Assuming you have `setErrors` to handle validation errors
      setIsLoading(false);
      return;
    }

    try {
      let data = await postLogin(Username, Password);
      if (data && data.success === true) {
        dispatch(doLoginAction(data));
        // toast.success(data.Message);
        handleClose();
        navigate("/");
      } else {
        toast.error(data.Message);
        setErrors({ general: "Login failed. Please check your credentials." });
      }
    } catch (error) {
      // Explicitly handle a 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized: Invalid credentials.");
        setErrors({
          general: "Unauthorized: Invalid credentials.",
        });
      } else {
        // Handle general errors
        toast.error("An error occurred during login. Please try again later.");
        setErrors({
          general: "An error occurred during login. Please try again later.",
        });
      }
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    const newErr = {};
    setIsLoading(true);

    if (Username.trim() === "") {
      newErr.Username = "Tên đăng nhập không được để trống";
    }

    if (Password.trim() === "") {
      newErr.Password = "Mật khẩu không được để trống";
    } else if (Password.length < 6) {
      newErr.Password = "Mật khẩu phải ít nhất 6 ký tự";
    }

    if (Email.trim() == "") {
      newErr.Email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErr.Email = "Email không đúng định dạng";
    }

    // If there are validation errors, set them and stop further processing
    if (Object.keys(newErr).length > 0) {
      setErrors(newErr); // Assuming you have `setErrors` to handle validation errors
      setIsLoading(false);
      return;
    }

    try {
      let data = await Register(Username, Email, Password);
      if (data && data.success == true) {
        toast.success(data.Message);
        handleClose();
        navigate("/");
      } else {
        toast.error(data.Message);
        setErrors({ general: "Đăng ký thất bại. Vui lòng thử lại." });
      }
    } catch (error) {
      console.error("Error during register:", error);
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
                      <div
                        className={`${errors && errors.Username ? "" : "mb-4"}`}
                      >
                        <div
                          className={`${cx("groupForm")} ${
                            errors && errors.Username ? "border-danger" : ""
                          }`}
                        >
                          <label
                            htmlFor="email"
                            className={cx("iconInputForm")}
                          >
                            <FaUser />
                          </label>
                          <input
                            type="text"
                            className={cx("inputForm")}
                            name="Username"
                            id="Username"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                            placeholder="Username"
                          />
                        </div>
                        {errors && (
                          <p className={cx("error")}>{errors.Username}</p>
                        )}
                      </div>

                      <div
                        className={`${errors && errors.Password ? "" : "mb-4"}`}
                      >
                        <div
                          className={`${cx("groupForm2")} ${
                            errors && errors.Password ? "border-danger" : ""
                          }`}
                        >
                          <label
                            htmlFor="Password"
                            className={cx("iconInputForm2")}
                          >
                            <FaLock />
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={cx("inputForm2")}
                            value={Password}
                            name="Password"
                            id="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            required
                          />
                          <div className={cx("iconEye")} onClick={onChangeIcon}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        </div>
                        {errors && (
                          <p className={cx("error")}>{errors.Password}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    // Form Đăng ký
                    <>
                      <div
                        className={`${errors && errors.Email ? "" : "mb-4"}`}
                      >
                        <div
                          className={`${cx("groupForm")} ${
                            errors && errors.Email ? "border-danger" : ""
                          }`}
                        >
                          <label
                            htmlFor="email"
                            className={cx("iconInputForm")}
                          >
                            <MdEmail />
                          </label>
                          <input
                            type="text"
                            className={cx("inputForm")}
                            name="Email"
                            id="Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            placeholder="Email"
                          />
                        </div>
                        {errors && (
                          <p className={cx("error")}>{errors.Email}</p>
                        )}
                      </div>

                      <div
                        className={`${errors && errors.Username ? "" : "mb-4"}`}
                      >
                        <div
                          className={`${cx("groupForm")} ${
                            errors && errors.Username ? "border-danger" : ""
                          }`}
                        >
                          <label
                            htmlFor="email"
                            className={cx("iconInputForm")}
                          >
                            <FaUser />
                          </label>
                          <input
                            type="text"
                            className={cx("inputForm")}
                            name="Username"
                            id="Username"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                            placeholder="Username"
                          />
                        </div>
                        {errors && (
                          <p className={cx("error")}>{errors.Username}</p>
                        )}
                      </div>

                      <div
                        className={`${errors && errors.Password ? "" : "mb-4"}`}
                      >
                        <div
                          className={`${cx("groupForm2")} ${
                            errors && errors.Password ? "border-danger" : ""
                          }`}
                        >
                          <label
                            htmlFor="Password"
                            className={cx("iconInputForm2")}
                          >
                            <FaLock />
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className={cx("inputForm2")}
                            value={Password}
                            name="Password"
                            id="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            required
                          />
                          <div className={cx("iconEye")} onClick={onChangeIcon}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </div>
                        </div>
                        {errors && (
                          <p className={cx("error")}>{errors.Password}</p>
                        )}
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
                          <Button
                            className={cx("bth-register")}
                            onClick={() => handleRegister()}
                            disabled={isLoading}
                          >
                            {isLoading === true && (
                              <ImSpinner5 className={cx("spinner")} />
                            )}
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
