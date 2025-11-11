
import { sendEmail } from '@/lib/config/nodemailer';
import { prisma } from '@/lib/prisma';
import { TBookingFormData } from '@/lib/validation/booking-form';


 async function createReservation(data: TBookingFormData) {
  // The 'await prisma.reservation.create' logic moves here

  const isExist = await prisma.reservation.findFirst({
    where: {
      date: new Date(data.date),
      time: data.time
    }
  })
  if(isExist){
    throw new Error("Reservation already exist for this date and time")
  }

  const result = await prisma.reservation.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      guests: Number(data.guests),
      date: new Date(data.date), // Date object
      time: data.time,
      // Add any other required fields like 'createdAt', 'updatedAt', etc., if not handled by Prisma defaults
    },
  });

  const subject = "✨ Reservation Confirmed – Thank You for Choosing Us!";
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reservation Confirmation</title>
    <style>
      body {
        font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
        background-color: #f5f6fa;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
      }
      .header {
        background: linear-gradient(135deg, #ff914d, #ff2e63);
        padding: 30px 20px;
        text-align: center;
        color: #fff;
      }
      .header h1 {
        margin: 0;
        font-size: 26px;
        letter-spacing: 1px;
      }
      .content {
        padding: 30px 25px;
        line-height: 1.6;
      }
      .content h2 {
        color: #222;
        font-size: 20px;
      }
      .details {
        margin: 20px 0;
        background-color: #fafafa;
        padding: 15px 20px;
        border-left: 4px solid #ff914d;
        border-radius: 8px;
      }
      .details p {
        margin: 6px 0;
      }
      .cta {
        display: block;
        width: fit-content;
        background-color: #ff914d;
        color: #fff !important;
        padding: 12px 22px;
        margin: 25px auto 0;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: 0.3s;
      }
      .cta:hover {
        background-color: #ff6a00;
      }
      .footer {
        background-color: #f0f0f0;
        text-align: center;
        padding: 18px;
        font-size: 13px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Reservation Is Confirmed 🎉</h1>
      </div>
      <div class="content">
        <h2>Dear ${result.fullName},</h2>
        <p>
          We’re delighted to confirm your reservation! Here are your details:
        </p>

        <div class="details">
          <p><strong>Guests:</strong> ${result.guests}</p>
          <p><strong>Date:</strong> ${new Date(result.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          <p><strong>Time:</strong> ${result.time}</p>
          <p><strong>Contact:</strong> ${result.phone}</p>
        </div>

        <p>
          We can’t wait to welcome you and ensure you have a memorable dining experience.
          If you have any special requests, feel free to reply to this email.
        </p>

        <a href="https://yourrestaurant.com/reservations" class="cta">View or Manage Reservation</a>

        <p style="margin-top: 25px;">
          Warm regards,<br/>
          <strong>The Bistro Lumière Team</strong><br/>
          📍 123 Gourmet Avenue, City<br/>
          ☎️ +880 1234 567890
        </p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} Bistro Lumière . All rights reserved.<br/>
        <a href="https://yourrestaurant.com" style="color: #ff6a00; text-decoration: none;">Visit our website</a>
      </div>
    </div>
  </body>
  </html>
  `
  const to = result.email


  // await emailQueue.add("sendEmail", { to , subject, html });
  await sendEmail(to, subject, html);



  return result;
}




 async function getAllReservation(payload: string) {
  
 const result = await prisma.reservation.findMany({
  where: {date: new Date(payload)}
 })
  return result;
}






export const ReservationServices = {
  createReservation,
  getAllReservation
}