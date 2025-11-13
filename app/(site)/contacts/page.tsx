import { BookingForm } from '@/components/forms/booking-form'
import ContactForm from '@/components/pages-component/ContactForm'
import { ImageTop } from '@/components/sheared/ImageTop'
import Image from 'next/image'


const ContactPage = () => {
  return (
    <div>
      <ImageTop
      title='Contacts'
      subtitle='Find us hear'
      backgroundImage='/images/elegant-restaurant-ambiance.jpg'
      />
      <ContactForm />
    </div>
  )
}

export default ContactPage;