/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/apiHandler.ts
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { createResponse, TResponseData } from "@/utlis/createResponce"; // fix path/spelling if needed

type HandlerFunction = (req: Request) => Promise<Response>;

const isProd = process.env.NODE_ENV === "production";


function prismaCodeToStatus(code?: string): number {
  switch (code) {
    case "P2002": // Unique constraint failed
      return 409;
    case "P2025": // Record not found for update/delete
      return 404;
    case "P2003": // Foreign key constraint failed
    case "P2004": // A constraint failed on the database
      return 409;
    case "P2001": // Foreign key constraint failed (example)
      return 400;
    default:
      return 500;
  }
}





export function withErrorHandling(handler: HandlerFunction): HandlerFunction {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      // Log server-side with as much context as possible
      console.error("Global API Error:", {
        error,
        url: (req as any)?.url,
        method: (req as any)?.method,
      });

      // Default response payload
      let status = 500;
      let message = "Internal server error";
      let details: unknown = undefined;

      // Zod validation error -> 400 Bad Request
      if (error instanceof ZodError) {
        status = 400;
        message = "Validation error";
        // include structured issues in non-production
        details = isProd ? undefined : error.issues;
      }
      // Prisma known request errors (constraint, etc.)
      else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        status = prismaCodeToStatus(error.code);
        // friendly message per code
        switch (error.code) {
          case "P2002":
            message = "Duplicate entry - unique constraint failed";
            break;
          case "P2025":
            message = "Record not found";
            break;
          default:
            message = "Database error";
        }
        details = isProd ? undefined : { code: error.code, meta: error.meta };
      }
      // Prisma validation error (invalid query shape, etc.)
      else if (error instanceof Prisma.PrismaClientValidationError) {
        status = 400;
        message = "Database validation error";
        details = isProd ? undefined : String(error);
      }
      // Common JS errors with specific codes
      else if (error instanceof SyntaxError) {
        status = 400;
        message = "Syntax error";
        details = isProd ? undefined : String(error);
      } else if (error instanceof TypeError) {
        status = 500;
        message = "Type error";
        details = isProd ? undefined : String(error);
      } else if (error instanceof ReferenceError) {
        status = 500;
        message = "Reference error";
        details = isProd ? undefined : String(error);
      }
      // If error is an object with status/message (custom errors)
      else if (typeof error === "object" && error !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyErr = error as any;
        if (typeof anyErr.status === "number" && typeof anyErr.message === "string") {
          status = anyErr.status;
          message = anyErr.message;
          // include any extra details only in non-prod
          details = isProd ? undefined : anyErr.details ?? anyErr;
        } else {
          // fallback: try to get message
          message = (anyErr && anyErr.message) ? String(anyErr.message) : message;
          details = isProd ? undefined : anyErr;
        }
      } else {
        // Primitive errors (string, number)
        message = typeof error === "string" ? error : message;
      }

      // Build safe response body
            const body: TResponseData = {
              success: false,
              message,
            };
            if (!isProd && details !== undefined) (body as any).details = details;
      
            // If you expect createResponse to accept body + status and return a Response:
            try {
              return createResponse(body, status);
            } catch (e) {
              // Fallback to NextResponse.json in case createResponse has a different contract
              console.warn("createResponse failed, falling back to NextResponse.json:", e);
              return NextResponse.json(body, { status });
            }
    }
  };
}
