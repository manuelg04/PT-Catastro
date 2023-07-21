import { serialize } from 'cookie';
import { MY_TOKEN_NAME } from '../../../constantes';
import { NextApiRequest, NextApiResponse } from 'next';

export default function logout(req:NextApiRequest, res:NextApiResponse) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Token No valido' });
  }

 try {
    const serialized = serialize(MY_TOKEN_NAME, null, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
      });

      res.setHeader('Set-Cookie', serialized);
      res.status(200).json({ message: 'Cierre de sesión exitoso' });
    
 } catch (error) {
    return res.status(401).json({ error: 'Fallo al cerrar sesión' });    
 }
}
