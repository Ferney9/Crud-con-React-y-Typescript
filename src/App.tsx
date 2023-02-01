import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Ruteo } from './app/utilidades/rutas/Ruteo';
import { Footer } from './app/componentes/contenedores/Footer';
import { Cabecera } from './app/componentes/contenedores/Cabecera';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Cabecera/>
        <Ruteo/>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
