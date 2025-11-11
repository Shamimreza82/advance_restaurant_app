
import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});




export const sendEmail = async (to: string, subject: string, html: string) => {
  // Wrap in an async IIFE so we can use await.
const info = await transporter.sendMail({
    from: `"Bistro Lumière" <${process.env.NODE_MAILER_EMAIL}>`, // sender address
    to,
    subject,
    html, 
  });

  console.log("Message sent:", info.messageId);
};