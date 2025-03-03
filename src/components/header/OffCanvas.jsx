import { useState, useEffect } from "react";
import { Button, Form, Offcanvas, Container, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, checkAuthStatusAsync, logout } from "../../slice/userSlice"; // Redux actions
import { useNavigate } from "react-router-dom";

function OffCanvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, isAuthenticated, error, loading } = useSelector((state) => state.user); // Get Redux state

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
    setValue, // To programmatically set field values
  } = useForm();

  useEffect(() => {
    dispatch(checkAuthStatusAsync()); // Check authentication status on mount
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      console.log("登入中...");
    } else if (error) {
      toast.error(error);
    } else if (isAuthenticated) {
      toast.success("登入成功！");
      setShowLogin(false); // Close login modal after successful login
    }
  }, [userName, isAuthenticated, error, loading]);

  const handleLoginFormSubmit = async (data) => {
    dispatch(loginUser(data.loginEmail, data.loginPassword)); // Dispatch login action
  };

  const handleRegisterFormSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "密碼不一致" });
      toast.error("密碼不一致");
      return;
    }

    dispatch(registerUser(data.email, data.password, data.name)); // Dispatch register action
    if (!error) {
      toast.success("註冊成功！");
      setShowRegister(false);
      setShowLogin(true);
      reset();
    } else {
      toast.error("此Email 已經註冊！");
    }
  };

  const handleLogout = async () => {
    dispatch(logout()); // Dispatch logout action to clear user data from Redux
    toast.success("已登出！");
  };

  const handleDemoLogin = () => {
    const demoEmail = "demo@mail.com";
    const demoPassword = "123456";
    setValue("loginEmail", demoEmail);
    setValue("loginPassword", demoPassword);
    handleLoginSubmit(handleLoginFormSubmit)();
    setShowLogin(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    navigate("/cart");
  };

  return (
    <Container className="mt-5">
      <div className="d-flex align-items-center">
        <ul className="d-none d-md-block list-unstyled d-md-flex align-items-md-center">
          {isAuthenticated ? (
            <>
              <li className="fs-5 fw-semibold me-2 text-gary-500">{userName}  先生/小姐，您好</li>
              <li className="ms-10">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as={Button}
                    variant="primary"
                    className="rounded-circle mt-2 btn-primary-500"
                    id="dropdown-user-menu"
                  >
                    <i className="bi bi-person fs-5"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="mt-2">
                    <Dropdown.Item onClick={handleLogout}>登出</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          ) : (
            <li>
              <Button
                className="border-0 bg-tertiary-500 py-2 text-white fs-6 fw-semibold"
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  resetLoginForm();
                  reset();
                  setShowLogin(true);
                }}
              >
                登入 / 註冊
              </Button>
            </li>
          )}
        </ul>

        <li className="d-flex list-unstyled ms-3">
          <button
            type="button"
            className="d-block d-md-none btn btn-outline-white rounded-circle"
            onClick={handleCartClick}
          >
            <i className="bi bi-cart3 fs-5"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-primary-500 rounded-circle"
            onClick={handleCartClick}
          >
            <i className="bi bi-cart3 fs-5"></i>
          </button>
        </li>
      </div>

      {/* Login Form */}
      <Offcanvas show={showLogin} onHide={() => setShowLogin(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="h3 text-center">登入</div>
          <Form onSubmit={handleLoginSubmit(handleLoginFormSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                {...loginRegister("loginEmail", {
                  required: "Email 必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email 格式錯誤',
                  },
                })}
              />
              {loginErrors.loginEmail && <span className="text-danger">{loginErrors.loginEmail.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoComplete="current-password"
                {...loginRegister("loginPassword", { required: "密碼必填" })}
              />
              {loginErrors.loginPassword && <span className="text-danger">{loginErrors.loginPassword.message}</span>}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-50" disabled={loading}>
              {loading ? "登入中..." : "登入"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                reset();
                setShowLogin(false);
                setShowRegister(true);
              }}
              className="w-50"
            >
              註冊
            </Button>
            <div className="text-center mt-3">
              <a href="#" id="clientLogin" onClick={handleDemoLogin} className="btn btn-link">Demo登入</a>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Register Form */}
      <Offcanvas show={showRegister} onHide={() => setShowRegister(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="h3 text-center">註冊</div>
          <Form onSubmit={handleRegisterSubmit(handleRegisterFormSubmit)}>
            {/* Register form fields... */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email" placeholder="email@example.com"
                {...registerForm("email", {
                  required: "Email 必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email 格式錯誤',
                  }
                })}
              />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>姓名</Form.Label>
              <Form.Control
                type="text"
                placeholder="請使用本名" autoComplete="username"
                {...registerForm('name', {
                  required: '姓名必填',
                  minLength: { value: 2, message: '姓名至少2個字符' }
                })}
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>密碼</Form.Label>
              <Form.Control
                type="password" placeholder="password" autoComplete="new-password"
                {...registerForm("password", { required: "密碼必填", minLength: { value: 6, message: '密碼至少6個字符' } })}
              />
              {errors.password && <span className="text-danger">{errors.password.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>確認密碼</Form.Label>
              <Form.Control
                type="password" placeholder="password" autoComplete="new-password"
                {...registerForm("confirmPassword", { required: "確認密碼必填" })}
              />
              {errors.confirmPassword && (
                <span className="text-danger">{errors.confirmPassword.message}</span>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-50" disabled={loading}>
              {loading ? "註冊中..." : "註冊"}
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                setShowRegister(false);
                resetLoginForm();
                setShowLogin(true);
                reset();
              }}
              className="w-50"
            >
              返回登入
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer />
    </Container>
  );
}

export default OffCanvas;
