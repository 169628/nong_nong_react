import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <br />
      <br />
      <br />

      <footer className="footer bg-primary-500 text-white pt-20 pb-26 px-4 px-lg-26 pb-md-29">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 mb-20 mb-md-0">
              <div className="d-flex mb-6 footer-contact">
                <div className="footer-brand me-md-15">
                  <Link to="">
                    <img
                      className="footer-logo"
                      src="../images/logo/logo_default_white.png"
                      alt="農農自然Logo"
                    />
                  </Link>
                </div>
                <ul className="list-unstyled d-flex d-md-none pt-4 social-list">
                  <li className="me-2">
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
                <ul className="list-unstyled pt-4 contact-info">
                  <li className="mb-2 footer-contact-time">
                    客服時間：週一至週五 09:00 - 18:00
                  </li>
                  <li className="mb-2">
                    <span className="nong-d-none-sm">客服電話：</span>
                    <a href="tel:0800-000-000">0800-000-000</a>
                  </li>
                  <li>
                    <span className="nong-d-none-sm">客服信箱：</span>
                    <a href="mailto: exmanple@mail.com">exmanple@mail.com</a>
                  </li>
                </ul>
              </div>

              <div className="copyright">
                <p>本網站僅為學習使用 Copyright © 2024 農農自然保留一切權利</p>
              </div>
            </div>
            <div className="col-md-4 col-lg-6 mb-20 mb-md-0">
              <ul className="list-unstyled d-flex justify-content-center">
                <li className="me-15 me-lg-20">
                  <div className="mb-10 fs-5 fw-bolder">
                    <Link to="/products">商品列表</Link>
                  </div>
                </li>
                <li className="">
                  <a
                    className="mb-10 fs-5 fw-bolder"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    會員中心
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm-copyright">
              <p>
                本網站僅為學習使用
                <br />
                Copyright © 2024 農農自然保留一切權利
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/*浮動購物車按鈕*/}
      <div className="page-cart">
        <a
          href="cart-confirm.html"
          className="page-cart-link position-relative m-3"
        >
          <i className="bi bi-cart3"></i>
          <span className="position-absolute start-100 translate-middle badge rounded-circle bg-secondary-700 py-2 px-3 page-cart-num">
            2
          </span>
        </a>
      </div>
    </>
  );
}

export default Footer;
