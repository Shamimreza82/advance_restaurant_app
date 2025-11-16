import { MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const galleryImages = [
  { id: 1, src: "/gallary/gallary-1.avif" },
  { id: 2, src: "/gallary/gallary-2.avif" },
  { id: 3, src: "/gallary/gallary-3.avif" },
  { id: 4, src: "/gallary/gallary-4.avif" },
  { id: 5, src: "/gallary/gallary-5.avif" },
  { id: 6, src: "/gallary/gallary-6.avif" },
]


export function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <h3 className="text-white text-2xl font-bold">Kaffen</h3>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-bold mb-6">Working Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex flex-col">
                <span className="text-stone-300">Sunday - Thursday</span>
                <span className="text-amber-600 font-semibold">08:00 am - 09:00pm</span>
              </li>
              <li className="flex flex-col">
                <span className="text-stone-300">Only Friday</span>
                <span className="text-amber-600 font-semibold">03:00 pm - 09:00pm</span>
              </li>
              <li className="flex flex-col mt-2">
                <span className="text-amber-600 italic font-semibold">Saturday Close</span>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-600 font-semibold">Location :</p>
                  <p className="text-stone-300">55 Main Street, New York</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-600 font-semibold">Email Address :</p>
                  <p className="text-stone-300 hover:text-amber-600 transition-colors">bristroLumière@gmail.com</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-600 font-semibold">Phone Number :</p>
                  <p className="text-stone-300">+012 (345) 678 99</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Gallery */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-bold mb-6">Gallery</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-md overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                  width={150}
                  height={150}
                    src={image.src || "/placeholder.svg"}
                    alt={`Gallery image ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-12 border-t border-stone-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-stone-400">
          <p>&copy; 2025 Kaffen. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-amber-600 transition-colors">
              Privacy Policy
            </a>
            <Link href="/terms-and-policy" className="hover:text-amber-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
