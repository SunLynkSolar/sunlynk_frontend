import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, Code, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Inverter & Panel Support Downloads | SunLynk Solar",
  description: "Access and download the latest software, user manuals, and technical datasheets for solar inverters and panel components.",
  keywords: [
    "solar inverter manual",
    "solar inverter software",
    "solar datasheet download",
    "inverter modbus map",
    "ESS configurator software",
    "SunLynk support downloads",
    "solar panel manuals"
  ]
};

export default function InverterDownloads() {
  const downloads = [
    {
      title: "Hitachi Residential Inverters User Manual (3kW - 12kW)",
      size: "6.8 MB",
      type: "User Manual",
      icon: <FileText size={20} className="text-primary" />,
      link: "#"
    },
    {
      title: "Hitachi C&I Inverters Datasheet & Installation Guide",
      size: "3.5 MB",
      type: "Datasheet",
      icon: <FileText size={20} className="text-primary" />,
      link: "#"
    },
    {
      title: "Sineng Commercial Inverter Modbus Protocol Map v1.2",
      size: "940 KB",
      type: "Register Map",
      icon: <Code size={20} className="text-primary" />,
      link: "#"
    },
    {
      title: "SunLynkSmart ESS Energy Management configuration software",
      size: "22.1 MB",
      type: "Software Utility",
      icon: <Cpu size={20} className="text-primary" />,
      link: "#"
    }
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
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Resource Center</span>
          <h1 className="text-3xl md:text-5xl font-black">Inverters and Panels Support</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>Support</span>
            <span>/</span>
            <span className="text-white">Inverters and Panels Downloads</span>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-left">Inverters & Panels Documentation</h3>

          <div className="flex flex-col gap-4">
            {downloads.map((dl, idx) => (
              <div
                key={idx}
                className="bg-gray-1000 border border-gray-100 p-5 rounded-xl flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    {dl.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 text-sm md:text-base">{dl.title}</h5>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span>Type: {dl.type}</span>
                      <span>•</span>
                      <span>Size: {dl.size}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={dl.link}
                  className="bg-white hover:bg-primary border border-gray-200 hover:border-primary text-gray-700 hover:text-white p-3 rounded-lg shadow-sm transition-all duration-300 shrink-0"
                >
                  <Download size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
