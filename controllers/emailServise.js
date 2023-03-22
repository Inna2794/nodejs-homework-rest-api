const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD } = process.env;

const sendEmail = (email, verificationToken) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    authMethod: 'LOGIN',
  });

  const message = {
    from: EMAIL,
    to: email,
    subject: 'Verification email',
    text: `Please verify your email address. Follow to link: /users/verify/:${verificationToken}`,
   
  };

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendEmail };
