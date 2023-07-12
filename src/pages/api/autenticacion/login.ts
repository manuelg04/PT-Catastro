import { message } from 'antd';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  console.log("hola backend");
  const { numdoc, password } = req.body;
  console.log(req.body);
  console.log("🚀 ~ numdoc:", numdoc)
  console.log("🚀 ~ password:", password)

  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql", // Reemplaza esto con la URL de tu API GraphQL
    cache: new InMemoryCache(),
  });

  // const { data } = await client.query({
  //   query: gql`
  //     query ($email: String!) {
  //       allUsuarios(condition: { numdoc: $numdoc }) {
  //         nodes {
  //           id
  //           numdoc
  //           passwordHash
  //         }
  //       }
  //     }
  //   `,
  //   variables: { email },
  // });


  // const user = data.allUsuarios.nodes[0];
  

  // if (!user) {
  //   return res.status(401).json({ error: "Usuario no encontrado" });
  // }

  // // Aquí verificas la contraseña del usuario
  // const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

  // if (!passwordIsValid) {
  //   return res.status(401).json({ error: "Contraseña incorrecta" });
  // }

  // // Aquí generas y devuelves el token JWT
  // const token = jwt.sign({ id: user.id, email: user.email }, "secret_key"); // Reemplaza "secret_key" con tu clave secreta real

   res.json({ password });
}
