import Layout from "../Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Cart from "../pages/Cart";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
