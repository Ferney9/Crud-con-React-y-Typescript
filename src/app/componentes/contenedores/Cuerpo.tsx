import { useState } from "react";
import { ARREGLO_CAMISAS } from "../../mocks/camiseta-mock";
import { Camisa } from "../../modelos/camisa";
import { MyVerticallyCenteredModal } from "../camisetas/Camisetas";
import { ARREGLO_MARCA_CAMISA } from "../../utilidades/dominios/dommarca";
import { ARREGLO_TALLA_CAMISA } from "../../utilidades/dominios/domtalla";

export const Cuerpo = () => {
  const [arrCamisa, setArrCamisa] = useState<Camisa[]>(ARREGLO_CAMISAS);
  const [modalShow, setModalShow] = useState<Boolean>(false);
  const [objCamisa, setObjCamisa] = useState<Camisa>(
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
                <th className="text-start text-center" style={{ width: "20%" }}>
                  NombreImagen
                </th>
                <th className="text-start text-center" style={{ width: "20%" }}>
                    Imagen
                </th>
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
                  <td className="text-center">
                    {miCamisa.base64ImagenCamisa !== "" ? (
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalShow(true);
                          setObjCamisa(miCamisa);
                        }}
                      >
                        <img
                          src={miCamisa.base64ImagenCamisa}
                          className="img"
                        />
                      </a>
                    ) : (
                      <div>No imagen</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            obj={objCamisa}
          />
        </div>
      </div>
    </div>
  );
};
