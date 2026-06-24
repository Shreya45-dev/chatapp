const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.PROJECT_EMAIL,
            pass: process.env.password
        }
    });

    await transporter.sendMail({
        from: process.env.PROJECT_EMAIL,
        to: email,
        subject: subject,
        text: message
    });
};

module.exports = { sendEmail };