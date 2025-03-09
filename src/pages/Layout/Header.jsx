import { Link } from "react-router-dom";
import OffCanvas from "../../components/header/OffCanvas"; // Import OffCanvas component

function Header() {
  return (
    <div className="header pt-20 pb-6 py-md-6">
      <nav className="header-container d-flex justify-content-between align-items-center">
        {/* 使用 Link 來處理導航到首頁 */}
        <Link className="m-0 p-0" to="/">
          <picture>
            <source
              srcSet="/images/logo/logo_horizontal.png"
              media="(max-width: 767px)"
            />
            <img
              className="img-fluid header-logo"
              src="/images/logo/logo_horizontal.png"
              alt="banner"
            />
          </picture>
        </Link>

        <div className="d-flex align-items-center">
          <OffCanvas />
        </div>
      </nav>
    </div>
  );
}

export default Header;
