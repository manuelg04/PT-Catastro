import nodemailer from 'nodemailer';

const sendFeedbackEmail = async (name: string, email: string, observations: string, rating: number) => {
 
  let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
      user: 'catastrotester@transportesmtm.com', // Tu correo de hostinger
      pass: 'Leweku123@', // Tu contraseña de hostinger
    },
  });

  let mailOptions = {
    from: {
      name: 'Formulario de Feedback',
      address: 'catastrotester@transportesmtm.com',
    },
    to: 'manuelg9704@gmail.com',
    cc: email,
    subject: 'Nuevo feedback de Prueba Tecnica',
    text: `Has recibido un nuevo feedback de ${name}. Su calificación es de ${rating} ${rating === 1 ? 'Estrella' : 'Estrellas'}. Observaciones: ${observations}`,
  };

  return transporter.sendMail(mailOptions);
}

export default sendFeedbackEmail;
