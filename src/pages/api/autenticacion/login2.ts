import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import bcrypt from "bcrypt";
import { MY_TOKEN_NAME } from "../../../constantes";
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';

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
  console.log("🚀 ~ passwordIsValid:", passwordIsValid)

  if (passwordIsValid) {

    const token = jwt.sign({ // en este token se guarda la información que luego retorna al front
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        username: user.id,
        numdoc: user.numdoc,
      }, 'secret');
  
    
    const serializedToken = serialize(MY_TOKEN_NAME, token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // cuando es para backend independientes se recomienda 'none'
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
  
      res.setHeader('Set-Cookie', serializedToken);
      // return res.json('login sucessfully');
      return res.status(200).json({
        token,
        message: 'login sucessfully',
      });
    }
  
    return res.status(401).json({ error: 'Invalid user or password' });

  }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
        }

}
