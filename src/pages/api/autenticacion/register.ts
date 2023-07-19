import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GRAPH_URL } from '../../../constantes';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nombre, numdoc, email, password, tipodoc, tipoprop, telefono, direccion } = req.body;
 

  const client = new ApolloClient({
    uri: GRAPH_URL, 
    cache: new InMemoryCache(),
  });

  try {
    // Verifica si el usuario ya existe
    //mutation para registrarse
    const { data } = await client.query({
        query: gql`
          query ($numdoc: String!) {
            allPropietarios(condition: { numdoc: $numdoc }) {
              nodes {
                  idusuario
                  nombre
                  numdoc
                  email
                  password
              }
            }
          }
        `,
        variables: { numdoc },
      });
             
      const user = data.allPropietarios.nodes[0];

    if (user) {
      // Si el usuario ya existe, devuelve un error, para evitar duplicados
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

     const { data: resultado } = await client.mutate({
      mutation: gql`
        mutation CrearPropietario($tipoprop:String, $tipodoc:String!, $direccion:String, $telefono:String, $nombre: String!, $numdoc: String!, $email: String!, $password: String!) {
          createPropietario(input: { propietario: { tipoprop: $tipoprop, tipodoc: $tipodoc, direccion: $direccion, telefono: $telefono,  nombre: $nombre, numdoc: $numdoc, email: $email, password: $password } }) {
            clientMutationId
          }
        }
      `,
      variables: { 
         nombre,
         numdoc, 
         email, 
         tipoprop,
         tipodoc,
         telefono,
         direccion,
         password: hashedPassword,
      },
    });
    
    if (resultado) {
      return res.status(201).json({ message: 'Usuario creado exitosamente' });
    }

  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ message: 'Ha habido un error al crear el usuario' });
  }
}
