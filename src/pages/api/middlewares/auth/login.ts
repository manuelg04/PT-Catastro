import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { usuario, pass } = req.body;

  try {
    // Consulta el usuario con el correo electrónico proporcionado
    const [results] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    if (Array.isArray(results) && results.length > 0) {
      const user = results[0];

      if (typeof user === 'object' && 'pass' in user) {
        const passwordMatch = await bcrypt.compare(pass, user.pass);

        if (passwordMatch) {
          // Codifica la información del usuario en el token JWT
          const token = jwt.sign({ usuario }, 'secret', { expiresIn: '1h' });
          const { id, role } = user;

          return res.status(200).json({
            token, id, usuario, role,
          });
        }
      }
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    // Handle error
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
