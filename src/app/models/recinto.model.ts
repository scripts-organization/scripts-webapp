interface _RecintoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Recinto {

    constructor(
        public nombre: string,
        public direccion?: string,
        public distrito?: string,
        public cantidadmesas?: string,
        public _id?: string,
        public img?: string,
        public usuario?: _RecintoUser,
    ) {}

}

