import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import bcrypt from "bcrypt";
import { GRAPH_URL, MY_TOKEN_NAME } from "../../../constantes";
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  //console.log("hola backend");
  const { numdoc, password } = req.body;

  const client = new ApolloClient({
    uri: GRAPH_URL, 
    cache: new InMemoryCache(),
  });

  try{
  const { data } = await client.query({
    query: gql`
      query ($numdoc: String!) {
        allPropietarios(condition: { numdoc: $numdoc }) {
          nodes {
            idusuario
            nombre
            numdoc
            email
            tipoprop
            tipodoc
            telefono
            direccion
            password

          }
        }
      }
    `,
    variables: { numdoc },
  });
 
 
  const user = data.allPropietarios.nodes[0];
  if (!user) {
    return res.status(401).json({ error: "Usuario no encontrado" });
  }
  // Aquí verificas la contraseña del usuario
  const passwordIsValid = await bcrypt.compare(password, user.password);
 
  if (passwordIsValid) {

    const token = jwt.sign({ 
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        nombre: user.nombre,
        numdoc: user.numdoc,
      }, 'secret');
  
    
    const serializedToken = serialize(MY_TOKEN_NAME, token, {
        httpOnly: true,
        sameSite: 'strict', 
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
  
      res.setHeader('Set-Cookie', serializedToken);
      // return res.json('login sucessfully');
      return res.status(200).json({
        token,
        nombre: user.nombre,
        numdoc: user.numdoc, 
        email: user.email,
        tipoprop: user.tipoprop,
        tipodoc: user.tipodoc,
        telefono: user.telefono,
        direccion: user.direccion,
        message: 'Inicio de sesión Exitoso',
      });
    }
  
    return res.status(401).json({ error: 'Usuario o clave incorrectos' });

  }
    catch (error) {
        return res.status(500).json({ message: 'Error al iniciar sesión' });
        }

}
