// backend/src/utils/email.util.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendCodeEmail = async (email, code) => {
  await resend.emails.send({
    from: 'econet@algiz-econet.site', // seu domínio verificado
    to: email,
    subject: 'Seu código de redefinição de senha',
    html: `<p>Seu código de verificação é: <strong>${code}</strong></p>`
  });
};
