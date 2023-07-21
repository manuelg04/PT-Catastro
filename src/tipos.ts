export type Predio = {
    image: any;
    node?: any;
    id: number;
    idpredio: number;
    numpre: string;
    nombre: string;
    valor: number;
    depto: string;
    municipio: string;
    propietarios: string;
    propietario?: string;
    construcciones?:string;
    terreno?:string;
}

export type Construccion = {
    imagen: any;
    node?: any;
    id:number;
    idpredio:number;
    numpisos:number;
    areatotal:number;
    tipocons:string;
    direccion:string;
    numpre: string;
    nombre: string;
    valor: number;
    depto: string;
    municipio: string;
    propietarios: string;
    propietario?: string;
    construcciones?:string;
    terreno?:string;
    area:number;
    valorcomer:number;
    tipoterre:string;
    consdentro: string;
    fuenagua:string;
}

export type Terreno = {
    imagen: any;
    node?: any;
    id:number;
    idpredio:number;
    area:number;
    valorcomer:number;
    tipoterre:string;
    consdentro: string;
    fuenagua:string;
}

export type Propietario = {
    idusuario: number;
    node?: any;
    id?:number;
    tipoprop?:string;
    tipodoc?:string;
    numdoc:number;
    nombre:string;
    direccion?:string;
    telefono?:number;
    email?:string;
    password:string;
}


