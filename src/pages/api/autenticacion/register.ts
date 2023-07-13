import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nombre, numdoc, email, password } = req.body;
 

  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql", // Reemplaza esto con la URL de tu API GraphQL
    cache: new InMemoryCache(),
  });

  try {
    // Verifica si el usuario ya existe
    const { data } = await client.query({
        query: gql`
          query ($numdoc: String!) {
            allUsuarios(condition: { numdoc: $numdoc }) {
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

      //mutation para registrarse
      
                       
      const user = data.allUsuarios.nodes[0];
    
    
    if (user) {
      // Si el usuario ya existe, devuelve un error
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

     const hashedPassword = await bcrypt.hash(password, 10);

     const { data: resultado } = await client.mutate({
      mutation: gql`
        mutation CrearUsuario($nombre: String!, $numdoc: String!, $email: String!, $password: String!) {
          createUsuario(input: { usuario: { nombre: $nombre, numdoc: $numdoc, email: $email, password: $password } }) {
            clientMutationId
          }
        }
      `,
      variables: { 
         nombre,
         numdoc, 
         email, 
         password: hashedPassword,
      },
    });
    
    if (resultado) {
      return res.status(201).json({ message: 'Usuario creado exitosamente' });
    }

  } catch (error) {
    // Manejo de errores
    console.log(error);
    return res.status(500).json({ message: 'Ha habido un error al crear el usuario' });
  }
}
