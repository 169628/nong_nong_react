// 示範 toast

import { Toast } from "../../components/common/Toast";
import { toast } from "react-toastify";

function Header() {
  const success = () => {
    toast.success("header!!!");
  };
  const fail = () => {
    toast.error("header!!!");
  };
  return (
    <>
      <h1>Header</h1>
      <Toast />
      <button type="button" onClick={success}>
        成功
      </button>
      <button type="button" onClick={fail}>
        失敗
      </button>
    </>
  );
}

export default Header;
