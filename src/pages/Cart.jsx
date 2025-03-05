import { useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";

import ProgressBar from "../components/cart/ProgressBar";
import Order from "../components/cart/Order";
import CartConfirm from "../components/cart/CartConfirm";
import UserInfo from "../components/cart/UserInfo";
import Process from "../components/cart/Process";
import Finish from "../components/cart/Finish";

function Cart() {
  const [step, setStep] = useState("confirm");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState("宅配");
  return (
    <>
      <div className="container">
        <ProgressBar step={step} />

        {step == "confirm" && (
          <div className="row mt-md-26">
            <CartConfirm
              setStep={setStep}
              setLoading={setLoading}
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
