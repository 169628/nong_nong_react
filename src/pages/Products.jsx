import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Products() {
  const [goodsList, setGoodsList] = useState([]);
  const [goodsCnt, setGoodsCnt] = useState(0);
  const [curPage, setCurPage] = useState(1);

  const { keywords } = useParams();
  console.log(keywords);

  const getProducts = async (page = 1) => {
    let apiUrl = `${import.meta.env.VITE_APP_URL}/products?page=${page}`;
    if (keywords != "" && keywords != undefined) {
      apiUrl += "&search=" + keywords;
    }
    setCurPage(page);

    try {
      const result = await axios.get(`${apiUrl}`);
      console.log(result.data.data[0].total);
      setGoodsList(result.data.data[0].results);
      setGoodsCnt(result.data.data[0].total[0].count);
    } catch (error) {
      console.log(error);
    }

    console.log(curPage);
  };

  const hdlPageChange = (page) => {
    getProducts(page);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
                {`${(keywords != '' && keywords != undefined) ? keywords : '所有商品'}`}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className={`dropdown-item${(keywords != '' && keywords != undefined) ? '' : ' active'}`}
                    href={`/#/products`}
                  >
                    所有商品
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${keywords == '葉菜類' && 'active'}`}
                    href={`/#/products/search/葉菜類`}
                  >
                    葉菜類
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${keywords == '瓜果根莖類' && 'active'}`}
                    href={`/#/products/search/瓜果根莖類`}
                  >
                    瓜果根莖類
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${keywords == '菌菇類' && 'active'}`}
                    href={`/#/products/search/菌菇類`}
                  >
                    菌菇類
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${keywords == '安心水果類' && 'active'}`}
                    href={`/#/products/search/安心水果類`}
                  >
                    安心水果類
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="product-items">
          <div className="container">
            <div className="row">
              {goodsList.map((product) => (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 mb-6"
                  key={product._id}
                >
                  <div className="goods-item">
                    <div className="img-box">
                      <a href={`/#/product/${product._id}`}>
                        <img
                          src="../images/index/product-01.jpg"
                          className="card-img-top goods-pic"
                          alt="..."
                        />
                      </a>
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
                      <a href={`/#/product/${product._id}`}>
                        <h3 className="card-title mb-1">{product.name}</h3>
                      </a>
                      <span className="text-gary-500 mb-2">{product.unit}</span>

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
                </div>
              ))}
            </div>

            {/* 頁尾頁碼按鈕 */}
            <div className="mt-20 d-flex justify-content-center mb-30">
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
                        className={`${
                          curPage == index + 1
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
