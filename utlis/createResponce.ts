/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";


export type TResponseData = {
  success: boolean;
  message: string;
  error?: any;
  data?: any;
}

export function createResponse(data: TResponseData, status: number) {
  return NextResponse.json(data, { status });
}