import logo1 from "../../assets/Imagen.png";

export const Bienvenida = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="col-md-6 mt-4 p-5 text-bg-dark rounded-3">
          <h2><img src={logo1} style={{ width: "32px" }} alt="El logo si sale" /><p/>Bienvenidos</h2>
          <p>Este es un proyecto Frontend en React con Typescript.</p>
          <p>Crud de almacèn de camisas</p>
        </div>
      </div>

    );
  };
  