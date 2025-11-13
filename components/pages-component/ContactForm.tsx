"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, LucideIcon } from 'lucide-react';

// --- Type Definitions ---
interface IFormData {
  name: string;
  email: string;
  message: string;
}

interface IContactInfoCardProps {
  icon: LucideIcon; // Type for Lucide icons
  title: string;
  content: string;
}

// NOTE: This assumes you have the shadcn/ui components (Input, Button, etc.) installed 
// and configured in your Next.js project.

const ContactForm: React.FC = () => {
  const primaryColor = 'text-amber-500'; 
  const accentBg = 'bg-amber-500 hover:bg-amber-600 text-black'; 
  const bgColor = 'bg-black text-white';

  const [formData, setFormData] = useState<IFormData>({ name: '', email: '', message: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here (e.g., API call)
    // IMPORTANT: Replacing alert() with console.log for silent execution in Canvas
    console.log("Message sent! (Simulated)"); 
    setFormData({ name: '', email: '', message: '' });
  };

  const ContactInfoCard: React.FC<IContactInfoCardProps> = ({ icon: Icon, title, content }) => (
    <div className="flex items-start space-x-4">
      <div className={`p-3 rounded-full bg-neutral-800 ${primaryColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="text-gray-400">{content}</p>
      </div>
    </div>
  );

  return (
    <div className={`py-20 md:py-32 ${bgColor} font-inter`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className={`text-sm tracking-widest uppercase ${primaryColor}`}>Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2">
            Contact Bistro Lumière
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            We are here to answer any questions you may have about our menu, reservations, or events.
          </p>
        </div>

        {/* Main Content: Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-2 bg-neutral-900 p-8 rounded-xl shadow-2xl border border-neutral-800">
            <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name} 
                    onChange={handleChange}
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-gray-500 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={formData.email} 
                    onChange={handleChange}
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-gray-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Your message or inquiry..." 
                  rows={5}
                  value={formData.message} 
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-gray-500 focus:border-amber-500"
                  required
                />
              </div>

              <Button type="submit" className={`w-full md:w-auto px-8 py-3 font-semibold transition-all ${accentBg}`}>
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Right Column: Contact Details and Hours */}
          <div className="lg:col-span-1 flex flex-col space-y-8 p-8 lg:p-0">
            
            <h3 className="text-2xl font-bold text-white mb-2 lg:mt-0">Quick Details</h3>

            <div className="space-y-6">
              <ContactInfoCard 
                icon={MapPin} 
                title="Our Location" 
                content="55 Main Street, New York, NY 10001" 
              />
              <ContactInfoCard 
                icon={Phone} 
                title="Phone Number" 
                content="+012 (345) 678 99" 
              />
              <ContactInfoCard 
                icon={Mail} 
                title="Email Address" 
                content="bistrolumiere@gmail.com" 
              />
            </div>

            <Separator className="bg-neutral-700" />
            
            <h3 className="text-2xl font-bold text-white mb-2">Working Hours</h3>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span className="font-medium text-white">Sunday - Thursday:</span>
                <span className={primaryColor}>08:00 am - 09:00pm</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span className="font-medium text-white">Friday:</span>
                <span className={primaryColor}>03:00 pm - 09:00pm</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span className="font-medium text-white">Saturday:</span>
                <span className="text-red-500">Closed</span>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
                <p className="text-white font-semibold mb-2">Find Us Here</p>
                <div className="h-48 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-700">
                    <MapPin className={`w-8 h-8 ${primaryColor}`} />
                    <span className="text-gray-400 ml-3">Map Placeholder</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;