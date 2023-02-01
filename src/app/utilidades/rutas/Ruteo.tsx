import { Routes,Route } from "react-router-dom";
import { Crear } from "../../componentes/contenedores/Crear";
import { Cuerpo } from "../../componentes/contenedores/Cuerpo";
import { Administrar } from "../../componentes/contenedores/Administrar";
import { Bienvenida } from '../../componentes/contenedores/Bienvenida';
import { ActualizarCami } from '../../componentes/contenedores/ActualizarCami';




export const Ruteo = ()=>{
    return (
        <Routes>
            <Route path="/" element={<Bienvenida/>}/>
            <Route path="/lista" element={<Cuerpo/>}/>
            <Route path="/actualizar/:codigo" element={<ActualizarCami/>}/>
            <Route path="/crear" element={<Crear/>}/>
            <Route path="/admi" element={<Administrar/>}/> 
        </Routes>
    )
};