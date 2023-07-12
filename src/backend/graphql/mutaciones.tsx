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
                $numpisos: String,
                $areatotal: String,
                $tipocons: String,
                $direccion: String,
                $image: String,
    ) {
      createConstruccione (
      input: {
        construccione: {
                idpredio: $idpredio,
                numpisos: $numpisos,
                areatotal: $areatotal,
                tipocons: $tipocons,
                direccion: $direccion,
                image: $image
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
            $image: String,         
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
                image: $image,
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
        
              $tipoprop: String,
              $tipodoc: String,
              $numdoc: String!,
              $nombre: String,
              $direccion: String,
              $telefono: String,
              $email: String,
              $image:String
  ) {
  createPropietario (
    input: {
      propietario: {
              tipoprop: $tipoprop,
              tipodoc: $tipodoc, 
              numdoc: $numdoc,
              nombre: $nombre,
              direccion: $direccion,
              telefono: $telefono,
              email: $email,
              image:$image
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
  mutation updatePropietarioById (
              $id: Int!
              $tipoprop: String,
              $tipodoc: String,
              $numdoc: String!,
              $nombre: String,
              $direccion: String,
              $telefono: String,
              $email: String
  ) {
    updatePropietarioById (
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
        id: $id
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
    mutation deletePropietarioById (
      $id: Int!
    ) {
      deletePropietarioById (
        input: {
          id: $id
        }
      ) {
        propietario {
          ...PropietarioFragment
        }
      }
    }
    ${PropietarioFragment}
`;
export const QUERY_ALL_USUARIOS = gql`
  query Usuarios {
      allUsuarios {
        edges {
          node {
              email
              nombre
              password
              numdoc
          }
        }
      }
    }
  `;

export const QUERY_USUARIO = gql`
  query Usuario($idusuario: Int!) {
    usuarioByIdusuario(idusuario: $idusuario) {
      idusuario
      email
      password
      nombre
      numdoc
    }
  }
`;


export const CREATE_USUARIO_MUTATION = gql`  
     mutation createUsuario (
            $nombre: String!,
            $email: String!,
            $numdoc: String,
            $password: String!, 
            
          
  ) {
      createUsuario (
        input: {
          usuario: {
            nombre:$nombre,
            email:$email,
            numdoc: $numdoc,
            password:$password, 
            
           
          }
        }
      ) {
        usuario{
          ...UsuarioFragment
        }
      }
    }
    ${UsuarioFragment}
  `;

export const UPDATE_USUARIO_MUTATION = gql`
mutation updateUsuarioById (
            $id:Int!,
            $nombre: String!,
            $email: String!,
            $numdoc: String,
) {
  updateUsuarioById (
    input: {
      usuarioPatch: {
            nombre:$nombre,
            email:$email,
            numdoc: $numdoc,
    
      },
      id:$id
    }
  ) {
    usuario {
      ...UsuarioFragment
    }
  }
}
${UsuarioFragment}
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
export const REFRESH_QUERY_USUARIOS = {
  refetchQueries: [{
    query: QUERY_ALL_USUARIOS,
  }],
};
