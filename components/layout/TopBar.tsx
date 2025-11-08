import { Facebook, Twitter, Instagram, Youtube, Clock, MapPin } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-stone-950 text-white px-6 py-3 flex items-center justify-between text-sm border-b border-stone-800">
      {/* Left - Opening Hours */}
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-amber-600" />
        <span>OPENING HOURS : 08:00 AM - 09:00 PM</span>
      </div>

      {/* Center - Social Media */}
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-amber-600 transition">
          <Facebook size={18} />
        </a>
        <a href="#" className="hover:text-amber-600 transition">
          <Twitter size={18} />
        </a>
        <a href="#" className="hover:text-amber-600 transition">
          <Instagram size={18} />
        </a>
        <a href="#" className="hover:text-amber-600 transition">
          <Youtube size={18} />
        </a>
      </div>

      {/* Right - Location */}
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-amber-600" />
        <span>LOCATION : 55 MAIN STREET, NEW YORK</span>
      </div>
    </div>
  )
}
