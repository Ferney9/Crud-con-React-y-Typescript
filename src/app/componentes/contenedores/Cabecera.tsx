import { Link } from "react-router-dom";
import logo from "../../assets/IconRopa2.png";

export const Cabecera = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark space-around">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          <img src={logo} style={{ width: "32px" }} alt="El logo si sale" />{" "}
          React Camisetas
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Inicio
              </Link>
            </li>
            <li className="nav-item  mx-auto ">
              <Link to="/crear" className="nav-link">
                Crear Camisas
              </Link>
            </li>

            <li className="nav-item dropdown letra">
              <a
                className="nav-link dropdown-toggle btn-group text-bg-danger"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Camisas
              </a>
              <ul className="dropdown-menu titulito">
                <li>
                  <Link to="/admi" className="dropdown-item">
                    Administrar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lista"
                    className="dropdown-item"
                    aria-current="page"
                  >
                    Catalogo
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-info " type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
