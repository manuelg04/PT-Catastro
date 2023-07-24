import { NextApiRequest, NextApiResponse } from 'next';
import sendFeedbackEmail from '../api/sendFeedbackEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, observations, rating, email } = req.body;
  
    try {
      await sendFeedbackEmail(name, email, observations, rating);
      res.status(200).json({ status: 'Feedback enviado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error al enviar el feedback' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ status: 'Método no permitido' });  // Método no permitido si no es POST
  }
}
