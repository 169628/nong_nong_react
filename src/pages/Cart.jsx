import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { pushToast } from "../slice/toastSlice";
import ProgressBar from "../components/cart/ProgressBar";
import Order from "../components/cart/Order";
import CartConfirm from "../components/cart/CartConfirm";
import UserInfo from "../components/cart/UserInfo";
import Process from "../components/cart/Process";
import Finish from "../components/cart/Finish";

function Cart() {
  const [step, setStep] = useState("confirm");
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState("宅配");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(
        pushToast({
          type: "error",
          message: "請先登入會員",
        })
      );
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <ProgressBar step={step} />
        {step == "confirm" && (
          <div className="row mt-md-26">
            <CartConfirm
              setStep={setStep}
              setTotal={setTotal}
              delivery={delivery}
              setDelivery={setDelivery}
            />
            <Order total={total} delivery={delivery} />
          </div>
        )}
        {step == "fill" && (
          <div className="row mt-md-26">
            <UserInfo setStep={setStep} delivery={delivery} />
            <Order total={total} delivery={delivery} />
          </div>
        )}
        {step == "process" && <Process setStep={setStep} />}
        {step == "finish" && <Finish />}
      </div>
    </>
  );
}

export default Cart;
