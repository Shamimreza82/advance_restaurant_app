import z from "zod";

export const reservationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  guests: z
    .string()
    .min(1, "Guests required")
    .transform((val) => parseInt(val, 10)),
  date: z
    .string()
    .min(1, "Date is required")
    .transform((val) => new Date(val)),
  time: z.string().min(1, "Time is required"),
});
