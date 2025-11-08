import { BookingForm } from '@/components/forms/booking-form'
import { ImageTop } from '@/components/sheared/ImageTop'
import React from 'react'

const BookATablePage = () => {
  return (
    <div>
        <ImageTop
        title='Book a table'
        />
        <BookingForm/>
    </div>
  )
}

export default BookATablePage