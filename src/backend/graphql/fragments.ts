import { gql } from '@apollo/client';
import { Propietario } from '../../src/tipos';

export const PredioFragment = gql`
   fragment PredioFragment on Predio {
    idpredio
    numpre
    nombre
    valor
    depto
    municipio
    propietarios
    image
  
     }
`;

export const ConstruccionFragment = gql`
   fragment ConstruccionFragment on Construccione {
            id
            idpredio
            numpisos
            areatotal
            tipocons
            direccion
            image
  
     }
`;

export const TerrenoFragment = gql`
   fragment TerrenoFragment on Terreno {
            id
            idpredio
            area
            valorcomer  
            tipoterre
            consdentro
            fuenagua
            imagen
  
     }
`;

export const PropietarioFragment = gql`
   fragment PropietarioFragment on Propietario {
            idusuario
            tipoprop
            tipodoc
            numdoc
            nombre
            direccion
            telefono
            email
            password
            imagen
         
  
     }
`;

