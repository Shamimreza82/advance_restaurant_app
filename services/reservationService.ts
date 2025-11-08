
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