const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Your App Name" <${process.env.EMAIL_FROM}>`,
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    // html: "<b>Hello world?</b>", // html body (if you want to send HTML emails)
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;