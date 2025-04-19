import { useState, useEffect } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logout,
} from "../../slice/userSlice"; // Redux actions
import { initCartNum, asyncCart } from "../../slice/cartSlice";
import { pushToast } from "../../slice/toastSlice";
import { useNavigate } from "react-router-dom";

function OffCanvasSm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  ); // Get Redux state
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const cartNum = useSelector((state) => state.cart.num);

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
    if (loading) {
      console.log("登入中...");
    } else if (error) {
      dispatch(
        pushToast({
          type: "error",
          message: error,
        })
      );
    } else if (isAuthenticated) {
      dispatch(
        pushToast({
          type: "success",
          message: "登入成功！",
        })
      );
      dispatch(asyncCart());
      setShowLogin(false); // Close login modal after successful logins
    }
  }, [userName, isAuthenticated, error, loading, dispatch]);

  const handleLoginFormSubmit = async (data) => {
    dispatch(loginUser(data.loginEmail, data.loginPassword)); // Dispatch login action
  };

  const handleRegisterFormSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "密碼不一致" });
      dispatch(
        pushToast({
          type: "error",
          message: "密碼不一致",
        })
      );
      return;
    }

    dispatch(registerUser(data.email, data.password, data.name)); // Dispatch register action
    if (!error) {
      dispatch(
        pushToast({
          type: "success",
          message: "註冊成功！",
        })
      );
      setShowRegister(false);
      setShowLogin(true);
      reset();
    } else {
      dispatch(
        pushToast({
          type: "error",
          message: "此Email 已經註冊！",
        })
      );
    }
  };

  const handleLogout = async () => {
    dispatch(initCartNum());
    dispatch(logout()); // Dispatch logout action to clear user data from Redux
    dispatch(
      pushToast({
        type: "success",
        message: "已登出！",
      })
    );
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    const demoEmail = "demo@mail.com";
    const demoPassword = "123456";
    setValue("loginEmail", demoEmail);
    setValue("loginPassword", demoPassword);
    handleLoginSubmit(handleLoginFormSubmit)();
    setShowLogin(false);
    // setShowMenu(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    navigate("/cart");
  };


  //MOBILE VIEW
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const regions = ['北部', '中部', '南部', '東部'];
  const categories = {
    北部: ['葉菜類', '根莖瓜果類', '菌菇類', '安心水果類'],
    中部: ['葉菜類', '根莖瓜果類', '菌菇類', '安心水果類'],
    南部: ['葉菜類', '根莖瓜果類', '菌菇類', '安心水果類'],
    東部: ['葉菜類', '根莖瓜果類', '菌菇類', '安心水果類'],
  };
  const items = {
    '葉菜類': ['花椰菜', '高麗菜', '芥菜', '龍鬚菜', '蔖筍'],
    '根莖瓜果類': ['馬鈴薯', '芋頭', '玉米', '南瓜'],
    '菌菇類': ['香菇', '木耳', '金針菇'],
    '安心水果類': ['芭樂', '鳳梨', '梨子', '香蕉', '文旦', '釋迦'],
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setCurrentLevel(1);  // 進入第二層
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentLevel(2);  // 進入第三層
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCurrentLevel(3);  // 完成第三層選擇
    setShowMenu(false);
    navigate(`/products/search/${item}`);
  };

  const resetMenu = () => {
    setSelectedRegion(null);
    setSelectedCategory(null);
    setSelectedItem(null);
    setCurrentLevel(0); // 返回到第一層
  };

  return (
    <>
      {/* 針對手機版本顯示 menu 和 logo */}
      <div className="d-md-none w-100  mx-auto" >
        <div className="w-100 align-items-center d-flex justify-content-between px-5" style={{ height: '40px' }}>
          <div style={{ maxWidth: '40px' }}>
            <button
              type="button"
              className="btn border-0 p-0"
              onClick={(e) => {
                e.preventDefault();
                resetMenu();
                setShowMenu(true);
              }}
            >
              <img
                className="menu-icon"
                src="/nong_nong_react/images/icon/menu.svg"
                alt="menu"
                style={{ width: '100%' }}
              />
            </button>
          </div>
          <div className="flex-grow-1 d-flex justify-content-center">
            <Link to="/">
              <img
                className="img-fluid mobile-header header-logo"
                srcSet="/nong_nong_react/images/logo/logo_horizontal_white.png"
                alt="logo" style={{ maxHeight: '50px' }}
              />
            </Link>
          </div>
          {/* 右側 cart icon */}
          <div style={{ maxWidth: '40px' }}>
            <div className=" d-flex rounded-circle ms-3 mx-auto justify-content-center align-items-center  border-3 "
              style={{
                width: '38px',
                height: '38px',
                border: '2px solid white',
                borderRadius: '50%',
              }}>
              <button
                type="button"
                className="btn p-0 btn-outline-primary-500  position-relative "
                // className="btn p-0 position-relative bg-transparent border-0"
                onClick={handleCartClick}
              >
                {/* <i className="bi bi-cart3 fs-5"></i> */}
                <img alt="cart" src="\nong_nong_react\images\icon\cart-white.svg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                >
                </img>
                <span
                  className={`position-absolute start-100 translate-middle badge rounded-circle bg-secondary-700 py-1 px-2 ${cartNum == 0 && "d-none"
                    }`}
                  style={{ top: "-4px", left: "90%" }}
                >
                  {cartNum}
                </span>
              </button>
            </div>
          </div>
        </div >
      </div >

      {/* mobile Menu */}
      < Offcanvas Offcanvas show={showMenu} onHide={() => setShowMenu(false)
      }>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {currentLevel === 0 && (
            <>
              <div className="mb-6" style={{
                backgroundColor: '#EDE4CB',
                height: '38px',
                padding: '4px 15px',
                fontFamily: 'Noto Sans',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '0.05px',
                listStyle: 'none',
                margin: 0,
              }}>
                <span className=" text-left text-primary-500">
                  所有地區
                </span>
              </div>
              <ul className="list-unstyled list-group">
                {regions.map((region) => (
                  <a key={region} type="button"
                    className="list-group-item list-group-item-action d-flex justify-content-between mb-4 text-gary-500  border-0" onClick={() => handleRegionClick(region)}>
                    {region}
                    <img className="menu-icon"
                      src="/nong_nong_react/images/icon/prev_next.svg"
                      alt="prev_next"></img>
                  </a>
                ))}
              </ul>
            </>
          )}
          {currentLevel === 1 && selectedRegion && (
            <div>
              <div className="mb-6" style={{
                maxWidth: '100%',
                backgroundColor: '#EDE4CB',
                height: '38px',
                padding: '4px 12px',
                fontFamily: 'Noto Sans',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '0.05px',
                listStyle: 'none',
                margin: 0,
              }}>
                <a onClick={() => {
                  setCurrentLevel(0);
                  setSelectedRegion(null);
                }}>
                  <img className="menu-icon" style={{ transform: 'rotate(180deg)', width: '16px', maxWidth: '100%', margin: '7px', cursor: 'pointer' }}
                    src="/nong_nong_react/images/icon/arrow.svg"
                    alt="back-arrow"></img>
                </a>
                <span className="text-left text-primary-500">
                  {selectedRegion} / 所有種類
                </span>
              </div>

              <ul className="list-unstyled list-group">
                {categories[selectedRegion].map((category) => (

                  <a key={category} type="button"
                    className="list-group-item list-group-item-action d-flex justify-content-between mb-4 text-gary-500 border-0" onClick={() => handleCategoryClick(category)}>
                    {category}
                    <img className="menu-icon"
                      src="/nong_nong_react/images/icon/prev_next.svg"
                      alt="prev_next"></img>
                  </a>
                ))}
              </ul>
            </div>
          )}
          {currentLevel === 2 && selectedCategory && (
            <div>
              <div className="mb-6" style={{
                // width: '269px',
                backgroundColor: '#EDE4CB',
                height: '38px',
                padding: '4px 12px',
                fontFamily: 'Noto Sans',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '30px',
                letterSpacing: '5%',
                listStyle: 'none',
                margin: 0,
              }}>
                <a onClick={() => {
                  setCurrentLevel(1);
                  setSelectedCategory(null);
                }}>
                  <img className="menu-icon" style={{ transform: 'rotate(180deg)', width: '16px', maxWidth: '100%', margin: '7px', cursor: 'pointer' }}
                    src="/nong_nong_react/images/icon/arrow.svg"
                    alt="back-arrow"></img>
                </a>
                <span className="text-left text-primary-500">
                  {selectedRegion} / {selectedCategory} / 所有項目
                </span>
              </div>

              <ul className="list-unstyled list-group">
                {items[selectedCategory].map((item) => (<>

                  <a key={item} type="button"
                    className="list-group-item list-group-item-action d-flex justify-content-between mb-4 text-gary-500  border-0" onClick={() => handleItemClick(item)}>
                    {item}
                    <img className="menu-icon"
                      src="/nong_nong_react/images/icon/prev_next.svg"
                      alt="prev_next"></img>
                  </a>

                </>
                ))}
              </ul>
            </div>
          )}

          <ul className=" list-unstyled  ">
            {isAuthenticated ? (
              <>
                <div className="mb-6 " style={{
                  backgroundColor: '#EDE4CB',
                  height: '38px',
                  padding: '4px 15px',
                  fontFamily: 'Noto Sans',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '30px',
                  letterSpacing: '0.05px',
                  listStyle: 'none',
                  margin: 0,
                  maxWidth: '1200px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  <span className="text-left text-primary-500">
                    會員中心
                  </span>
                </div>
                <ul className="list-unstyled list-group">
                  <a type="button" className="list-group-item list-group-item-action d-flex justify-content-between mb-4 text-gary-500  border-0" onClick={handleLogout}>登出</a>
                </ul>
              </>
            ) : (<></>)}
          </ul>
        </Offcanvas.Body>


        <ul className=" list-unstyled  ">
          {isAuthenticated ? (
            <>
              <div className="d-flex ml-4" style={{ marginBottom: '40px', marginLeft: '24px' }}>
                <div className="mr-5">
                  <li className=" fw-semibold me-2 text-gary-500 mr-3 align-items-center">
                    <img className="rounded-circle object-fit-cover author-img" style={{ width: '48px', maxWidth: '100%' }}
                      src="/nong_nong_react/images/index/avatar_default.png"
                      alt="member"></img>
                  </li>
                </div>
                <div>
                  <li className="fs-6 fw-semibold me-2 text-gary-500 align-items-center" style={{ fontWeight: '600' }}>
                    {userName}
                  </li>
                  <li className="fs-6 fw-semibold me-2 text-gary-500 align-items-center">
                    先生/小姐，您好
                  </li>
                </div>
              </div>
            </>) : (
            <button
              className="w-100 border-0 bg-tertiary-500 py-2 text-white login-button fs-4"
              style={{ height: '52px' }}
              // variant="primary"
              onClick={(e) => {
                e.preventDefault();
                resetLoginForm();
                reset();
                setShowLogin(true);
              }}
            >
              登入 / 註冊
            </button>
          )}
        </ul>


        {/* Login Form */}
        <Offcanvas show={showLogin} onHide={() => setShowLogin(false)
        }>
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
                      message: "Email 格式錯誤",
                    },
                  })}
                />
                {loginErrors.loginEmail && (
                  <span className="text-danger">
                    {loginErrors.loginEmail.message}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>密碼</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  {...loginRegister("loginPassword", { required: "密碼必填" })}
                />
                {loginErrors.loginPassword && (
                  <span className="text-danger">
                    {loginErrors.loginPassword.message}
                  </span>
                )}
              </Form.Group>
              <div className="pt-12 d-flex justify-content-between">
                <button
                  // variant="secondary"
                  onClick={() => {
                    reset();
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                  className="btn btn-outline-primary-500"
                  style={{ width: "45%" }}
                >
                  註冊
                </button>
                <button
                  // variant="primary"
                  type="submit"
                  className="w-50 btn btn-primary-500"
                  disabled={loading}
                  style={{ width: "40%" }}
                >
                  {loading ? "登入中..." : "登入"}
                </button>
              </div>
              <div className="text-center mt-3">
                <a
                  href="#"
                  id="clientLogin"
                  onClick={(e) => {
                    handleDemoLogin(e);
                  }}
                  className="btn btn-link"
                >
                  以 Demo 帳號登入
                </a>
              </div>
            </Form>
          </Offcanvas.Body>

          {/* Register Form */}
          < Offcanvas show={showRegister} onHide={() => setShowRegister(false)}>
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
                    type="email"
                    placeholder="email@example.com"
                    {...registerForm("email", {
                      required: "Email 必填",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email 格式錯誤",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>姓名</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="請使用本名"
                    autoComplete="username"
                    {...registerForm("name", {
                      required: "姓名必填",
                      minLength: { value: 2, message: "姓名至少2個字符" },
                    })}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name.message}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>密碼</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    {...registerForm("password", {
                      required: "密碼必填",
                      minLength: { value: 6, message: "密碼至少6個字符" },
                    })}
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password.message}</span>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>確認密碼</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    {...registerForm("confirmPassword", {
                      required: "確認密碼必填",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-danger">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </Form.Group>
                <div className="pt-12 d-flex justify-content-between">
                  <button
                    // variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowRegister(false);
                      resetLoginForm();
                      setShowLogin(true);
                      reset();
                    }}
                    className="btn btn-outline-primary-500"
                    style={{ width: "45%" }}
                  >
                    返回登入
                  </button>
                  <button
                    // variant="primary"
                    type="submit"
                    className="w-50 btn btn-primary-500"
                    disabled={loading}
                    style={{ width: "40%" }}
                  >
                    {loading ? "註冊中..." : "註冊"}
                  </button>
                </div>
              </Form>
            </Offcanvas.Body>
          </Offcanvas >
          {/*  </Container > */}

          );
        </Offcanvas >
      </Offcanvas >
    </>
  );
}
export default OffCanvasSm;
