// 示範 modal (offcanvas 只要把 modal 換掉就好了)

import { useState } from "react";
import Modal from "../../components/common/Modal";

function Home() {
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };

  return (
    <>
      <h1>Home</h1>
      <button type="button" onClick={handleModal}>
        出現
      </button>
      <Modal show={show} setShow={setShow} />
    </>
  );
}

export default Home;
