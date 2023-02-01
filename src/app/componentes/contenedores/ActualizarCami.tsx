import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CamisaMarca } from "../../modelos/camisamarca";
import { CamisaTalla } from "../../modelos/camisatalla";
import { ARREGLO_MARCA_CAMISA } from "../../utilidades/dominios/dommarca";
import { ARREGLO_TALLA_CAMISA } from "../../utilidades/dominios/domtalla";
import noFoto from "../../assets/noImagen.png";
import { Camisa } from "../../modelos/camisa";
import { UseFormulario } from "../../utilidades/misGanchos/UseFormulario";
import { ConvertirBase64 } from "../../utilidades/funciones/ConvertirBase64";
import { ARREGLO_CAMISAS } from "../../mocks/camiseta-mock";

export const ActualizarCami = () => {
  //Recibir un parametro

  let { codigo } = useParams();
  const camiSeleccionada = ARREGLO_CAMISAS.find((cami) => {
    return cami.codCamisa === Number(codigo);
  });

  //********************************************* */

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
  const [arregloTallas] = useState<CamisaTalla[]>(ARREGLO_TALLA_CAMISA);
  const [arregloMarcas] = useState<CamisaMarca[]>(ARREGLO_MARCA_CAMISA);
  const [arregloCamisas] = useState<Camisa[]>(ARREGLO_CAMISAS);
  const [imgBase64, setImgBase64] = useState<string>("");

  const updateCamisa = () => {
    const limit = arregloCamisas.length;
    for (let i = 0; i < limit; i++) {
      const compare = arregloCamisas[i].codCamisa;
      if (compare === camiSeleccionada?.codCamisa) {
        arregloCamisas[i] = new Camisa(
          codCamisa,
          marcaCamisa,
          tallaCamisa,
          colorCamisa,
          nombreImagencamisa === ""
            ? camiSeleccionada.nombreImagencamisa
            : nombreImagencamisa,
          imgBase64
        );
      }
    }
  };

  const navegacion = useNavigate();

  const enviarFormulario = (fh: formaHtml) => {
    fh.preventDefault();
    const formulario = fh.currentTarget;
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
      setEnProceso(true);
    } else {
      //Deberiamos grabar el vehiculo en todo
      updateCamisa();
      setEnProceso(false);
      navegacion("/lista");
    }
  };
  // **********************************
  const cargarImagen = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];
    setImagenMiniatura(URL.createObjectURL(imagen));
    // Bueno y el two Binding??
    dobleEnlace(e);
    const miBase64 = await ConvertirBase64(imagen);
    //La creamos hoy....Mire la siguiente linea
    setImgBase64(String(miBase64));
  };
  //Para hacer el two data binding(Asi lo llama angular, aca hook)
  let {
    codCamisa,
    marcaCamisa,
    tallaCamisa,
    colorCamisa,
    nombreImagencamisa,
    base64ImagenCamisa,
    dobleEnlace,
    objeto,
  } = UseFormulario<Camisa>(
    new Camisa(
      camiSeleccionada ? camiSeleccionada.codCamisa : 0,
      camiSeleccionada ? camiSeleccionada.marcaCamisa : "",
      camiSeleccionada ? camiSeleccionada.tallaCamisa : "",
      camiSeleccionada ? camiSeleccionada.colorCamisa : "",
      "",
      camiSeleccionada ? camiSeleccionada.base64ImagenCamisa : ""
    )
  );

  // **********************************

  useEffect(() => {
    setImgBase64(base64ImagenCamisa);
    setImagenMiniatura(base64ImagenCamisa);
  }, [base64ImagenCamisa]);

  return (
    <div className="container w-75 bg-second mt-4 rounded shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 colxl-6"></div>
        <div className="col bg-white p-5">
          <h2 className="titulo text-uppercase fw-bold text-center py-1">
            WELCOME TO CREATE Camisa
          </h2>

          <Form validated={enProceso} onSubmit={enviarFormulario} noValidate>
            <div className="mb-2">
              <Form.Group controlId="marcaCamisa">
                <Form.Label>
                  <span className="delete">*</span> Camisa marcaCamisa
                </Form.Label>
                <Form.Select
                  size="sm"
                  required
                  name="marcaCamisa"
                  value={marcaCamisa}
                  onChange={dobleEnlace}
                >
                  <option value="">Select a marcaCamisa</option>
                  {arregloMarcas.map((mimarca: CamisaMarca) => (
                    <option
                      key={mimarca.codigoMarca}
                      value={mimarca.codigoMarca}
                    >
                      {mimarca.nombreMarca}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="mb-2">
              <Form.Group controlId="tallaCamisa">
                <Form.Label>
                  <span className="delete">*</span>Talla camisa
                </Form.Label>
                <Form.Select
                  size="sm"
                  required
                  name="tallaCamisa"
                  value={tallaCamisa}
                  onChange={dobleEnlace}
                >
                  <option value="">Seleccione una Talla</option>
                  {arregloTallas.map((mitalla: CamisaTalla) => (
                    <option
                      key={mitalla.codigoTalla}
                      value={mitalla.codigoTalla}
                    >
                      {mitalla.nombreTalla}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="mb-2">
              <Form.Group controlId="colorCamisa">
                <Form.Label>
                  <span className="delete">*</span> colorCamisa
                </Form.Label>
                <Form.Control
                  size="sm"
                  required
                  type="text"
                  name="colorCamisa"
                  value={colorCamisa}
                  onChange={dobleEnlace}
                />
              </Form.Group>
            </div>

            <div className="mb-2">
              <Form.Group controlId="nombreImagencamisa">
                <Form.Label>
                  <span className="delete">*</span> Image:{" "}
                  <span className="delete">
                    {camiSeleccionada
                      ? camiSeleccionada.nombreImagencamisa
                      : ""}
                  </span>
                </Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  name="nombreImagencamisa"
                  value={nombreImagencamisa}
                  onChange={cargarImagen}
                />
              </Form.Group>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-center">
                <img src={imagenMiniatura} alt="No Imagen" className="min" />
              </div>
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Actualizar camisa
                </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
