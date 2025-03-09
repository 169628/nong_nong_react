import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { pushToast } from "../../slice/toastSlice";
import { asyncCart } from "../../slice/cartSlice";

function Process({ setStep }) {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const pay = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_APP_URL}/carts/pay/${userId}`
      );
      if (result.data.result == 1) {
        dispatch(asyncCart());
        setStep("finish");
      }
    } catch (error) {
      console.log(error);
      dispatch(
        pushToast({
          type: "error",
          message: "結帳失敗",
        })
      );
      setStep("confirm");
    }
  };
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center pt-18">
        <div className="fs-2 text-primary-700 fw-bold">第三方支付</div>
        <div className="row w-50 my-26 my-md-31">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-outline-primary-500 w-100 py-4"
              onClick={() => {
                setStep("fill");
              }}
            >
              回到上一步
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary-500 w-100 py-4"
              onClick={pay}
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Process;
