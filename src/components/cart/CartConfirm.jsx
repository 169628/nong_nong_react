import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";

import { pushToast } from "../../slice/toastSlice";
import { asyncCart } from "../../slice/cartSlice";

// eslint-disable-next-line react/prop-types
function CartConfirm({ setStep, setTotal, delivery, setDelivery, total }) {
  const orderPrice = total || 0;
  const deliveryFee = delivery == "自取" ? 0 : 60;

  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [donate, setDonate] = useState(false);

  const [click, setClick] = useState({
    personalInfoAgree: false,
    vetoAgree: false,
  });
  const { userId } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCart = async () => {
    try {
      if (!userId) {
        dispatch(
          pushToast({
            type: "error",
            message: "請重新登入",
          })
        );
        return navigate("/");
      }
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/carts/${userId}`
      );

      if (result.data.result == 1) {
        if (result.data.data.length <= 0) {
          dispatch(
            pushToast({
              type: "error",
              message: "您的購物車沒有商品",
            })
          );
          return navigate("/");
        }
        const qty = result.data?.data?.[0]?.carts;
        const info = result.data?.data?.[0]?.productInfo;
        // 檢查是否為捐贈訂單
        const checkDonate = info.every((item) =>
          item.tags?.productType?.includes("捐贈")
        );
        if (checkDonate) {
          setDonate(true);
        }
        // 製作 cart list
        const list = info.map((item) => {
          let tempNum = 0;
          qty.forEach((value) => {
            if (value.productId == item._id) {
              tempNum = value.quantity;
            }
          });
          return {
            ...item,
            qty: tempNum,
          };
        });
        // 計算訂單金額
        let total = 0;
        list.forEach((item) => {
          total += item.price * item.qty;
        });
        setCart(list);
        setTotal(total);
      }
      dispatch(asyncCart());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const changeQty = async (e, productId, quantity) => {
    try {
      e.preventDefault();
      if (quantity < 1) {
        return dispatch(
          pushToast({
            type: "error",
            message: "數量不可小於 1",
          })
        );
      }
      const result = await axios.put(
        `${import.meta.env.VITE_APP_URL}/carts/${userId}`,
        {
          productId,
          quantity,
        }
      );

      if (result.data.result == 1) {
        dispatch(
          pushToast({
            type: "success",
            message: "已成功修改數量",
          })
        );
        getCart();
      }
    } catch (error) {
      console.log(error);
      dispatch(
        pushToast({
          type: "error",
          message: "修改失敗",
        })
      );
    }
  };
  const handleClick = (e) => {
    setClick({
      ...click,
      [e.target.name]: e.target.checked,
    });
  };
  const nextStep = () => {
    if (!click.personalInfoAgree) {
      return dispatch(
        pushToast({
          type: "error",
          message: "請簽屬同意商店服務條款",
        })
      );
    } else if (!click.vetoAgree) {
      return dispatch(
        pushToast({
          type: "error",
          message: "請簽屬確認賣家可否決權利",
        })
      );
    }
    setStep("fill");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {loading ? (
        <div className="col col-lg-8 text-center pt-18">
          <RiseLoader color="#966A09" size={30} />
        </div>
      ) : (
        <div className="col col-lg-8 d-flex flex-column gap-26">
          <div className="buyer">
            <h4 className="mt-26 mt-lg-0 fs-4 fs-md-2 text-primary-700 fw-bold">
              購物車內容
            </h4>
            <div className="text-secondary-700 d-flex">
              <div className="cart-icon-vector">
                <img
                  src="/nong_nong_react/images/icon/Vector.png"
                  className="img-fluid"
                  alt="vector photo"
                />
              </div>
              <p className="fs-6 fw-medium">表示購物項目屬於捐贈區商品</p>
            </div>
            {/* <div className="row"> */}
            <div className="row">
              <div className="col-6 d-none d-lg-block">
                <p className="text-center bg-primary-100 rounded-3 fs-6 py-4 m-0">
                  項目
                </p>
              </div>
              <div className="col d-none d-lg-block">
                <div className="row">
                  <div className="col">
                    <p className="text-center bg-primary-100 rounded-3 fs-6 py-4 m-0">
                      數量
                    </p>
                  </div>
                  <div className="col">
                    <p className="text-center bg-primary-100 rounded-3 fs-6 py-4 m-0">
                      小計
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {cart.map((item) => {
              return (
                <div className="row" key={item._id}>
                  <div className="col-md-6 d-flex pt-13 pb-10 px-lg-10 pt-md-10 pb-lg-0">
                    <div className="cart-product-photo overflow-hidden rounded-3">
                      <img
                        src={item.image}
                        className="img-fluid"
                        alt="wendan"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <ul className="list-unstyled ms-4">
                      <li className="d-flex">
                        <p className="m-0 fs-5 me-2">{item.name}</p>
                        {item.tags?.productType?.includes("捐贈") && (
                          <div className="cart-icon-vector">
                            <img
                              src="/nong_nong_react/images/icon/Vector.png"
                              className="img-fluid"
                              alt="vector photo"
                            />
                          </div>
                        )}
                      </li>
                      <li className="mt-1">
                        <p className="m-0 fs-6 text-gary-500">{item.unit}</p>
                      </li>
                      <li className="mt-1 d-flex">
                        <p className="m-0 fs-6 text-gary-500 me-4">單價</p>
                        <p className="m-0 fs-6 text-gary-500">
                          NT.{item.price}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <div className="row h-100">
                      <div className="col-6 d-flex align-items-center">
                        <ul className="d-flex justify-content-between border border-gary-500 rounded-1 p-0 py-1 list-unstyled w-100">
                          <li>
                            <a
                              href="#"
                              className={`p-2 text-gary-500 ${item.qty == 1 ? "disabled" : ""
                                }`}
                              onClick={(e) => {
                                changeQty(e, item._id, item.qty - 1);
                              }}
                            >
                              <i className="bi bi-dash"></i>
                            </a>
                          </li>
                          <li className="fs-6">{item.qty}</li>
                          <li>
                            <a
                              href="#"
                              className="p-2 text-gary-500"
                              onClick={(e) => {
                                changeQty(e, item._id, item.qty + 1);
                              }}
                            >
                              <i className="bi bi-plus"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 d-flex justify-content-end align-items-center">
                        <p className="m-0 fs-5 fw-medium cart-price-color">
                          NT. {item.price * item.qty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}


            <div className="row">
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="col pt-19 pt-md-15">
                  <p className="text-gary-500 fs-6 fs-md-5 m-0">運送方式</p>
                  <div className="mt-6 d-flex justify-content-between d-md-inline-flex">
                    <button
                      type="button"
                      className={`btn btn-outline-gary-500 py-4 px-13 fs-6 fw-medium me-md-10 cart-btn-hover ${!donate && "disabled"
                        } ${delivery == "捐贈" && "active"}`}
                      onClick={() => {
                        setDelivery("捐贈");
                      }}
                    >
                      捐贈
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-gary-500 py-4 px-13 fs-6 fw-medium me-md-10 cart-btn-hover ${delivery == "宅配" && "active"
                        }`}
                      onClick={() => {
                        setDelivery("宅配");
                      }}
                    >
                      宅配
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-gary-500 py-4 px-6 fs-6 fw-medium cart-btn-hover ${delivery == "自取" && "active"
                        }`}
                      onClick={() => {
                        setDelivery("自取");
                      }}
                    >
                      倉庫自取
                    </button>
                  </div>
                  {!donate && (
                    <p className="cart-alert-text mt-2 d-none d-md-flex">
                      如欲捐贈，購物車內不可有不屬於捐贈區的商品
                    </p>
                  )}
                </div>
                <div className="col d-none d-md-block"></div>
                <div className="col pt-8 pt-md-10">
                  <label
                    htmlFor="discount"
                    className="text-gary-500 fs-6 fs-md-5"
                  >
                    優惠折扣碼
                  </label>
                  <div className="mt-6 d-flex justify-content-between">
                    <input
                      id="discount"
                      type="text"
                      className="cart-input-form"
                      placeholder="全館促銷暫不提供折扣優惠"
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn btn-outline-gary-500 py-3 px-10 fs-6 cart-btn-hover"
                    >
                      使用
                    </button>
                  </div>
                </div>
                <div className="col pt-8 pt-md-10">
                  <div className="d-flex">
                    <label
                      htmlFor="discount"
                      className="text-gary-500 fs-6 fs-md-5 me-2"
                    >
                      紅利點數可折抵
                    </label>
                    {/* <p className="text-secondary-700 fs-6 fs-md-5 fs-medium">
                    NT. 24
                  </p> */}
                  </div>
                  <div className="mt-6 d-flex justify-content-between">
                    <input
                      id="discount"
                      type="text"
                      className="cart-input-form"
                      placeholder="全館促銷暫不提供紅利折抵"
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn btn-outline-gary-500 py-3 px-10 fs-6 cart-btn-hover"
                    >
                      使用
                    </button>
                  </div>
                  {/* <p className="cart-alert-text d-none d-md-block">
                  持有的紅利點數不足
                </p> */}
                </div>
              </div>
            </div>

            <div className="d-block d-lg-none pt-13 pb-15">
              <p
                className="m-0 fs-6 fw-medium py-4 text-white text-center bg-primary-300 cart-info-top-border"
              >
                訂單摘要
              </p>
              <div className="bg-white cart-info-bottom-border p-10 px-lg-13">
                <ul className="list-unstyled p-0">
                  <li className="d-flex justify-content-between mb-10">
                    <span className="text-gary-500">商品總金額</span
                    ><span className="text-gary-500">NT. {orderPrice}</span>
                  </li>
                  {delivery == "自取" ? (
                    ""
                  ) : (
                    <li className="d-flex justify-content-between mb-10">
                      <span className="text-gary-500">運費總金額</span>
                      <span className="text-gary-500">NT. 60</span>
                    </li>
                  )}
                  <li className="d-flex justify-content-between mb-10">
                    <span className="text-gary-500">全館促銷</span>
                    <span className="text-primary-500">9折</span>
                  </li>
                </ul>
                <div
                  className="d-flex justify-content-between align-items-center border-top border-gary-500 pt-10 pb-6"
                >
                  <span className="text-gary-500 cart-total-price-font"
                  >結帳總金額</span
                  ><span className="text-primary-500 fs-4 fw-bold">$ {Math.round((orderPrice + deliveryFee) * 0.9)}</span>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center cart-info-bgcolor py-8 px-6"
                >
                  <span className="text-gary-500 cart-info-li-text"
                  >此筆訂單捐贈後可獲得紅利</span
                  ><span className="text-primary-300 fs-6 fw-bold">{Math.round(Math.round((orderPrice + deliveryFee) * 0.9) / 100)}{" "} 點</span>
                </div>
              </div>
            </div>


            <div className="cart-info-bgcolor p-10 mt-lg-10">
              <p className="text-primary-300 fw-bold">
                【 優惠使用及商品出貨配送須知 】
              </p>
              <ol className="mb-0 ps-6">
                <li className="text-gary-500 cart-info-li-text">
                  除商品缺貨外，訂單付款完成後 5~7
                  個工作天（不含例假日）進行出貨
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  實際配送天數視物流狀況而定，恕無法指定到貨日
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  低溫商品運用過程中有一定風險，無法保證產品不會遭遇溫度變化，請評估後可接受再下單
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  若訂單成立後因個人因素取消訂單，首購折扣碼即失效，恕不補發
                </li>
              </ol>
              <p className="text-primary-300 fw-bold mt-13">
                【 會員紅利點數累積 】
              </p>
              <ol className="mb-0 ps-6">
                <li className="text-gary-500 cart-info-li-text">
                  消費滿 100 元贈送 1 點紅利
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  紅利點數等同現金，1點 = $1元，可直接折抵商品金額
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  捐贈回饋之紅利積點可累計，且無使用時效性（不含特殊活動獲得之紅利）
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  紅利點數無法折抵運費
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  除因商品瑕疵因素，退貨後該訂單使用的紅利點數將無法歸還帳戶
                </li>
                <li className="text-gary-500 cart-info-li-text">
                  訂單內商品須全為捐贈區商品, 才可捐贈
                </li>
              </ol>
            </div>
            <ul className="list-unstyled mt-20 mt-md-26">
              <li className="cart-info-bgcolor py-8 py-md-4 px-10 d-flex align-items-center">
                <input
                  type="checkbox"
                  name="personalInfoAgree"
                  className="cart-info-checkbox me-6"
                  onChange={handleClick}
                  value={click.personalInfoAgree}
                />
                <p className="m-0 fw-light">
                  同意商店服務條款/會員責任規範及個資聲明。
                </p>
              </li>
              <li className="cart-info-bgcolor py-8 py-md-4 px-10 d-flex align-items-center mt-6">
                <input
                  type="checkbox"
                  name="vetoAgree"
                  className="cart-info-checkbox me-6"
                  onChange={handleClick}
                  value={click.vetoAgree}
                />
                <p className="m-0 fw-light">
                  為保障彼此之權益，賣家在收到您的訂單後仍保有決定是否接受訂單及出貨與否之權利。
                </p>
              </li>
            </ul>
            <div className="row mt-22 mb-26 mb-md-31">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-outline-primary-500 w-100 py-4"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  繼續選購
                </button>
              </div>
              <div className={`col-6 ${cart.length <= 0 && "d-none"}`}>
                <button
                  type="button"
                  className="btn btn-primary-500 w-100 py-4"
                  onClick={nextStep}
                >
                  填寫收件資料
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartConfirm;
