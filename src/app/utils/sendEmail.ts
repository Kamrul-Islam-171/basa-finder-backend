// emailService.ts
import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user_email, // Your email address
    pass: config.email_pass, // App password or email password
  },
});

export const sendEmail = async (
  fromEmail:string,
  email: string,
  subject: string | undefined,
  html: string
) => {
  try {
    await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
      from: fromEmail,
      to: email,
      subject,
      html,
    });
    // console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error('Failed to send email');
  }
};
