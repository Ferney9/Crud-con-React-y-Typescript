import { ChangeEvent, useState } from "react";
import { ObjectFlags } from "typescript";

export const UseFormulario = <T extends Object>(objetoInicial: T) => {
    const [objeto, setObjeto] = useState(objetoInicial);

    const dobleEnlace = ({ target }: ChangeEvent<any>) => {
        const { name, value } = target;
        setObjeto({
            ...objeto,
            [name]: value
        });

    }
    return {
        objeto,
        dobleEnlace,
        ...objeto,
    };

};