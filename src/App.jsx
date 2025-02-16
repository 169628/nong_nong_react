import { createHashRouter, RouterProvider } from "react-router-dom";

import "./assets/all.scss";
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
