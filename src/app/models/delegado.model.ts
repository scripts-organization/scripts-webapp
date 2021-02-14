import { Recinto } from './recinto.model';

interface _DelegadoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Delegado {

    constructor(
        public nombre: string,
        public ci?: string,
        public celular?: string,
        public correo?: string,
        public _id?: string,
        public img?: string,
        public usuario?: _DelegadoUser,
        public recinto?: Recinto
    ) {}

}

