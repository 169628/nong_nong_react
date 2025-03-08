import { createHashRouter, RouterProvider } from "react-router-dom";

import "swiper/swiper-bundle.css";
import "./assets/all.scss";
import 'bootstrap/dist/js/bootstrap.min.js';
import routes from "./routes";
import Layout from "./Layout";

const router = createHashRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </>
  );
}

export default App;
