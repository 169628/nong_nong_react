import { useEffect, useState, useCallback } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import { pushToast } from "../slice/toastSlice";
import { asyncCart } from "../slice/cartSlice";

const categories = ["葉菜類", "根莖瓜果類", "菌菇類", "安心水果類"];

function Products() {
  const [goodsList, setGoodsList] = useState([]);
  const [goodsCnt, setGoodsCnt] = useState(0);
  const [curPage, setCurPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const { keywords } = useParams();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const getProducts = useCallback(async (page = 1) => {
    let apiUrl = `${import.meta.env.VITE_APP_URL}/products?page=${page}`;
    if (keywords != "" && keywords != undefined) {
      apiUrl += "&search=" + keywords;
    }
    setCurPage(page);

    try {
      setIsLoading(true);
      const result = await axios.get(`${apiUrl}`);
      setGoodsList(result.data.data[0].results);
      setGoodsCnt(result.data.data[0].total[0].count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console(error);
    }
  }, [keywords]);

  const hdlPageChange = (page) => {
    getProducts(page);
  };

  const addToCart = async (e, id) => {
    try {
      e.preventDefault();
      if (!userId) {
        return dispatch(
          pushToast({
            type: "error",
            message: "請先登入會員",
          })
        );
      }
      const result = await axios.put(
        `${import.meta.env.VITE_APP_URL}/carts/${userId}`,
        {
          productId: id,
          quantity: 1,
        }
      );

      if (result.data.result == 1) {
        dispatch(
          pushToast({
            type: "success",
            message: "已成功加入購物車",
          })
        );
        dispatch(asyncCart());
      }
    } catch (error) {
      dispatch(
        pushToast({
          type: "error",
          message: "加入購物車失敗",
        })
      );
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <div className="prodout-list mt-16 mt-md-36">
        <div className="bread-crumbs">
          <div className="container">
            <div className="dropdown">
              <button
                className="btn btn-primary-100 text-primary-500 dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {`${keywords != "" &&
                  keywords != undefined &&
                  categories.includes(keywords)
                  ? keywords
                  : "所有商品"
                  }`}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    to={`/products`}
                    className={`dropdown-item${keywords != "" && keywords != undefined ? "" : " active"
                      }`}
                  >
                    所有商品
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <NavLink
                      to={`/products/search/${category}`}
                      className="dropdown-item"
                    >
                      {category}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="product-items">
          <div className="container">
            {isLoading ? (
              <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
              >
                <RiseLoader color="#966A09" size={30} />
              </div>
            ) : (
              <>
                <div className="row">
                  {goodsList.length > 0 ? (
                    goodsList.map((product) => (
                      <div
                        className="col-sm-6 col-md-4 col-lg-3 mb-6"
                        key={product._id}
                      >
                        <div className="goods-item">
                          <div className="img-box">
                            <Link to={`/product/${product._id}`}>
                              <img
                                src={product.image}
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
                              <h3 className="card-title mb-1">
                                {product.name}
                              </h3>
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
                              <a
                                href="#"
                                className="buy-btn buy-btn-primary"
                                onClick={(e) => {
                                  addToCart(e, product._id);
                                }}
                              >
                                <i className="bi bi-cart3"></i>
                                <span className="ms-2 d-md-none">
                                  加入購物車
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div
                        className="container d-flex flex-column justify-content-center align-items-center"
                        style={{ height: "20vh" }}
                      >
                        <p className="text-primary-500 fs-5">
                          很抱歉!目前沒有資料...
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* 頁尾頁碼按鈕 */}
                <div className="mt-20 d-flex justify-content-center mb-30">
                  {goodsCnt / 16 > 1 ? (
                    <ul className="p-0 d-flex justify-content-center align-items-center list-unstyled">
                      {curPage != 1 ? (
                        <li className="me-3">
                          <button
                            className="admin-pagination-btn"
                            type="button"
                            onClick={() => hdlPageChange(curPage - 1)}
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                        </li>
                      ) : (
                        ""
                      )}

                      <li className="mx-3">
                        {Array.apply(null, { length: goodsCnt / 16 + 1 }).map(
                          (_, index) => (
                            <button
                              className={`${curPage == index + 1
                                ? "admin-pagination-btn current"
                                : "admin-pagination-btn"
                                }`}
                              type="button"
                              key={index + 1}
                              onClick={() => hdlPageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          )
                        )}
                      </li>

                      {goodsCnt / 16 >= 1 && curPage < goodsCnt / 16 + 1 ? (
                        <li className="ms-3">
                          <button
                            className="admin-pagination-btn"
                            type="button"
                            onClick={() => hdlPageChange(curPage + 1)}
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
