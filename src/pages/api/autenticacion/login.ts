import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import bcrypt from "bcrypt";
import { MY_TOKEN_NAME } from "../../../constantes";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  //console.log("hola backend");
  const { numdoc, password } = req.body;

  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql", // Reemplaza esto con la URL de tu API GraphQL
    cache: new InMemoryCache(),
  });

  try{
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
  const user = data.allUsuarios.nodes[0];
  if (!user) {
    return res.status(401).json({ error: "Usuario no encontrado" });
  }
  // Aquí verificas la contraseña del usuario
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (passwordIsValid) {
    const token = jwt.sign({ id: user.id, numdoc: user.numdoc }, "secret", {
      expiresIn: "1h",
    });
    
  
    return res.status(200).json({
      token,
      numdoc,
    });
  }
  
  return res.status(401).json({ message: 'Invalid credentials' });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
