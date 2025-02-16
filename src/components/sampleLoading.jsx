import { useEffect, useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="container text-center">
          <RiseLoader color="#966A09" size={30} />
        </div>
      ) : (
        <h1>Home</h1>
      )}
    </>
  );
}

export default Home;
