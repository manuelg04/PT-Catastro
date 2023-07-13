import { message } from 'antd';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import bcrypt from "bcrypt";
import { MY_TOKEN_NAME} from "../../../constantes";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  //console.log("hola backend");
  const { numdoc, password } = req.body;
  

  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql", // Reemplaza esto con la URL de tu API GraphQL
    cache: new InMemoryCache(),
  });

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

  if (!passwordIsValid) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  // Aquí generas y devuelves el token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, MY_TOKEN_NAME); // Reemplaza "secret_key" con tu clave secreta real
  //console.log("🚀 ~ token:", token)

   res.json({ MY_TOKEN_NAME: token });
}
