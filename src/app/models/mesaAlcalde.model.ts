import { Recinto } from './recinto.model';

interface _MesaAlcaldeUser {
  _id: string;
  nombre: string;
  img: string;
}

export class MesaAlcalde {
  constructor(
    public _id?: string,
    public codigo?: string,
    public numero?: number,
    public llenada?: boolean,
    public habilitados?: number,
    public sumate?: number,
    public fpv?: number,
    public pdc?: number,
    public somos?: number,
    public mas_ipsp?: number,
    public ca?: number,
    public mts?: number,
    public pan_bol?: number,
    public ucs?: number,
    public blancos?: number,
    public nulos?: number,
    public img_1?: string,
    public img_2?: string,
    public img_3?: string,

    public usuario?: _MesaAlcaldeUser,
    public recinto?: Recinto
  ) {}
}
