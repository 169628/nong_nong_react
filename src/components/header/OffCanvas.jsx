import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

function MyOffcanvas({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={false}
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
          <div>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MyOffcanvas;
