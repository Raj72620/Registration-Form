const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
  try {
    // Validate email credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials not configured');
    }

    // Create reusable transporter object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // For local testing only (remove in production)
      }
    });

    // Setup email data
    const mailOptions = {
      from: `College Registration <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''), // Fallback to plain text
      html: html || `<p>${text}</p>`, // Fallback to simple HTML
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`, info.messageId);
    return info;

  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { sendEmail };