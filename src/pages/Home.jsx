import { useEffect, useState } from "react";
import { Swiper } from "swiper/bundle";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

import { Modal } from 'react-bootstrap';

const areas = ["北部", "中部", "南部", "東部"];
const categories = ["葉菜類", "根莖瓜果類", "菌菇類", "安心水果類"];

function Home() {
  const [newGoods, setNewGoods] = useState([]);
  const [hotGoods, setHotGoods] = useState([]);
  const [heartGoods, setHeartGoods] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [menuCate, setMenuCate] = useState([]);

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const [newLoading, setNewLoading] = useState(false);
  const [hotLoading, setHotLoading] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  const [showModal, setShowModal] = useState(true);

  const handleClose = () => setShowModal(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/search/${query}`);
  };

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    setMenuCate(categories);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNewProducts = async () => {
    try {
      setNewLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/products?search=最新上架`
      );
      setNewGoods(result.data.data[0].results);
      setNewLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getHotProducts = async () => {
    try {
      setHotLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/products?search=熱門商品`
      );
      setHotGoods(result.data.data[0].results);
      setHotLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getHeartProducts = async () => {
    try {
      setHeartLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/products?search=捐贈`
      );
      setHeartGoods(result.data.data[0].results);
      setHeartLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    new Swiper(".banner-swiper", {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 3000, // N秒切换一次
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    const swiper = new Swiper(".idx-comment-list", {
      slidesPerView: 3,
      spaceBetween: 24,
      direction: width <= 374 ? "vertical" : "horizontal",
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
      },
      on: {
        resize: function () {
          console.log(swiper, width <= 374 ? "vertical" : "horizontal");
          swiper.changeDirection(width <= 374 ? "vertical" : "horizontal");
        },
      },
    });

    document.querySelector(".search-tag-list").style.display = "none";

    getNewProducts();
    getHotProducts();
    getHeartProducts();
  }, []);

  useEffect(() => {
    new Swiper(".mySwiper", {
      slidesPerView: 4,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 3000, //N秒切换一次
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2.3,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 24,
        },
      },
    });
  }, [newLoading]);

  useEffect(() => {
    new Swiper(".hotSwiper", {
      slidesPerView: 4,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4000, //N秒切换一次
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2.3,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 24,
        },
      },
    });
  }, [hotLoading]);

  useEffect(() => {
    new Swiper(".idx-heart-swiper", {
      slidesPerView: 2,
      spaceBetween: 6,
      autoplay: {
        delay: 2500, //N秒切换一次
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2.3,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 24,
        },
      },
    });
  }, [heartLoading]);

  // 控制點擊搜尋框顯示搜尋標籤
  const openSearch = () => {
    const searchInp = document.querySelector(".search-inp");
    if (searchInp.getAttribute("class").indexOf("show") > -1) {
      document.querySelector(".search-tag-list").style.display = "block";
    } else {
      document.querySelector(".search-tag-list").style.display = "none";
    }
  };

  return (
    <>
      <div className="idx-banner">
        <div className="swiper banner-swiper">
          <div className="swiper-wrapper idx-banner-item">
            <div className="swiper-slide">
              <picture>
                <source
                  media="(min-width: 375px)"
                  srcSet="../images/index/banner/banner-01.png"
                />
                <img src="../images/index/banner/banner-mobile-01.png" />
              </picture>
            </div>
            <div className="swiper-slide">
              <picture>
                <source
                  media="(min-width: 375px)"
                  srcSet="../images/index/banner/banner-02.png"
                />
                <img src="../images/index/banner/banner-mobile-02.png" />
              </picture>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="d-none d-md-flex justify-content-center position-absolute idx-search">
          <div className="d-flex align-items-center position-relative pt-15 idx-search-item">
            <input
              type="text"
              className="form-control text-gary-500 px-10 dropdown-toggle search-inp"
              placeholder="請輸入關鍵字..."
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={openSearch}
            />
            <a
              className="position-absolute end-0 me-11 text-primary-300"
              href="#"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </a>

            <div className="search-tag-list position-absolute">
              <ul className="list-unstyled search-tags">
                <li className="search-tag">
                  <Link to={`/products/search/有機`}>#有機</Link>
                </li>
                <li className="search-tag">
                  <Link to={`/products/search/捐贈`}>#捐贈</Link>
                </li>
                <li className="search-tag">
                  <Link to={`/products/search/熱門`}>#熱門</Link>
                </li>
                <li className="search-tag">
                  <Link to={`/products/search/最新`}>#最新</Link>
                </li>
              </ul>
            </div>

            {/* 搜尋選單 */}
            <div className="dropdown-menu mt-4 overflow-hidden text-gary-500">
              <div className="d-flex">
                {/* 選單第一層 */}
                <ul className="list-unstyled dropdown-menu-lev-one">
                  <li className="mb-6">
                    <a href="#" className="search-item search-item-all">
                      所有地區
                    </a>
                  </li>

                  {areas.map((area) => (
                    <li
                      key={area}
                      className={`${
                        selectedArea === area ? "item-current" : ""
                      }`}
                    >
                      <a
                        className="search-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAreaClick(area);
                        }}
                      >
                        {area}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* 選單第二層 */}
                <ul className="list-unstyled dropdown-menu-lev-two">
                  <li className="mb-6">
                    <Link
                      to={`/products`}
                      className="search-item search-item-all"
                    >
                      所有種類
                    </Link>
                  </li>
                  {menuCate.map((category) => (
                    <li key={category}>
                      <Link
                        to={`/products/search/${category}`}
                        className="search-item"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="idx-product">
        <div className="container-md">
          <div className="idx-product-list">
            <div className="idx-product-cat d-flex justify-content-between mb-md-13 mb-6">
              <div className="idx-cat-name d-flex align-items-center">
                <img
                  src="../images/icon/rice_ears.png"
                  className="me-2 me-md-6"
                />
                <h2 className="text-primary-500 fs-4 fs-md-2 fw-700">
                  最新上架
                </h2>
              </div>
              <Link to={`/products`} className="read-more">
                看更多<i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            {newLoading ? (
              <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <RiseLoader color="#966A09" size={30} />
              </div>
            ) : (
              <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                  {newGoods.map((product) => (
                    <div
                      className="swiper-slide idx-goods-item"
                      key={product._id}
                    >
                      <div className="img-box">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src="../images/index/product-01.jpg"
                            className="card-img-top goods-pic"
                            alt="..."
                          />
                        </Link>
                        {product.tags.productType.length > 0 ? (
                          <div className="tag-cat-list">
                            {product.tags.productType.map((cat, idx) => (
                              <span className="product-cat-tag" key={idx}>
                                {cat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                        {product.tags.keywords.length > 0 ? (
                          <div className="tag-list">
                            {product.tags.keywords.map((tag, idx) => (
                              <span className="product-tag" key={idx}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="card-body">
                        <Link to={`/product/${product._id}`}>
                          <h3 className="card-title mb-1">{product.name}</h3>
                        </Link>

                        <span className="text-gary-500 mb-2">
                          {product.unit}
                        </span>

                        <div className="d-flex flex-column flex-md-row justify-content-md-between">
                          <div className="goods-price mb-2 mb-md-0">
                            <span className="text-primary-500 fw-bold fs-6 fs-md-4 me-4">
                              NT.{product.price}
                            </span>
                            <span className="old-price text-gary-500">
                              <del>NT.{product.originalPrice}</del>
                            </span>
                          </div>
                          <a href="#" className="buy-btn buy-btn-primary">
                            <i className="bi bi-cart3"></i>
                            <span className="ms-2 d-md-none">加入購物車</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-button-next swiper-btn-white d-none d-lg-flex btn-swiper">
                  <i className="bi bi-arrow-right-short fs-1 text-primary-500"></i>
                </div>
                <div className="swiper-button-prev swiper-btn-white d-none d-lg-flex btn-swiper">
                  <i className="bi bi-arrow-left-short fs-1 text-primary-500"></i>
                </div>
              </div>
            )}
          </div>

          <div className="idx-product-list">
            <div className="idx-product-cat d-flex justify-content-between mb-md-13 mb-6">
              <div className="idx-cat-name d-flex align-items-center">
                <img
                  src="../images/icon/rice_ears.png"
                  className="me-2 me-md-6"
                />
                <h2 className="text-primary-500 fs-4 fs-md-2 fw-700">
                  熱門商品
                </h2>
              </div>
              <Link to={`/products`} className="read-more">
                看更多<i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            {hotLoading ? (
              <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <RiseLoader color="#966A09" size={30} />
              </div>
            ) : (
              <div className="swiper hotSwiper">
                <div className="swiper-wrapper">
                  {hotGoods.map((product) => (
                    <div
                      className="swiper-slide idx-goods-item"
                      key={product._id}
                    >
                      <div className="img-box">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src="../images/index/product-01.jpg"
                            className="card-img-top goods-pic"
                            alt="..."
                          />
                        </Link>
                        {product.tags.productType.length > 0 ? (
                          <div className="tag-cat-list">
                            {product.tags.productType.map((cat, idx) => (
                              <span className="product-cat-tag" key={idx}>
                                {cat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                        {product.tags.keywords.length > 0 ? (
                          <div className="tag-list">
                            {product.tags.keywords.map((tag, idx) => (
                              <span className="product-tag" key={idx}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="card-body">
                        <Link to={`/product/${product._id}`}>
                          <h3 className="card-title mb-1">{product.name}</h3>
                        </Link>
                        <span className="text-gary-500 mb-2">
                          {product.unit}
                        </span>

                        <div className="d-flex flex-column flex-md-row justify-content-md-between">
                          <div className="goods-price mb-2 mb-md-0">
                            <span className="text-primary-500 fw-bold fs-6 fs-md-4 me-4">
                              NT.{product.price}
                            </span>
                            <span className="old-price text-gary-500">
                              <del>NT.{product.originalPrice}</del>
                            </span>
                          </div>
                          <a href="#" className="buy-btn buy-btn-primary">
                            <i className="bi bi-cart3"></i>
                            <span className="ms-2 d-md-none">加入購物車</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-button-next swiper-btn-white d-none d-lg-flex btn-swiper">
                  <i className="bi bi-arrow-right-short fs-1 text-primary-500"></i>
                </div>
                <div className="swiper-button-prev swiper-btn-white d-none d-lg-flex btn-swiper">
                  <i className="bi bi-arrow-left-short fs-1 text-primary-500"></i>
                </div>
              </div>
            )}
          </div>

          <div className="idx-heart-list">
            <div className="idx-product-cat d-flex justify-content-center mb-md-13 mb-6">
              <div className="idx-cat-name d-flex">
                <img
                  src="../images/icon/patten_left.png"
                  className="me-10 me-md-13"
                />
                <h2 className="text-secondary-700 fs-4 me-10 me-md-13">
                  傳遞心意
                </h2>
                <img src="../images/icon/patten_right.png" className="me-1" />
              </div>
            </div>

            {heartLoading ? (
              <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <RiseLoader color="#966A09" size={30} />
              </div>
            ) : (
              <div className="swiper idx-heart-swiper">
                <div className="swiper-wrapper">
                  {heartGoods.map((product) => (
                    <div
                      className="swiper-slide idx-goods-item"
                      key={product._id}
                    >
                      <div className="img-box">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src="../images/index/product-03.jpg"
                            className="card-img-top goods-pic"
                            alt="..."
                          />
                        </Link>
                        {product.tags.productType.length > 0 ? (
                          <div className="tag-cat-list">
                            {product.tags.productType.map((cat, idx) => (
                              <span className="product-cat-tag" key={idx}>
                                {cat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                        {product.tags.keywords.length > 0 ? (
                          <div className="tag-list">
                            {product.tags.keywords.map((tag, idx) => (
                              <span className="product-tag" key={idx}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="card-body">
                        <Link to={`/product/${product._id}`}>
                          <h3 className="card-title mb-1">{product.name}</h3>
                        </Link>
                        <span className="text-gary-500 mb-2 mb-md-0">
                          {product.unit}
                        </span>

                        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-start align-items-md-end">
                          <div className="goods-price mb-2 mb-md-0">
                            <span className="text-secondary-700 fw-bold fs-6 fs-md-4 me-4">
                              NT.{product.price}
                            </span>
                            <span className="old-price text-gary-500">
                              <del>NT.{product.originalPrice}</del>
                            </span>
                          </div>
                          <a href="#" className="buy-btn buy-btn-secondary">
                            <i className="bi bi-cart3"></i>
                            <span className="ms-2 d-md-none">加入購物車</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-button-next swiper-btn-white"></div>
                <div className="swiper-button-prev swiper-btn-white"></div>
              </div>
            )}

            <div className="heart-read-more w-100">
              <div className="d-flex justify-content-center">
                <Link to={`/products`} className="readmore">
                  <svg
                    className="me-2"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 512 512"
                  >
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                  </svg>
                  <span>看更多產品</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="idx-brand">
        <div className="container">
          <div className="text-center idx-brand-slogen">
            <h4 className="idx-slogen-title">享受餐桌上的幸福時光</h4>
            <div className="idx-slogen-subname">一日三餐，守護全家人的健康</div>
          </div>
          <div className="d-flex flex-wrap justify-content-center idx-brand-feature">
            <div className="d-flex justify-content-center mb-4 mb-lg-0 me-0 me-lg-10">
              <div className="d-flex justify-content-center me-8 me-lg-10">
                <div
                  className="rounded-circle bg-secondary-700 pt-9 pt-lg-2 idx-brand-item"
                  data-aos="zoom-in"
                >
                  <div className="idx-brand-title">
                    <svg
                      className="fs-2 me-2 me-lg-0"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.8868 1.38296C19.4314 0.872346 20.27 0.872346 20.8147 1.38296L20.8275 1.39522C21.7227 2.26479 25.6847 5.61871 35.6697 7.41684C36.3111 7.52416 36.7307 8.08838 36.7307 8.6825L36.7306 8.69771C36.7101 10.046 36.5005 16.7198 34.3834 23.4513C32.2814 30.135 28.172 37.2446 20.1209 38.8042C19.9968 38.8283 19.8693 38.8286 19.7451 38.8051C11.6885 37.2831 7.54692 30.1943 5.41443 23.5206C3.27635 16.8294 3.02874 10.1853 3.00126 8.78992C2.96753 8.07301 3.50546 7.60521 4.0212 7.4947C4.03068 7.49267 4.04018 7.49077 4.04971 7.48902C14.0322 5.65169 17.9838 2.27676 18.867 1.40199C18.8735 1.39555 18.8801 1.38921 18.8868 1.38296ZM19.8539 3.21439C18.2509 4.62573 13.9743 7.59786 5.01848 9.34111C5.09899 11.4426 5.4871 17.1772 7.31953 22.9119C9.37568 29.3467 13.1241 35.4205 19.9284 36.803C26.7278 35.3887 30.4487 29.2959 32.4755 22.8512C34.2817 17.1082 34.6437 11.3731 34.7154 9.27404C25.7449 7.56497 21.4617 4.61035 19.8539 3.21439Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.8858 13.6728L18.2582 16.9837C18.1131 17.2788 17.8323 17.4837 17.507 17.5318L13.8438 18.0733L16.4981 20.6558C16.7339 20.8852 16.8418 21.216 16.7866 21.5404L16.1651 25.1893L19.4438 23.4582C19.7345 23.3047 20.082 23.3039 20.3734 23.456L23.6538 25.1678L23.0157 21.5146C22.959 21.19 23.0658 20.8584 23.3012 20.6279L25.9463 18.0386L22.2787 17.5124C21.9534 17.4657 21.6719 17.2622 21.5255 16.968L19.8858 13.6728ZM21.327 12.0796C21.3109 12.0272 21.2903 11.9756 21.2652 11.9253C20.6967 10.7882 19.0848 10.7882 18.5163 11.9253L16.695 15.63L12.6176 16.2328C11.3608 16.412 10.8626 17.9656 11.7741 18.8499C11.7744 18.8502 11.7747 18.8505 11.775 18.8507L14.7267 21.7227L14.0349 25.7846L14.0332 25.7954C13.8358 27.0358 15.1388 28.0004 16.2705 27.3953L19.9135 25.4719L23.5681 27.379L23.5744 27.3823C24.6826 27.9506 26.0135 27.0209 25.7854 25.7479L25.0764 21.6889L28.0203 18.8071L28.0279 18.7996C28.8972 17.9302 28.4503 16.3715 27.1602 16.1923L23.0822 15.6072L21.327 12.0796Z"
                        fill="white"
                      />
                    </svg>
                    <div className="fs-2 mb-2">安心</div>
                  </div>
                  <div className="idx-brand-content">
                    <p className="mb-1">嚴選各地當令蔬果</p>
                    <p>經 SGS 檢驗合格</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="rounded-circle bg-tertiary-700 pt-9 pt-lg-2 idx-brand-item"
                  data-aos="zoom-in"
                >
                  <div className="idx-brand-title">
                    <svg
                      className="fs-2 me-2 me-lg-0"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M27.9126 2.23141L24.7318 11.5379C25.3551 11.7764 25.9579 12.0952 26.5254 12.4962L26.5481 12.4765L31.9615 4.21721L27.9126 2.23141ZM28.0298 13.8642L28.0683 13.8054L33.5063 9.09078L35.2987 11.7829L28.8375 14.9864C28.6029 14.5941 28.3335 14.2184 28.0298 13.8642ZM29.6466 16.8176C30.3919 19.2814 29.9703 22.0572 28.2688 24.2411C28.2564 24.2571 28.2434 24.2727 28.2301 24.2878C26.9029 25.9717 22.4309 30.374 17.9205 34.0495C15.643 35.9055 13.3052 37.6181 11.3131 38.7155C10.322 39.2615 9.36371 39.685 8.5091 39.8801C7.68715 40.0677 6.7252 40.0951 5.97501 39.5082C5.2243 38.9222 5.01846 37.9812 5.00124 37.138C4.98334 36.2613 5.16124 35.2282 5.44976 34.133C6.02962 31.9318 7.12105 29.2453 8.3658 26.5821C10.8491 21.269 14.0553 15.8144 15.3451 14.1589C17.1746 11.8108 20.0281 10.7298 22.7825 11.0573L26.2314 0.966551L26.2329 0.961966C26.5119 0.133954 27.4401 -0.218725 28.1915 0.140645L28.2004 0.144907L33.4473 2.71833C34.1917 3.09056 34.4721 4.04212 33.9949 4.76326L32.0868 7.67449L32.6949 7.14724L32.7058 7.1379C33.3467 6.59821 34.3135 6.72975 34.7892 7.40934L34.8024 7.42861L37.332 11.2281C37.8131 11.9497 37.5331 12.9043 36.7872 13.2772L36.7842 13.2787L29.6466 16.8176ZM6.40002 3C6.95231 3 7.40002 3.44772 7.40002 4V7.40003H10.8C11.3523 7.40003 11.8 7.84774 11.8 8.40003C11.8 8.95231 11.3523 9.40003 10.8 9.40003H7.40002V12.8C7.40002 13.3523 6.95231 13.8 6.40002 13.8C5.84774 13.8 5.40002 13.3523 5.40002 12.8V9.40003H2C1.44772 9.40003 1 8.95231 1 8.40003C1 7.84774 1.44772 7.40003 2 7.40003H5.40002V4C5.40002 3.44772 5.84774 3 6.40002 3ZM25.6138 14.3098C22.9181 12.2054 19.0262 12.6884 16.9228 15.3881C16.6385 15.7531 16.2337 16.3503 15.7483 17.1221C15.7817 17.1715 15.8111 17.2246 15.8358 17.2811C15.8358 17.2811 15.8378 17.2849 15.8392 17.2876C15.8484 17.305 15.8709 17.3454 15.9114 17.4062C15.9923 17.5277 16.1467 17.7327 16.4134 17.9994C16.9467 18.5327 17.9359 19.319 19.6965 20.1731C20.1934 20.4141 20.4008 21.0123 20.1598 21.5093C19.9187 22.0062 19.3205 22.2136 18.8236 21.9725C16.8942 21.0366 15.7134 20.1279 14.9992 19.4137C14.8512 19.2657 14.7235 19.1263 14.6136 18.9971C13.9556 20.1204 13.2299 21.4162 12.4946 22.7997C12.7244 22.8955 12.9186 23.0765 13.0258 23.3211C13.0258 23.3211 13.0277 23.3248 13.0292 23.3276C13.0383 23.3449 13.0608 23.3854 13.1014 23.4462C13.1823 23.5676 13.3366 23.7727 13.6033 24.0394C14.1366 24.5727 15.1258 25.359 16.8864 26.2131C17.3833 26.4541 17.5908 27.0523 17.3497 27.5492C17.1087 28.0461 16.5104 28.2536 16.0135 28.0125C14.0842 27.0766 12.9034 26.1679 12.1891 25.4536C11.8904 25.1549 11.6745 24.8914 11.5204 24.6759C11.0617 25.5807 10.6094 26.5053 10.1777 27.429C8.95032 30.0549 7.91807 32.6143 7.38377 34.6425C7.11521 35.6619 6.98841 36.4893 7.00082 37.0972C7.01392 37.7386 7.17342 37.9065 7.2057 37.9317L7.20723 37.9329C7.23982 37.9584 7.44052 38.0726 8.06403 37.9303C8.65544 37.7953 9.42579 37.4718 10.3481 36.9637C12.183 35.9529 14.4115 34.329 16.6571 32.4991C21.1596 28.83 25.5287 24.5011 26.6813 23.0218C26.6928 23.007 26.7047 22.9926 26.7169 22.9786C28.7902 20.2805 28.2999 16.4066 25.6138 14.3098ZM34.25 29C34.8023 29 35.25 29.4477 35.25 30V33.26H38.5C39.0523 33.26 39.5 33.7077 39.5 34.26C39.5 34.8123 39.0523 35.26 38.5 35.26H35.25V38.51C35.25 39.0623 34.8023 39.51 34.25 39.51C33.6977 39.51 33.25 39.0623 33.25 38.51V35.26H30C29.4477 35.26 29 34.8123 29 34.26C29 33.7077 29.4477 33.26 30 33.26H33.25V30C33.25 29.4477 33.6977 29 34.25 29Z"
                        fill="white"
                      />
                    </svg>
                    <div className="fs-2 mb-2">營養</div>
                  </div>
                  <div className="idx-brand-content">
                    <p className="mb-1">根據季節變換食材</p>
                    <p>均衡又美味</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex justify-content-center me-8 me-lg-10">
                <div
                  className="rounded-circle bg-primary-700 pt-9 pt-lg-2 idx-brand-item"
                  data-aos="zoom-in"
                >
                  <div className="idx-brand-title">
                    <svg
                      className="fs-2 me-2 me-lg-0"
                      width="53"
                      height="40"
                      viewBox="0 0 53 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="52.7273" height="40" />
                      <path
                        d="M49.0559 21.7245C48.9771 21.2931 48.8107 20.8969 48.5655 20.5535L45.5621 16.2483L43.9596 13.9505C43.3992 13.1493 42.4886 12.6739 41.5166 12.6739H32.6726V8.80009C32.6726 6.95124 31.1753 5.45454 29.3452 5.45454H6.96379C5.1337 5.45454 3.63635 6.96004 3.63635 8.80009V26.9101C3.63635 28.7589 5.1337 30.2556 6.96379 30.2556H8.30352C8.71507 32.1837 10.4313 33.6364 12.4628 33.6364C14.4943 33.6364 16.2106 32.1837 16.6221 30.2556H35.5185C35.9563 32.1573 37.6375 33.5483 39.6515 33.5483C41.6655 33.5483 43.3642 32.1397 43.7933 30.2556H46.105C47.7512 30.2556 49.0909 28.9086 49.0909 27.2534V22.2791C49.0909 22.0942 49.0734 21.9093 49.0384 21.7245H49.0559ZM46.7442 21.0113H40.7635C40.641 21.0113 40.5359 20.9057 40.5359 20.7824V17.8595C40.5359 17.7362 40.641 17.6306 40.7635 17.6306H44.3887L46.7442 21.0113ZM5.38764 18.2997H8.2072V21.3899H5.38764V18.2997ZM5.38764 26.9101V23.1507H8.52243C9.31927 23.1507 9.95848 22.4992 9.95848 21.7069V17.9827C9.95848 17.1816 9.31051 16.5389 8.52243 16.5389H5.38764V8.80009C5.38764 7.92849 6.0969 7.21536 6.96379 7.21536H29.3364C30.2033 7.21536 30.9126 7.92849 30.9126 8.80009V28.4948H16.6396C16.6396 28.4948 16.6396 28.4948 16.6396 28.486C16.5871 28.2307 16.5083 27.9753 16.412 27.7376C16.3769 27.6584 16.3332 27.5792 16.2981 27.5087C16.2193 27.3503 16.1405 27.2006 16.0529 27.0509C16.0004 26.9629 15.9391 26.8836 15.8778 26.8044C15.7815 26.6812 15.6852 26.5579 15.5801 26.4346C15.5101 26.3554 15.4312 26.285 15.3524 26.2145C15.2386 26.1089 15.116 26.012 14.9934 25.9152C14.9059 25.8536 14.827 25.7919 14.7395 25.7391C14.6081 25.6511 14.468 25.5806 14.3192 25.5102C14.2316 25.4662 14.144 25.4222 14.0477 25.3781C13.8814 25.3165 13.715 25.2637 13.5399 25.2197C13.4523 25.1933 13.3735 25.1669 13.2859 25.1492C13.0232 25.0964 12.7518 25.07 12.4803 25.07C12.2089 25.07 11.9374 25.1052 11.6747 25.1492C11.5872 25.1669 11.5084 25.1933 11.4208 25.2197C11.2457 25.2637 11.0793 25.3165 10.9129 25.3781C10.8166 25.4134 10.729 25.4662 10.6415 25.5102C10.5014 25.5806 10.3613 25.6511 10.2212 25.7391C10.1336 25.7919 10.046 25.8536 9.96724 25.9152C9.84465 26.012 9.72206 26.1089 9.60823 26.2145C9.52942 26.285 9.45937 26.3554 9.38056 26.4346C9.27548 26.5491 9.17916 26.6723 9.08284 26.7956C9.02155 26.8748 8.96025 26.9541 8.90771 27.0421C8.81139 27.183 8.73259 27.3415 8.66253 27.4999C8.62751 27.5792 8.58373 27.6496 8.5487 27.7376C8.45238 27.9753 8.37357 28.2219 8.32103 28.486C8.32103 28.486 8.32103 28.486 8.32103 28.4948H6.99006C6.12317 28.4948 5.4139 27.7817 5.4139 26.9101H5.38764ZM12.4716 31.8844C11.0968 31.8844 9.976 30.7574 9.96724 29.384C9.96724 29.3664 9.96724 29.3488 9.96724 29.3312C9.98475 27.9577 11.1056 26.8396 12.4716 26.8396C13.8376 26.8396 14.9672 27.9577 14.9847 29.3312C14.9847 29.3488 14.9847 29.3664 14.9847 29.3752C14.9847 30.7574 13.8551 31.8844 12.4803 31.8844H12.4716ZM39.669 31.7875C38.3118 31.7875 37.2172 30.7134 37.1734 29.3312C37.1734 29.3136 37.1734 29.296 37.1734 29.2783C37.1734 29.2783 37.1734 29.2783 37.1734 29.2695V29.2607C37.1734 27.8697 38.303 26.734 39.6778 26.734C41.0525 26.734 42.1908 27.8697 42.1908 29.1903C42.1908 29.2079 42.1908 29.2343 42.1908 29.2607C42.1908 29.2784 42.1908 29.3048 42.1908 29.3136C42.1908 29.3136 42.1908 29.3136 42.1908 29.3224C42.1471 30.687 41.0525 31.7611 39.6953 31.7611L39.669 31.7875ZM47.3571 27.2534C47.3571 27.9401 46.8055 28.4948 46.1225 28.4948H43.8546C43.8546 28.4948 43.8458 28.4596 43.8458 28.4508C43.8283 28.3627 43.7933 28.2835 43.7758 28.1955C43.732 28.0194 43.6882 27.8521 43.6181 27.6848C43.5831 27.588 43.5306 27.4999 43.4868 27.4031C43.4167 27.2622 43.3467 27.1214 43.2591 26.9893C43.1978 26.9013 43.1365 26.8132 43.0752 26.7252C42.9877 26.6019 42.8914 26.4875 42.7863 26.373C42.7162 26.2938 42.6374 26.2145 42.5586 26.1441C42.4448 26.0385 42.3309 25.9416 42.2084 25.8536C42.1208 25.7919 42.0332 25.7215 41.9457 25.6687C41.8143 25.5806 41.6742 25.5102 41.5254 25.4398C41.429 25.3958 41.3415 25.3429 41.2452 25.3077C41.0788 25.2461 40.9124 25.1933 40.7373 25.1492C40.6497 25.1228 40.5709 25.0964 40.4833 25.0788C40.2207 25.026 39.9492 24.9996 39.669 24.9996C39.3888 24.9996 39.1173 25.0348 38.8547 25.0788C38.7671 25.0964 38.6795 25.1228 38.6007 25.1492C38.4256 25.1933 38.2592 25.2373 38.0928 25.3077C37.9965 25.3429 37.909 25.3958 37.8126 25.4398C37.6725 25.5102 37.5324 25.5806 37.4011 25.6687C37.3135 25.7303 37.226 25.7919 37.1384 25.8536C37.0158 25.9416 36.902 26.0385 36.7881 26.1441C36.7093 26.2145 36.6305 26.2938 36.5605 26.373C36.4554 26.4875 36.3591 26.6019 36.2715 26.7252C36.2102 26.8132 36.1402 26.9013 36.0876 26.9893C36.0001 27.1214 35.93 27.2622 35.86 27.4119C35.8162 27.5087 35.7636 27.5968 35.7286 27.6936C35.6673 27.8609 35.6148 28.0282 35.571 28.2043C35.5447 28.2923 35.5185 28.3715 35.5009 28.4596C35.5009 28.4772 35.4922 28.4948 35.4922 28.5036H32.6814V14.4347H41.5254C41.9282 14.4347 42.3047 14.6284 42.5411 14.9629L43.1716 15.8698H40.7723C39.6778 15.8698 38.7934 16.759 38.7934 17.8595V20.7824C38.7934 21.8829 39.6778 22.7721 40.7723 22.7721H47.3659V27.2622L47.3571 27.2534Z"
                        fill="white"
                      />
                    </svg>
                    <div className="fs-2 mb-2">方便</div>
                  </div>
                  <div className="idx-brand-content">
                    <p className="mb-1">選擇附近倉庫或門市</p>
                    <p>取貨或宅配</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div
                  className="rounded-circle bg-tertiary-100 pt-9 pt-lg-2 idx-brand-item text-primary-700"
                  data-aos="zoom-in"
                >
                  <div className="idx-brand-title">
                    <svg
                      className="fs-2 me-2 me-lg-0"
                      width="32"
                      height="32"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" />
                      <path
                        d="M19.9085 35.4979C19.7885 35.4979 19.6685 35.4778 19.5485 35.4279C10.4885 31.9678 0.498475 24.3579 2.18848 14.3179C2.85848 10.3179 5.21848 7.12785 8.49848 5.78785C14.0285 3.52785 18.2485 6.68785 19.9185 8.28785C21.5885 6.68785 25.7985 3.52785 31.3385 5.78785C34.6185 7.12785 36.9685 10.3179 37.6485 14.3179C39.3285 24.3379 29.3785 31.9379 20.3185 35.4079C20.2485 35.4379 20.1685 35.4678 20.0785 35.4778C20.0285 35.4778 19.9685 35.4879 19.9185 35.4879L19.9085 35.4979ZM12.3485 7.00785C11.3885 7.00785 10.3485 7.18785 9.24848 7.63785C6.61848 8.70785 4.71848 11.3379 4.15848 14.6479C2.59848 23.9379 13.1585 30.7479 19.9085 33.4179C26.6585 30.7379 37.2185 23.9379 35.6585 14.6479C35.0985 11.3279 33.1985 8.70785 30.5685 7.63785C24.8585 5.30785 20.8585 10.1679 20.6885 10.3679C20.3085 10.8379 19.5085 10.8379 19.1285 10.3679C18.9885 10.1979 16.3585 6.99785 12.3485 6.99785V7.00785Z"
                        fill="#785507"
                      />
                    </svg>
                    <div className="fs-2 mb-2">心意</div>
                  </div>
                  <div className="idx-brand-content">
                    <p className="mb-1">小農的心意</p>
                    <p>你我的公益</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="idx-comment mb-28 mb-md-29">
        <div className="container">
          <div className="text-center idx-comment-title mb-2 mb-md-10">
            <img src="../images/icon/pattan.png" className="me-10 me-md-13" />
            <h2 className="fs-4 fs-md-2 text-primary-700 me-10 me-md-13">
              客人好評
            </h2>
            <img src="../images/icon/pattan.png" alt="" />
          </div>
          <div className="text-center idx-comment-brief text-gary-500">
            <p className="mb-1">
              農農自然致力於讓每個人能輕鬆享用新鮮在地的農產品
            </p>
            <p>以下是來自使用者的寶貴回饋</p>
          </div>
          <div className="swiper idx-comment-list">
            <div className="swiper-wrapper">
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">林依依</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      好感謝有這個平台，讓我隨時都能補貨，還能快速就近拿到～
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">埔里餐間有機</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      純天然，美味與愛心同在；從田間到心間，每筆交易都有善意！！
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">Mike</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      這個平台真是讚，每購一單就能支持一份愛心，大家可以一同響應
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">王曉明</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      還不錯，蠻方便的，購買的柚子也還不錯，就是有少數幾顆太酸了
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">冰鄉在你家</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      謝謝這個平台給予我們一個管道可以售賣自家的農產品~
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">李大大</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      勉強還算可以啦，但這個速度有點慢..
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide idx-comment-item">
                <div className="row g-0">
                  <div className="card-header">
                    <img
                      src="../images/index/avatar_default.png"
                      alt="*"
                      className="rounded-circle object-fit-cover author-img"
                      width="60px"
                      height="60px"
                    />
                    <div className="name-rank">
                      <span className="fullname">林如意</span>
                      <div className="rank-star">
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                        <img
                          src="../images/icon/star-yellow.svg"
                          className="star"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      可以一起共襄盛舉發心的傳遞自己的心意，真的要推廣一下此平台
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-button-next swiper-btn-white"></div>
            <div className="swiper-button-prev swiper-btn-white"></div>
          </div>
        </div>
      </div>

      <div className="idx-about">
        <div className="container">
          <div className="idx-about-title d-flex justify-content-center mb-md-13 mb-6">
            <div className="idx-cat-name d-flex">
              <img
                src="../images/icon/patten_left.png"
                className="me-10 me-md-13"
              />
              <h2 className="text-secondary-700 fs-4 me-10 me-md-13">
                關於我們
              </h2>
              <img src="../images/icon/patten_right.png" className="me-1" />
            </div>
          </div>
          <div className="text-center idx-about-brief text-gary-500">
            <p className="mb-1">
              希望能為在台灣偏鄉地區的人或是當地農民出一份心力
            </p>
            <p>讓他們即使無法住在機會很多的都市，也能夠生存下去</p>
          </div>
          <div className="idx-about-list">
            <div className="idx-about-item-group justify-content-end">
              <div className="idx-about-item" data-aos="flip-left">
                <img
                  src="../images/index/avatar_default.png"
                  alt="*"
                  className="rounded-circle object-fit-cover author-img"
                  width="60px"
                  height="60px"
                />
                <div className="w-100 data">
                  <div className="d-flex name-social">
                    <h3 className="fw-500 name">Pipi</h3>
                    <div className="ms-auto social">
                      <a href="https://github.com/169628" target="_blank">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.173 20.8178 18.8983 19.5421 20.1205 17.84C21.3427 16.138 22 14.0954 22 12C22 6.475 17.525 2 12 2Z"
                            fill="#79A93F"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <span className="text-gary-500 job">全端工程師</span>
                </div>
              </div>
              <div
                className="idx-about-item"
                data-aos="flip-up"
                data-aos-delay="100"
              >
                <img
                  src="../images/index/avatar_default.png"
                  alt="*"
                  className="rounded-circle object-fit-cover author-img"
                  width="60px"
                  height="60px"
                />
                <div className="w-100 data">
                  <div className="d-flex name-social">
                    <h3 className="fw-500 name">Sandy</h3>
                    <div className="ms-auto social">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.173 20.8178 18.8983 19.5421 20.1205 17.84C21.3427 16.138 22 14.0954 22 12C22 6.475 17.525 2 12 2Z"
                          fill="#79A93F"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gary-500 job">全端工程師</span>
                </div>
              </div>
              <div
                className="idx-about-item"
                data-aos="flip-down"
                data-aos-delay="150"
              >
                <img
                  src="../images/index/avatar_default.png"
                  alt="*"
                  className="rounded-circle object-fit-cover author-img"
                  width="60px"
                  height="60px"
                />
                <div className="w-100 data">
                  <div className="d-flex name-social">
                    <h3 className="fw-500 name">Edward</h3>
                    <div className="ms-auto social">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.173 20.8178 18.8983 19.5421 20.1205 17.84C21.3427 16.138 22 14.0954 22 12C22 6.475 17.525 2 12 2Z"
                          fill="#79A93F"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gary-500 job">全端工程師</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*彈跳視窗-廣告*/}
      <Modal show={showModal} onHide={handleClose} keyboard={false} className="modal fade idx-popup" centered>
        <Modal.Header>
          <button variant="secondary" className="btn-close d-flex justify-content-start align-items-center me-14" onClick={handleClose}>
            <i className="bi bi-x fs-3"></i>
            <span>Close</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content goes here */}
          <img src="../images/index/popup.png" className="" alt="廣告" />
        </Modal.Body>
      </Modal>

    </>
  );
}

export default Home;
