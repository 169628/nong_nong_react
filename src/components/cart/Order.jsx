function Order({ total, delivery }) {
  const orderPrice = total || 0;
  const deliveryFee = delivery == "自取" ? 0 : 60;
  return (
    <>
      <div className="d-none d-lg-block col-lg-4">
        <div className="p-0 px-lg-4">
          <p className="m-0 fs-6 fw-medium py-4 text-white text-center bg-primary-300 cart-info-top-border">
            訂單摘要
          </p>
          <div className="bg-white cart-info-bottom-border p-10 px-lg-13">
            <ul className="list-unstyled p-0">
              <li className="d-flex justify-content-between mb-10">
                <span className="text-gary-500">商品總金額</span>
                <span className="text-gary-500">NT. {orderPrice}</span>
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
            <div className="d-flex justify-content-between align-items-center border-top border-gary-500 pt-10 pb-6">
              <span className="text-gary-500 cart-total-price-font">
                結帳總金額
              </span>
              <span className="text-primary-500 fs-4 fw-bold">
                $ {Math.round((orderPrice + deliveryFee) * 0.9)}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center cart-info-bgcolor py-8 px-6">
              <span className="text-gary-500 cart-info-li-text">
                此筆訂單捐贈後可獲得紅利
              </span>
              <span className="text-primary-300 fs-6 fw-bold">
                {Math.round(Math.round((orderPrice + deliveryFee) * 0.9) / 100)}{" "}
                點
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
