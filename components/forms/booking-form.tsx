"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Mail, Phone, User } from "lucide-react"
import { bookingSchema, TBookingFormData } from "@/lib/validation/booking-form"
import { toast } from "sonner"


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


  const handleSubmit = async (data: TBookingFormData) => {
    setIsSubmitting(true)

   try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        toast.success(result.message)
         setIsSubmitting(false)
        // form.reset();
      } else {
        console.error(result.errors || result.message);
        alert("Error: " + JSON.stringify(result.errors || result.message));
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong!");
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
                          type="date" // 👈 enables calendar popup
                          {...field}
                          onFocus={(e) => e.target.showPicker?.()} // 👈 auto-opens calendar on click
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
                          onFocus={(e) => e.target.showPicker?.()} // 👈 ensures the picker opens immediately on click
                          className="bg-stone-900 border-stone-700 text-white placeholder:text-stone-500 pl-10 h-12 w-full rounded-md cursor-pointer"
                        />
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
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
