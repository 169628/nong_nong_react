import Modal from "react-bootstrap/Modal";

function StockModal({ show, setShow, product }) {
  const stock = product?.stockQuantity?.[0]?.stock || [];

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header
          closeButton
          style={{ borderBottom: "none" }}
          className="px-13 pt-13"
        >
          <Modal.Title id="contained-modal-title-vcenter">庫存查詢</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-13 pb-13">
          <table className="w-100 text-center rounded-3 overflow-hidden">
            <thead className="bg-primary-700 text-white">
              <tr>
                <th className="py-6 fw-normal">倉庫名稱</th>
                <th className="py-6 fw-normal">商品庫存數</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gary-500">
              {stock.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="py-6">{item.warehouse}</td>
                    <td className="py-6">{item.showQuantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StockModal;
