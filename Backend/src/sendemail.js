/*const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
     //  host: 'smtp.gmail.com',
      //  port: 587,
      //  secure: false,
      service: "gmail",
        auth: {
            user: process.env.PROJECT_EMAIL,
            pass: process.env.PASSWORD
        }
    });
   // console.log(process.env.password)

    await transporter.sendMail({
        from: process.env.PROJECT_EMAIL,
        to: email,
        subject: subject,
        text: message
    });
};

module.exports = { sendEmail };*/



const nodemailer = require("nodemailer");
const dns = require("dns");

// IPv4 ko prefer karega
dns.setDefaultResultOrder("ipv4first");

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.PROJECT_EMAIL,
        pass: process.env.PASSWORD, // Gmail App Password
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    await transporter.verify();
    console.log("✅ SMTP Connected");

    const info = await transporter.sendMail({
      from: process.env.PROJECT_EMAIL,
      to: email,
      subject,
      text: message,
    });

    console.log("✅ Email Sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
};

module.exports = { sendEmail };