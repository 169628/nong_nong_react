import { Link } from "react-router-dom";
import OffCanvas from "../../components/header/OffCanvas"; // Import OffCanvas component
import OffCanvasSm from "../../components/header/OffCanvasSm";

function Header() {
  return (
    <div className="header pt-20 pb-6 py-md-6">
      <nav className="header-container d-flex justify-content-between align-items-center">
        {/* 使用 Link 來處理導航到首頁 */}
        <Link className="m-0 p-0 d-none d-md-block" to="/">
          <picture>
            {/* <source
              srcSet="/nong_nong_react/images/logo/logo_horizontal.png"
              media="(max-width: 767px)"
            /> */}
            <img
              className="img-fluid header-logo"
              src="/nong_nong_react/images/logo/logo_horizontal.png"
              alt="banner"
            />
          </picture>
        </Link>

        <div className="d-flex align-items-center">
          {/* OffCanvas for larger screens */}
          <div className="d-none d-md-block" >
            <OffCanvas />
          </div >
        </div>
      </nav >
      {/* mobile */}
      < nav className="d-block d-md-none header-container  d-flex justify-content-between align-items-center" style={{ maxWidth: '550px' }}>

        {/* OffCanvasSm for smaller screens (<= 768px) */}
        <div className="d-flex justify-content-between align-items-center w-100  " >
          <OffCanvasSm />
        </div>
      </nav>
    </div>
  );
}

export default Header;
