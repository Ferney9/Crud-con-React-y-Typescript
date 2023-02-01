import { useState } from "react";
import { ARREGLO_CAMISAS } from "../../mocks/camiseta-mock";
import { Camisa } from "../../modelos/camisa";
import { MyVerticallyCenteredModal } from "../camisetas/Camisetas";
import { ARREGLO_MARCA_CAMISA } from "../../utilidades/dominios/dommarca";
import { ARREGLO_TALLA_CAMISA } from "../../utilidades/dominios/domtalla";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Administrar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [arrCamisa, setArrCamisa] = useState<Camisa[]>(ARREGLO_CAMISAS);
  const [modalShow, setModalShow] = useState<Boolean>(false);
  const [objVehiculo, setObjVehiculo] = useState<Camisa>(
    new Camisa(0, "", "", "", "", "")
  );
  const nombreMarca = (marca: string) => {
    let nombre;
    ARREGLO_MARCA_CAMISA.forEach((marcas) => {
      if (marcas.codigoMarca == marca) {
        nombre = marcas.nombreMarca;
      }
    });
    return nombre;
  };
  const nombreTalla = (talla: string) => {
    let nombre;
    ARREGLO_TALLA_CAMISA.forEach((tallas) => {
      if (tallas.codigoTalla == talla) {
        nombre = tallas.nombreTalla;
      }
    });
    return nombre;
  };

  const borrarCamisa = (codigo: number) => {
    const limite = arrCamisa.length;
    for (let i = 0; i < limite; i++) {
      if (arrCamisa[i] !== undefined) {
        const comparar = arrCamisa[i].codCamisa;
        if (comparar === codigo) {
          arrCamisa.splice(i, 1);
        }
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <div className="col-md-8 mt-4">
          <table className="table table-dark table-hover table-sm">
            <thead>
              <tr className="table-danger text-center">
                <th style={{ width: "10%" }}>Código</th>
                <th className="text-start text-center" style={{ width: "20%" }}>
                  Marca
                </th>
                <th className="text-start text-center" style={{ width: "20%" }}>
                  Talla
                </th>
                <th className="text-start text-center" style={{ width: "10%" }}>
                  Color
                </th>
                <th className="text-start text-center" style={{ width: "30%" }}>
                  NombreImagen
                </th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
            <tbody>
              {arrCamisa.map((miCamisa: Camisa, indice: number) => (
                <tr key={miCamisa.codCamisa}>
                  <td className="text-center">{miCamisa.codCamisa}</td>
                  <td className="text-center">{nombreMarca(miCamisa.marcaCamisa)}</td>
                  <td className="text-center">{nombreTalla(miCamisa.tallaCamisa)}</td>
                  <td className="text-center">{miCamisa.colorCamisa}</td>
                  <td className="text-center">{miCamisa.nombreImagencamisa}</td>
                  <td>
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                        setObjVehiculo(miCamisa);
                      }}
                    >
                      <i className="fa-solid fa-trash-can rojo"></i>{" "}
                    </a>
                    <Link to={`/actualizar/${miCamisa.codCamisa}`}>
                      <i className="fa-solid fa-edit" />{" "}
                    </Link>
                    <i className="fa-solid fa-rotate verde>"></i>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Eliminar </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estas seguro?
              {"   "}
              <strong>
                {objVehiculo.marcaCamisa} {objVehiculo.nombreImagencamisa}
              </strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  e.preventDefault();
                  borrarCamisa(objVehiculo.codCamisa);
                  setShow(false);
                }}
              >
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            obj={objVehiculo}
          />
        </div>
      </div>
    </div>
  );
};
