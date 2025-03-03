import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import OffCanvas from "../../components/header/OffCanvas"; // Import OffCanvas component
import { checkAuthStatusAsync } from "../../slice/userSlice"; // Action to check auth status

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from Redux
  const { isAuthenticated, userName } = useSelector((state) => state.user);

  // Check authentication status when the component mounts
  useEffect(() => {
    dispatch(checkAuthStatusAsync()); // Dispatch action to check authentication status
  }, [dispatch]);

  // Handle logo click events
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      console.log("not logged in.");
    } else {
      console.log("Already logged in.");
      navigate("/");
    }
  };

  return (
    <div className="header pt-20 pb-6 py-md-6">
      <nav className="header-container d-flex justify-content-between align-items-center">
        {/* 使用 Link 來處理導航到首頁 */}
        <Link className="m-0 p-0" to="/" onClick={handleLogoClick}>
          <picture>
            <source srcSet="/images/logo/logo_horizontal.png" media="(max-width: 767px)" />
            <img className="img-fluid header-logo" src="/images/logo/logo_horizontal.png" alt="banner" />
          </picture>
        </Link>

        <div className="d-flex align-items-center">
          {/* OffCanvas component now receives props to check login status */}
          <OffCanvas isAuthenticated={isAuthenticated} userName={userName} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
