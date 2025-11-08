import z from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,}$/, "Invalid phone number"),
  guests: z.string().min(1, "Please select number of guests"),
  date: z.string().min(1, "Date is required"), // ✅ stringte
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time format must be HH:mm"),
})


export type TBookingFormData = z.infer<typeof bookingSchema>