import { BookingForm } from '@/components/forms/booking-form'
import { ImageTop } from '@/components/sheared/ImageTop'
import Image from 'next/image'


const ContectPage = () => {
  return (
    <div>
      <ImageTop
      title='Contacts'
      subtitle='Find us hear'
      backgroundImage='/images/elegant-restaurant-ambiance.jpg'
      />
      <BookingForm/>
    </div>
  )
}

export default ContectPage