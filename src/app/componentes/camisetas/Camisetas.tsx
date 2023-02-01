import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ARREGLO_CAMISAS } from "../../mocks/camiseta-mock";

export const MyVerticallyCenteredModal = (props: any) => {
  const codigoCamisa = Number(props.obj.codCamisa);
  const miCamisa = ARREGLO_CAMISAS.find((laCamisa) => {
    return laCamisa.codCamisa == codigoCamisa;
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="responsivetable contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="formstructor after contained-modal-title-vcenter">
          Marca: {miCamisa?.marcaCamisa}{" "} 
          Talla: {miCamisa?.tallaCamisa}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-around">
          <img className="tamañomaximo" src={miCamisa?.base64ImagenCamisa} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar </Button>
      </Modal.Footer>
    </Modal>
  );
};
