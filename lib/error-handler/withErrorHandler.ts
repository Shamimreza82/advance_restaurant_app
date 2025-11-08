/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

// Wrapper for global error handling
export const withErrorHandler = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      console.error("API Error:", error);

      // Zod validation errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues, // detailed field errors
        });
      }

      // Prisma known errors (like unique constraint, foreign key, etc.)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
          success: false,
          message: error.message,
          code: error.code, // Prisma error code
        });
      }

      // Default: Internal server error
      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";

      res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  };
};
