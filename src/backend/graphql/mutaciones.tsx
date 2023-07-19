import { gql } from '@apollo/client';
import { PredioFragment, ConstruccionFragment, TerrenoFragment, PropietarioFragment, UsuarioFragment } from './fragments';

export const QUERY_ALL_PREDIOS = gql`
   query Predios {
      allPredios {
         edges {
           node {
               ...PredioFragment
          }
        }
      }
    } 
${PredioFragment}
   `;

export const CREATE_PREDIO_MUTATION = gql`  
     mutation createPredio (
            $numpre: String!,
            $nombre: String!,
            $valor: String,
            $depto: String, 
            $municipio: String,
            $propietarios: String,
            $image: String
  ) {
      createPredio (
        input: {
          predio: {
            numpre: $numpre,
            nombre: $nombre,
            valor:  $valor,
            depto: $depto, 
            municipio: $municipio,
            propietarios: $propietarios
            image: $image
          }
        }
      ) {
        predio{
          ...PredioFragment
        }
      }
    }
    ${PredioFragment}
  `;

export const UPDATE_PREDIO_MUTATION = gql`
  mutation updatePredioByIdpredio (
      $idpredio: Int!
      $numpre: String!,
      $nombre: String!,
      $valor: String,
      $depto: String,
      $municipio: String,
      $propietarios: String
  ) {
    updatePredioByIdpredio (
      input: {
        predioPatch: {
            numpre: $numpre,
            nombre: $nombre,
            valor: $valor,
            depto: $depto,
            municipio: $municipio,
            propietarios: $propietarios
        },
        idpredio: $idpredio
      }
    ) {
      predio {
       ...PredioFragment
      }
    }
  }
  ${PredioFragment}
`;

export const DELETE_PREDIO_MUTATION = gql`
    mutation deletePredioByIdpredio (
      $idpredio: Int!
    ) {
      deletePredioByIdpredio (
        input: {
          idpredio: $idpredio
        }
      ) {
        predio {
          ...PredioFragment
        }
      }
    }
    ${PredioFragment}
`;

export const QUERY_ALL_CONSTRUCCIONES = gql`
  query Construcciones {
      allConstrucciones {
        edges {
          node {
            ...ConstruccionFragment
          }
        }
      }
    }
    ${ConstruccionFragment}
      `;

export const CREATE_CONSTRUCION_MUTATION = gql`  
    mutation createConstruccione (
                $idpredio: Int!,
                $numpisos: String!,
                $areatotal: String,
                $tipocons: String,
                $direccion: String,
                $imagen: String,
    ) {
      createConstruccione (
      input: {
        construccione: {
                idpredio: $idpredio,
                numpisos: $numpisos,
                areatotal: $areatotal,
                tipocons: $tipocons,
                direccion: $direccion,
                imagen: $imagen
        }
      }
    ) {
      construccione {
        ...ConstruccionFragment
      }
    }
  }
  ${ConstruccionFragment}
`;

export const UPDATE_CONSTRUCCION_MUTATION = gql`
  mutation updateConstruccioneById (
                $id: Int!
                $idpredio: Int!,
                $numpisos: String,
                $areatotal: String,
                $tipocons: String,
                $direccion: String,
  ) {
    updateConstruccioneById (
      input: {
        construccionePatch: {
                idpredio: $idpredio,
                numpisos: $numpisos,
                areatotal: $areatotal,
                tipocons: $tipocons,
                direccion: $direccion
        },
        id: $id
      }
    ) {
      construccione {
        ...ConstruccionFragment
      }
    }
  }
  ${ConstruccionFragment}
`;

export const DELETE_CONSTRUCCION_MUTATION = gql`
    mutation deleteConstruccioneById (
      $id: Int!
    ) {
      deleteConstruccioneById (
        input: {
          id: $id
        }
      ) {
        construccione {
          ...ConstruccionFragment
        }
      }
    }
    ${ConstruccionFragment}
`;

export const QUERY_ALL_TERRENOS = gql`
  query Terrenos {
      allTerrenos {
        edges {
          node {
          ...TerrenoFragment
  
          }
        }
      }
    }
    ${TerrenoFragment}
  `;

