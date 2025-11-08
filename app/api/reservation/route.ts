import { ReservationServices } from "@/services/reservationService";
import { bookingSchema } from "@/lib/validation/booking-form";
import { createResponse } from "@/utlis/createResponce";
import { withErrorHandling } from "@/lib/error-handler/withErrorHandling";




// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const data = bookingSchema.parse(body);
//     const reservation = await createReservation(data);


//     return createResponse({
//       success: true,
//       message: "Reservation created successfully",
//       data: reservation
//     }, 201);



//   } catch (error) {
//     console.error("Reservation Error:", error);
//     return createResponse({
//       success: false,
//       message: "Reservation creation failed",
//       error: error instanceof Error ? error.message : String(error)
//     }, 500);
//   }
// }



export const POST = withErrorHandling( async (req: Request) => {
   const body = await req.json();
  const data = bookingSchema.parse(body);
  const result = await ReservationServices.createReservation(data);

      return createResponse({
      success: true,
      message: "Reservation created successfully",
      data: result
    }, 201);
});




export const GET = withErrorHandling(async (req) => {
const { searchParams } = new URL(req.url);
const date = searchParams.get("date");
  
console.log(date)
if(!date){
  throw new Error("Date not send")
}


  const result = await ReservationServices.getAllReservation(date)

  return createResponse({
      success: true,
      message: "Retrive all reservations successfully",
      data: result
    }, 201);
});



  











