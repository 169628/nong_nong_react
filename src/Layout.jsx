import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "./pages/Layout/Header";
import Footer from "./pages/Layout/Footer";
import { Toast } from "./components/common/Toast";
import { toast } from "react-toastify";

function Layout() {
  const message = useSelector((state) => {
    return state.toast.data;
  });

  useEffect(() => {
    if (!message.type) return;
    if (message.type == "success") {
      toast.success(message.message);
    } else if (message.type == "error") {
      toast.error(message.message);
    }
  }, [message]);

  return (
    <>
      <Header />
      <Toast />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
