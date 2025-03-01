import { useNavigate } from "react-router-dom";
function Finish() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center pt-18">
        <div className="fs-2 text-primary-700 fw-bold">感謝您的訂購</div>
        <div className="pt-13 pb-35 w-100 text-center">
          <button
            type="button"
            className="btn btn-outline-primary-500 w-25 py-4"
            onClick={() => {
              navigate("/");
            }}
          >
            繼續購物
          </button>
        </div>
      </div>
    </>
  );
}

export default Finish;
