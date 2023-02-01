import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CamisaMarca } from "../../modelos/camisamarca";
import { CamisaTalla } from "../../modelos/camisatalla";
import { ARREGLO_MARCA_CAMISA } from "../../utilidades/dominios/dommarca";
import { ARREGLO_TALLA_CAMISA } from "../../utilidades/dominios/domtalla";
import imagen from "../../assets/imagenNoDisponible.png";
import { UseFormulario } from "../../utilidades/misGanchos/UseFormulario";
import { Camisa } from "../../modelos/camisa";
import { ConvertirBase64 } from "../../utilidades/funciones/ConvertirBase64";
import { ARREGLO_CAMISAS } from "../../mocks/camiseta-mock";
import logo from "../../assets/iconRopa.png";

export const Crear = () => {
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [imagenMiñatura, setImagenMinatura] = useState(imagen);
  const [arregloMarcas] = useState<CamisaMarca[]>(ARREGLO_MARCA_CAMISA);
  const [arregloTallas] = useState<CamisaTalla[]>(ARREGLO_TALLA_CAMISA);
  const [arregloCamisas] = useState<Camisa[]>(ARREGLO_CAMISAS);
  const [imgBase64, setImgBase64] = useState<string>("");
  const navegacion = useNavigate();

  const enviarFormulario = (fh: formaHtml) => {
    fh.preventDefault();
    const formulario = fh.currentTarget;
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
      setEnProceso(true);
    } else {
      const nuevoCodigo = arregloCamisas.length + 1;
      objeto.codCamisa = nuevoCodigo;
      objeto.base64ImagenCamisa = imgBase64;

      arregloCamisas.push(objeto);
      setEnProceso(false);
      navegacion("/lista");
    }
  };

  // el two data binding (asi se llama en angular , aca es el hook)
  let {
    codCamisa,
    marcaCamisa,
    tallaCamisa,
    colorCamisa,
    nombreImagencamisa,
    dobleEnlace,
    objeto,
  } = UseFormulario<Camisa>(new Camisa(0, "", "", "", "", ""));

  //cargar imagen
  const cargarImagen = async (e: any) => {
    const archivos = e.target.files;
    const imagen = archivos[0];

    setImagenMinatura(URL.createObjectURL(imagen));
    dobleEnlace(e);
    const miBase64 = await ConvertirBase64(imagen);
    setImgBase64(String(miBase64));
  };
  return (
      <div className="container w-75 bg-second mt-4 rounded shadow">
        <div className="row align-items-stretch">
          <div className="col bg d-none d-lg-block col-md-5 col-lg-5 colxl-6"></div>
          <div className="col bg-white p-5">
            <h2 className="titulo text-uppercase fw-bold text-center py-1">
              BIENVENIDO A CREAR CAMISA
            </h2>
            <Form
              validated={enProceso}
              onSubmit={enviarFormulario}
              noValidate
            >
                  <div className="mb-2">
                    <Form.Group controlId="marcaCamisa">
                      <Form.Label>
                        <span className="span">*</span>Marca camisa
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        required
                        name="marcaCamisa"
                        value={marcaCamisa}
                        onChange={dobleEnlace}
                      >
                        <option value="">Seleccione una marca</option>
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
                        <span className="span">*</span>Talla camisa
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
                        <span className="span">*</span>Color camisa
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
                        <span className="span">*</span>Imagen
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        required
                        type="file"
                        name="nombreImagencamisa"
                        value={nombreImagencamisa}
                        onChange={cargarImagen}
                      />
                    </Form.Group>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-center ">
                      <img
                        src={imagenMiñatura}
                        alt="no imagen"
                        className="tamañoMaximoNoFoto"
                      ></img>
                    </div>
                  </div>
                  <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Crear camisa
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      
  );
};
