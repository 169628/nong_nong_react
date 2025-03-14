import { useState } from "react";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { pushToast } from "../../slice/toastSlice";

function UserInfo({ setStep, delivery }) {
  const [bill, setBill] = useState("電子");
  const [pay, setPay] = useState("信用卡");
  const { userName } = useSelector((state) => state.user);
  const [order, setOrder] = useState({
    name: userName || "",
    tel: "",
    email: "",
  });
  const [receive, setReceive] = useState({
    name: "",
    tel: "",
    email: "",
    code: "",
    address: "",
  });
  const [storehouse, setStorehouse] = useState("");
  const dispatch = useDispatch();
  const handleOrder = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  const fillIn = () => {
    setReceive({
      ...order,
      code: "",
      address: "",
    });
  };
  const handleReceive = (e) => {
    setReceive({
      ...receive,
      [e.target.name]: e.target.value,
    });
  };
  const handlePay = () => {
    const regex = /^(0[2-8]\d{7}|09\d{8})$/;
    const codeRegex = /^\d{5}$/;
    if (!order.name) {
      return dispatch(
        pushToast({
          type: "error",
          message: "訂購人姓名不可為空白",
        })
      );
    } else if (!order.tel) {
      return dispatch(
        pushToast({
          type: "error",
          message: "訂購人電話不可為空白",
        })
      );
    } else if (!validator.matches(order.tel, regex)) {
      return dispatch(
        pushToast({
          type: "error",
          message: "訂購人電話格式錯誤",
        })
      );
    } else if (!order.email) {
      return dispatch(
        pushToast({
          type: "error",
          message: "訂購人信箱不可為空白",
        })
      );
    } else if (!validator.isEmail(order.email)) {
      return dispatch(
        pushToast({
          type: "error",
          message: "訂購人信箱格式錯誤",
        })
      );
    }
    if (delivery == "宅配") {
      if (!receive.name) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人姓名不可為空白",
          })
        );
      } else if (!receive.tel) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人電話不可為空白",
          })
        );
      } else if (!validator.matches(receive.tel, regex)) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人電話格式錯誤",
          })
        );
      } else if (!receive.email) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人信箱不可為空白",
          })
        );
      } else if (!validator.isEmail(receive.email)) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人信箱格式錯誤",
          })
        );
      } else if (!receive.code) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人郵遞區號不可為空白",
          })
        );
      } else if (!validator.matches(receive.code, codeRegex)) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人郵遞區號格式錯誤",
          })
        );
      } else if (!receive.address) {
        return dispatch(
          pushToast({
            type: "error",
            message: "收件人地址不可為空白",
          })
        );
      }
    } else if (delivery == "自取") {
      if (storehouse == "") {
        return dispatch(
          pushToast({
            type: "error",
            message: "請選擇一個自取倉庫",
          })
        );
      }
    }
    setStep("process");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="col col-lg-8 d-flex flex-column gap-26">
        <div className="buyer">
          <div className="fs-2 text-primary-700 fw-bold mb-15">訂購人資訊</div>
          <div className="form d-flex flex-column gap-10 mb-15">
            <div className="buyer-name row">
              <span className="col-sm-3 col-xl-2 text-gary-500">
                訂購人姓名
                <span className="fs-5" style={{ color: "#D16A30" }}>
                  *
                </span>
              </span>
              <div className="col-sm-9 col-xl-10">
                <input
                  id="buyer-name"
                  name="name"
                  type="text"
                  className="cart-input-form text-black cart-input-form-info"
                  placeholder="請輸入真實姓名"
                  value={order.name}
                  onChange={handleOrder}
                />
                <div className="py-1 text-gary-500 cart-info-li-text">
                  ※ 請輸入真實姓名
                </div>
              </div>
            </div>
            <div className="buyer-phone row">
              <span className="col-sm-3 col-xl-2 text-gary-500">
                聯絡電話
                <span className="fs-5" style={{ color: "#D16A30" }}>
                  *
                </span>
              </span>
              <div className="col-sm-9 col-xl-10">
                <input
                  id="buyer-phone"
                  name="tel"
                  type="text"
                  className="cart-input-form text-black cart-input-form-info"
                  placeholder="0912345678"
                  value={order.tel}
                  onChange={handleOrder}
                />
              </div>
            </div>
            <div className="buyer-email row">
              <span className="col-sm-3 col-xl-2 text-gary-500">
                聯絡信箱
                <span className="fs-5" style={{ color: "#D16A30" }}>
                  *
                </span>
              </span>
              <div className="col-sm-9 col-xl-10">
                <input
                  id="buyer-email"
                  name="email"
                  type="text"
                  className="cart-input-form text-black cart-input-form-info"
                  placeholder="example@mail.com"
                  value={order.email}
                  onChange={handleOrder}
                />
              </div>
            </div>
          </div>
          <div className="cart-info-bgcolor p-10 mt-lg-10">
            <p className="text-primary-300 fw-bold">【 配送狀態查詢 】</p>
            <ol className="mb-0 ps-6">
              <li className="text-gary-500 cart-info-li-text">
                點選「會員中心」之「訂單查詢」，點選訂單編號,即可查看訂單配送狀態
              </li>
              <li className="text-gary-500 cart-info-li-text">
                如訂單狀態已進入「準備出貨」，恕無法更改訂單
              </li>
              <li className="text-gary-500 cart-info-li-text">
                如訂購之商品無法順利出貨或缺貨，我們將以 Email 或電話主動通知您
              </li>
            </ol>
          </div>
        </div>
        {/* 宅配 */}
        {delivery == "宅配" && (
          <div className="recipient">
            <div className="mb-15 d-flex">
              <span
                className="fs-2 text-primary-700 fw-bold"
                style={{ marginRight: "32px" }}
              >
                宅配資訊
              </span>
              <button
                type="button"
                className="btn btn-outline-gary-500 py-2 px-13 fs-6 cart-btn-hover"
                onClick={fillIn}
              >
                同訂購人資料
              </button>
            </div>
            <div className="form d-flex flex-column gap-10">
              <div className="recipient-name row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  收件人姓名
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="recipient-name"
                    type="text"
                    className="cart-input-form text-black cart-input-form-info"
                    placeholder="請輸入真實姓名"
                    name="name"
                    value={receive.name}
                    onChange={handleReceive}
                  />
                </div>
              </div>
              <div className="recipient-phone row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  聯絡電話
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="recipient-phone"
                    type="text"
                    className="cart-input-form text-black cart-input-form-info"
                    placeholder="0912345678"
                    name="tel"
                    value={receive.tel}
                    onChange={handleReceive}
                  />
                </div>
              </div>
              <div className="recipient-email row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  聯絡信箱
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="recipient-email"
                    type="text"
                    className="cart-input-form text-black cart-input-form-info"
                    placeholder="example@mail.com"
                    name="email"
                    value={receive.email}
                    onChange={handleReceive}
                  />
                </div>
              </div>
              <div className="recipient-postalcode row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  郵遞區號
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="recipient-postalcode"
                    type="text"
                    className="cart-input-form text-black cart-input-form-info"
                    placeholder="00000"
                    name="code"
                    value={receive.code}
                    onChange={handleReceive}
                  />
                </div>
              </div>
              <div className="recipient-address row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  寄送地址
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="recipient-address"
                    type="text"
                    className="cart-input-form text-black cart-input-form-info"
                    name="address"
                    value={receive.address}
                    onChange={handleReceive}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 自取 */}
        {delivery == "自取" && (
          <div className="recipient">
            <div className="mb-15 d-flex">
              <span
                className="fs-2 text-primary-700 fw-bold"
                style={{ marginRight: "32px" }}
              >
                倉庫自取
              </span>
            </div>
            <div className="form d-flex flex-column gap-10">
              <div className="recipient-storage row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  取貨倉庫
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10 d-flex storage gap-6 justify-content-between">
                  <select
                    className="form-select cart-input-form cart-input-form-info fs-6 px-6 py-2 text-gary-500 border border-gary-500 rounded-1"
                    aria-label="Default select example"
                    defaultValue={storehouse}
                    onChange={(e) => setStorehouse(e.target.value)}
                  >
                    <option value="" disabled>
                      請選擇欲取貨的倉庫
                    </option>
                    <option value="台北倉庫">台北倉庫</option>
                    <option value="南投倉庫">南投倉庫</option>
                    <option value="高雄倉庫">高雄倉庫</option>
                    <option value="嘉義倉庫">嘉義倉庫</option>
                  </select>
                  <div className="btn-storage">
                    {/* <button
                    type="button"
                    className="btn btn-outline-gary-500 py-2 px-10 fs-6 cart-btn-hover"
                    style={{ fontWeight: "500" }}
                  >
                    <img
                      src="/images/icon/box-gary-500.svg"
                      alt="box"
                      className="mb-1"
                      style={{ marginRight: "8px" }}
                    />
                    庫存查詢
                  </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="invoice">
          <div className="fs-2 text-primary-700 fw-bold mb-15">發票設定</div>
          <div>
            <span className="text-gary-500">請選擇發票類型</span>
            <div className="mb-15 mt-6 d-flex gap-10 flex-wrap">
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  bill == "紙本" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setBill("紙本");
                }}
              >
                紙本發票
              </button>
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  bill == "電子" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setBill("電子");
                }}
              >
                電子發票
              </button>
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  bill == "三聯式" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setBill("三聯式");
                }}
              >
                三聯式發票
              </button>
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  bill == "捐贈" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setBill("捐贈");
                }}
              >
                捐贈發票
              </button>
            </div>
          </div>
          <div className="form d-flex flex-column gap-10">
            <div className="invoice-carrier row">
              <span className="col-sm-3 col-xl-2 text-gary-500">
                手機載具條碼
                {/* <span className="fs-5" style={{ color: "#D16A30" }}>
                  *
                </span> */}
              </span>
              <div className="col-sm-9 col-xl-10">
                <input
                  id="invoice-carrier"
                  type="text"
                  className="cart-input-form text-black cart-input-form-info"
                  placeholder="/123ABCD"
                />
                <div className="py-1 text-gary-500 cart-info-li-text">
                  ※ 若未填手機戴具條碼，電子發票自動捐贈各基金會
                </div>
              </div>
            </div>
            <div className="invoice-taxId row">
              <span className="col-sm-3 col-xl-2 text-gary-500">統一編號</span>
              <div className="col-sm-9 col-xl-10">
                <input
                  id="invoice-taxId"
                  type="text"
                  className="cart-input-form text-black cart-input-form-info"
                  placeholder="請輸入統一編號"
                />
              </div>
            </div>
            <div className="invoice-donation row">
              <span className="col-sm-3 col-xl-2 text-gary-500">捐贈單位</span>
              <div className="col-sm-9 col-xl-10 ">
                <select
                  defaultValue="0"
                  className="form-select cart-input-form cart-input-form-info fs-6 px-6 py-2 text-gary-500 border border-gary-500 rounded-1"
                  aria-label="Default select example"
                >
                  <option value="0" selected>
                    請選擇欲捐贈單位
                  </option>
                  <option value="1">AAA</option>
                  <option value="2">BBB</option>
                  <option value="3">CCC</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="notes">
          <div className="fs-2 text-primary-700 fw-bold mb-15">訂單備註</div>
          <textarea
            name="order-notes"
            placeholder="若有購買的特殊需求，請填寫備註"
            cols="20"
            rows="5"
            className="cart-input-form text-black cart-input-form-info"
          ></textarea>
        </div>
        <div className="payments">
          <div className="fs-2 text-primary-700 fw-bold mb-15">付款方式</div>
          {/* <div className="d-block d-lg-none pt-13 pb-15">
            <p className="m-0 fs-6 fw-medium py-4 text-white text-center bg-primary-300 cart-info-top-border">
              訂單摘要
            </p>
            <div className="bg-white cart-info-bottom-border p-10 px-lg-13">
              <ul className="list-unstyled p-0">
                <li className="d-flex justify-content-between mb-10">
                  <span className="text-gary-500">商品總金額</span>
                  <span className="text-gary-500">NT. 1,552</span>
                </li>
                <li className="d-flex justify-content-between mb-10">
                  <span className="text-gary-500">運費總金額</span>
                  <span className="text-gary-500">NT. 60</span>
                </li>
                <li className="d-flex justify-content-between mb-10">
                  <span className="text-gary-500">折扣</span>
                  <span className="text-primary-500">－NT. 60</span>
                </li>
                <li className="d-flex justify-content-between mb-10">
                  <span className="text-gary-500">紅利折抵</span>
                  <span className="text-primary-500">－ NT. 2</span>
                </li>
              </ul>
              <div className="d-flex justify-content-between align-items-center border-top border-gary-500 pt-10 pb-6">
                <span className="text-gary-500 cart-total-price-font">
                  結帳總金額
                </span>
                <span className="text-primary-500 fs-4 fw-bold">$ 1,550</span>
              </div>
              <div className="d-flex justify-content-between align-items-center cart-info-bgcolor py-8 px-6">
                <span className="text-gary-500 cart-info-li-text">
                  此筆訂單捐贈後可獲得紅利
                </span>
                <span className="text-primary-300 fs-6 fw-bold">11 點</span>
              </div>
            </div>
          </div> */}
          <div>
            <span className="text-gary-500">請選擇付款方式</span>
            <div className="mb-15 mt-6 d-flex gap-10 flex-wrap">
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  pay == "信用卡" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setPay("信用卡");
                }}
              >
                信用卡/金融卡
              </button>
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  pay == "轉帳" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setPay("轉帳");
                }}
              >
                虛擬帳戶轉帳
              </button>
              <button
                type="button"
                className={`btn btn-outline-gary-500 py-4 px-13 fs-6 cart-btn-hover ${
                  pay == "line" && "active"
                }`}
                style={{ fontWeight: "500" }}
                onClick={() => {
                  setPay("line");
                }}
              >
                LINE Pay
              </button>
            </div>
          </div>
          {/* {pay == "信用卡" && (
            <div className="form d-flex flex-column gap-10">
              <div className="creditCard-name row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  持卡人姓名
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="creditCard-name"
                    type="text"
                    className="cart-input-form cart-input-form-info"
                    placeholder="請輸入與卡片相同的姓名"
                  />
                </div>
              </div>
              <div className="creditCard-number row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  信用卡卡號
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="creditCard-number"
                    type="text"
                    className="cart-input-form cart-input-form-info"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
              </div>
              <div className="creditCard-date row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  有效日期
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="creditCard-date"
                    type="text"
                    className="cart-input-form cart-input-form-info"
                    placeholder="MM/YY"
                  />
                </div>
              </div>
              <div className="creditCard-CVC row">
                <span className="col-sm-3 col-xl-2 text-gary-500">
                  驗證碼
                  <span className="fs-5" style={{ color: "#D16A30" }}>
                    *
                  </span>
                </span>
                <div className="col-sm-9 col-xl-10">
                  <input
                    id="creditCard-CVC"
                    type="text"
                    className="cart-input-form cart-input-form-info"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )} */}
        </div>
        <div className="row mb-26 mb-md-31">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-outline-primary-500 w-100 py-4"
              onClick={() => {
                setStep("confirm");
              }}
            >
              回到上一步
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary-500 w-100 py-4"
              onClick={handlePay}
            >
              立即結帳
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
