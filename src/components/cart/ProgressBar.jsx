function ProgressBar({ step }) {
  const state = step || "";
  return (
    <>
      <div className="cart-out-progressbar d-none d-lg-block mt-22 pt-22 mb-31 mx-auto">
        <div className="position-relative">
          <div
            className="progress"
            role="progressbar"
            aria-label="Progress"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: "1px" }}
          >
            <div
              className="progress-bar bg-primary-500"
              style={{ width: "100%" }}
            ></div>
          </div>
          <a
            href="#"
            className="position-absolute top-0 start-0 translate-middle d-flex flex-column align-items-center"
          >
            <span
              className={`${
                state == "confirm" ? "span-full" : "span-outline"
              } rounded-3`}
            >
              1
            </span>
            <p className="font-probar">確認訂單</p>
          </a>
          <a
            href="#"
            className="position-absolute top-0 start-33 translate-middle d-flex flex-column align-items-center"
          >
            <span
              className={`${
                state == "fill" ? "span-full" : "span-outline"
              } rounded-3`}
            >
              2
            </span>
            <p className="font-probar">填寫收件資料</p>
          </a>
          <a
            href="#"
            className="position-absolute top-0 start-66 translate-middle d-flex flex-column align-items-center"
          >
            <span
              className={`${
                state == "process" ? "span-full" : "span-outline"
              } rounded-3`}
            >
              3
            </span>
            <p className="font-probar">進行付款</p>
          </a>
          <a
            href="#"
            className="position-absolute top-0 finish-position translate-middle-y d-flex flex-column align-items-center"
          >
            <span
              className={`${
                state == "finish" ? "span-full" : "span-outline"
              } rounded-3`}
            >
              4
            </span>
            <p className="font-probar">完成購買</p>
          </a>
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
