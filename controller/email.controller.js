import nodemailer from "nodemailer";
import "dotenv/config";
const sendMail = async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVICE_AUTH_EMAIL,
      pass: process.env.EMAIL_SERVICE_AUTH_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.EMAIL_SERVICE_SEND_FROM, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  });

  return info;

  // async..await is not allowed in global scope, must use a wrapper
};
export { sendMail };
