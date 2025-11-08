
import { prisma } from "@/lib/prisma";
import { reservationSchema } from "./validation";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validate with Zod
    const data = reservationSchema.parse(body);

    // ✅ Create reservation in Prisma
    const reservation = await prisma.reservation.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        guests: data.guests,
        date: data.date, // Date object ✅
        time: data.time,
      },
    });

    return NextResponse.json({ success: true, reservation }, { status: 201 });
  } catch (error) {
    console.error("Reservation Error:", error);
    return NextResponse.json(
      { success: false, 
        message: "Internal server error" 
      },
      { status: 500 }
    );
  }
}