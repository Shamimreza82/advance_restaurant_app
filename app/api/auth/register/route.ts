
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, phone } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // const existing = await prisma.user.findFirst({ where: { email } });
    // if (existing) {
    //   return NextResponse.json({ error: "User already exists" }, { status: 409 });
    // }

    console.log(email, password, name)

    const user = await prisma.user.create({
      data: { email, password, name, phone  },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
