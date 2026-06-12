"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  const offices = [
    {
      title: "Mailing Address",
      desc: "D 67 Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
    },

    {
      title: "Regional Office",
      desc: "D 67 Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Get in Touch</span>
          <h1 className="text-3xl md:text-5xl font-black">Contact Us</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Form & Main Media */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Image/Branding */}
          <div className="flex flex-col gap-6 justify-center text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-3xl font-extrabold  leading-tight tracking-tight">
                Schedule a FREE consultation <br className="hidden sm:inline" />
                with us today!
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-3 font-semibold leading-relaxed">
                Please fill the form and we will get in touch with you for the consultation
              </p>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-3xl">
              <img
                src="/new_assets/teams.webp"
                alt="Contact SunLynk Solar"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex justify-center items-start w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Locations and Map */}
      <section className="pb-16 pt-6 bg-gray-1000 ">
        <div className="mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Map */}
          <div className="lg:col-span-12 rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-200 relative min-h-[350px]">
            <iframe
              title="SunLynk Lucknow Location Map"
              src="https://maps.google.com/maps?q=D%2067%20Vibhuti%20Khand%20Gomti%20Nagar%20Lucknow&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Location Cards */}
          {/* <div className="lg:col-span-6 flex flex-col gap-6">
            {offices.map((off, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base">{off.title}</h4>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{off.desc}</p>
                </div>
              </div>
            ))}
          </div> */}

        </div>
      </section>
    </div>
  );
}
