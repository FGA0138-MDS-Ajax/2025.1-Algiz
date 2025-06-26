// backend/src/utils/email.util.js
import { Resend } from 'resend';

let emailServiceEnabled = false;
let resend;

// Verifica se a chave de API está disponível
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  emailServiceEnabled = true;
}

export const sendCodeEmail = async (email, code) => {
  if (!emailServiceEnabled) {
    console.warn('Tentativa de enviar email, mas serviço está desativado');
    // Em produção, você pode querer lançar um erro aqui
    return;
  }
  
  try {
    await resend.emails.send({
      from: 'econet@algiz-econet.site',
      to: email,
      subject: 'Seu código de redefinição de senha',
      html: `<p>Seu código de verificação é: <strong>${code}</strong></p>`
    });
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    throw err;
  }
};

export const isEmailServiceEnabled = () => emailServiceEnabled;
