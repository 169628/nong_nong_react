// 示範連接後端資料
import axios from "axios";
import { useEffect } from "react";

function Home() {
  const getProducts = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/products`
      );
      console.log(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export default Home;