export const CREATE_TERRENO_MUTATION = gql`  
    mutation createTerreno (
            $idpredio: Int!,
            $area: String,
            $valorcomer: String,
            $tipoterre: String,
            $consdentro: String,
            $fuenagua: String,
            $imagen: String,         
    ) {
      createTerreno (
      input: {
        terreno: {
                idpredio: $idpredio,
                area: $area,
                valorcomer: $valorcomer,
                tipoterre: $tipoterre,
                consdentro: $consdentro,
                fuenagua: $fuenagua,
                imagen: $imagen,
        }
      }
    ) {
      terreno {
        ...TerrenoFragment
      }
    }
  }
  ${TerrenoFragment}
`;

export const UPDATE_TERRENO_MUTATION = gql`
  mutation updateTerrenoById (
      $id: Int!
      $area: String,
      $valorcomer: String!,
      $tipoterre: String,
      $consdentro: String,
      $fuenagua: String,
      
  ) {
    updateTerrenoById (
      input: {
        terrenoPatch: {
            area: $area,
            valorcomer: $valorcomer,
            tipoterre: $tipoterre,
            consdentro: $consdentro,
            fuenagua: $fuenagua
          
        },
        id: $id
      }
    ) {
      terreno {
        ...TerrenoFragment
      }
    }
  }
  ${TerrenoFragment}
`;

export const DELETE_TERRENO_MUTATION = gql`
    mutation deleteTerrenoById (
      $id: Int!
    ) {
      deleteTerrenoById (
        input: {
          id: $id
        }
      ) {
        terreno{
          ...TerrenoFragment
        }
      }
    }
    ${TerrenoFragment}
`;
export const QUERY_ALL_PROPIETARIOS = gql`
query Propietarios {
    allPropietarios {
      edges {
        node {  
           ...PropietarioFragment     
           }
      }
    }
  }
  ${PropietarioFragment}
`;

export const CREATE_PROPIETARIO_MUTATION = gql`  
  mutation createPropietario (
              $idusuario: Int!,
              $tipoprop: String,
              $tipodoc: String,
              $numdoc: String!,
              $nombre: String!,
              $direccion: String,
              $telefono: String,
              $email: String!,
              $password:String!
              $imagen: String,
  ) {
  createPropietario (
    input: {
      propietario: {
              idusuario: $idusuario,
              tipoprop: $tipoprop,
              tipodoc: $tipodoc, 
              numdoc: $numdoc,
              nombre: $nombre,
              direccion: $direccion,
              telefono: $telefono,
              email: $email,
              password:$password
              imagen: $imagen,
      }
    }
  ) {
    propietario{
      ...PropietarioFragment
    }
  }
  }
  ${PropietarioFragment}
`;
export const UPDATE_PROPIETARIO_MUTATION = gql`
  mutation updatePropietarioByIdusuario (
              $idusuario: Int!
              $tipoprop: String,
              $tipodoc: String,
              $numdoc: String!,
              $nombre: String,
              $direccion: String,
              $telefono: String,
              $email: String
  ) {
    updatePropietarioByIdusuario (
      input: {
        propietarioPatch: {
              tipoprop: $tipoprop,
              tipodoc: $tipodoc, 
              numdoc: $numdoc,
              nombre: $nombre,
              direccion: $direccion,
              telefono: $telefono,
              email: $email
        },
        idusuario: $idusuario
      }
    ) {
      propietario {
        ...PropietarioFragment
      }
    }
  }
  ${PropietarioFragment}
`;

export const DELETE_PROPIETARIO_MUTATION = gql`
    mutation deletePropietarioByIdusuario (
      $idusuario: Int!
    ) {
      deletePropietarioByIdusuario (
        input: {
          idusuario: $idusuario
        }
      ) {
        propietario {
          ...PropietarioFragment
        }
      }
    }
    ${PropietarioFragment}
`;






export const REFRESH_QUERY_PREDIOS = {
  refetchQueries: [{
    query: QUERY_ALL_PREDIOS,
  }],
};

export const REFRESH_QUERY_PROPIETARIOS = {
  refetchQueries: [{
    query: QUERY_ALL_PROPIETARIOS,
  }],
};

export const REFRESH_QUERY_TERRENOS = {
  refetchQueries: [{
    query: QUERY_ALL_TERRENOS,
  }],
};

export const REFRESH_QUERY_CONSTRUCCIONES = {
  refetchQueries: [{
    query: QUERY_ALL_CONSTRUCCIONES,
  }],
};

