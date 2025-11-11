"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Mail, Phone, User } from "lucide-react"

import { toast } from "sonner"
import { bookingSchema, TBookingFormData } from "@/lib/validation/booking-form"
import { json } from "node:stream/consumers"
import { da } from "zod/v4/locales"
import { useSession } from "next-auth/react"


interface BookingFormProps {
  onSubmit?: (data: TBookingFormData) => void
  title?: string
  subtitle?: string
}

export function BookingForm({
  onSubmit,
  title = "Make Your Reservation",
  subtitle = "BOOKING TABLE",
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<string | null>('')
  const [time, setTime] = useState('')
  const [dbTime, setDbTime] = useState<string[] | null>([])

  const { data: session } = useSession()

  const form = useForm<TBookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      guests: "",
      time: "",
    },
  })


 useEffect(() => {
    if (session?.user) {
      form.reset({
        fullName: session.user.name || "",
        email: session.user.email || "",
        phone: "", // You can set default phone if available
        guests: "",
        time: "",
      });
    }
  }, [session, form]);



  console.log(dbTime)

  useEffect(() => {
    if (!time) return;
    if (time) {
      if (dbTime?.includes(time)) {
        toast.error("This time slot is already booked. Please choose another time.")
        form.setValue("time", "")
        return;
      }
    }
  }, [time, date, dbTime, form])



  useEffect(() => {
    const apiCall = async () => {
      if (!date) return;

      const res = await fetch(`/api/reservation?date=${encodeURIComponent(date)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      const bookedTimes = data.data.map((reservation: { time: string }) => reservation.time);
      setDbTime(bookedTimes);
      console.log("Reservations on selected date:", data);
    };

    apiCall();
  }, [date]);

  const handelDateChange = (date: string) => {
    setDate(date)
  }

  const handleTimeChange = (time: string) => {
    setTime(time)
  }




  const handleSubmit = async (data: TBookingFormData) => {
    setIsSubmitting(true)
  
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Reservation successful! Confirmation email sent.")

        setIsSubmitting(false)
        // form.reset();
      } else {
        console.error(result.errors || result.message);
        toast.error(`${result.message}. Please Contect support: +8801531297879`)
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setIsSubmitting(false)
    }
  }

  const guestOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} Person${i + 1 !== 1 ? "s" : ""}`,
  }))




  return (
    <section className="w-full bg-stone-950 py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent mb-12"></div>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm font-semibold tracking-wider mb-2">{subtitle}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-balance">{title}</h2>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Grid layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Full Name"
                          className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 pl-10 h-12"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email Address"
                          className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 pl-10 h-12"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Phone Number"
                          className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 pl-10 h-12"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Guests */}
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-stone-900 border-stone-700 text-white h-12 px-3">
                          <SelectValue placeholder="1 Person" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-stone-900 border-stone-700">
                        {guestOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          type="date"
                          {...field}
                          onFocus={(e) => e.target.showPicker?.()} // auto open
                          onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            const day = selectedDate.getUTCDay(); // 0=Sun, 5=Fri, 6=Sat

                            // Disable Friday (5) and Saturday (6)
                            if (day === 5 || day === 6) {
                              alert("Friday and Saturday are not selectable 🚫");
                              e.target.value = "";
                              field.onChange(""); // reset in form
                              return;
                            }

                            field.onChange(e); // ✅ keep RHF synced
                            handelDateChange(e.target.value); // your custom logic
                          }}
                          className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 pl-10 h-12 w-full rounded-md cursor-pointer"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />


              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <input
                          type="time" // 👈 this enables the popup time picker
                          {...field}
                          min="10:00" // 10 AM
                          max="21:00" // 9 PM
                          onFocus={(e) => e.target.showPicker?.()} // 👈 ensures the picker opens immediately on click
                          onChange={(e) => {
                            field.onChange(e); // ✅ keep React Hook Form in sync
                            handleTimeChange(e.target.value); // ✅ your custom logic
                          }}
                          className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 pl-10 h-12 w-full rounded-md cursor-pointer"
                        />
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <div className="text-red-600">Note: Time select only between 10 AM to 9 PM</div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 h-12 text-base"
              >
                {isSubmitting ? "Booking..." : "BOOKING TABLE"}
                <span className="ml-2">›</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
