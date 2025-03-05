import axios from "axios";
import { toast } from "react-toastify";

import { Toast } from "../../components/common/Toast";

function Process({ setStep }) {
  const user = {
    id: "6776a26276e2f6e0ea3a680f",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZhMjYyNzZlMmY2ZTBlYTNhNjgwZiIsIm5hbWUiOiLnvqnlpKfliKnpu5HmiYvpu6giLCJpYXQiOjE3NDA3MDg5NzMsImV4cCI6MTc0MTMxMzc3M30.JlbMypKCTpNIDE08wA81Avu-1FiCIrktzHWWL3Mrr1w",
  };

  const pay = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      const result = await axios.post(
        `${import.meta.env.VITE_APP_URL}/carts/pay/${user.id}`
      );
      if (result.data.result == 1) {
        setStep("finish");
      }
    } catch (error) {
      console.log(error);
      toast.error("結帳失敗");
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
        <Toast />
      </div>
    </>
  );
}

export default Process;
