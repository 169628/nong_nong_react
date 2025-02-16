import { Outlet } from "react-router-dom";

import Header from "./pages/Layout/Header";
import Footer from "./pages/Layout/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
