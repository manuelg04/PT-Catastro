import { gql } from '@apollo/client';
import { Propietario } from '../../tipos';

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
            image
  
     }
`;

export const PropietarioFragment = gql`
   fragment PropietarioFragment on Propietario {
            id
            tipoprop
            tipodoc
            numdoc
            nombre
            direccion
            telefono
            email
            image
  
     }
`;

export const UsuarioFragment = gql`
   fragment UsuarioFragment on Usuario {
            nombre
            email
            numdoc
            password 
  
     }
`;
