"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Mail, Phone } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <>
      {/* Topbar */}
      <div className="bg-dark text-gray-300 text-xs py-2 px-4 md:px-8 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-4">
          <a href="mailto:info@SunLynkSolar.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail size={14} className="text-primary" />
            <span>info@SunLynkSolar.com</span>
          </a>
          <a href="tel:+919711882204" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone size={14} className="text-primary" />
            <span>+91 8922036792</span>
          </a>
        </div>
        <div className="text-gray-400 hidden sm:flex ">
          <span>Hours: Mon - Sat: 9:00 AM - 6:30 PM (Sun Closed)</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`w-full bg-white transition-all duration-300 z-50 border-b border-gray-300 ${isSticky
          ? "fixed top-0 left-0 shadow-lg py-2"
          : "relative py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <Image
              src="/logo.webp"
              alt="SunLynk Solar Logo"
              width={200}
              height={100}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-md">
            <Link
              href="/"
              className={`font-semibold hover:text-primary transition-colors ${pathname === "/" ? "text-primary" : "text-gray-800"
                }`}
            >
              Home
            </Link>

            {/* Our Offerings Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-gray-800 hover:text-primary transition-colors py-2">
                <span>Our Offerings</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl rounded-md border border-gray-100 py-2 w-56 mt-1 transition-all duration-200">
                <Link href="/solutions/homes" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-semibold">
                  Homes
                </Link>
                <Link href="/solutions/commercial" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-semibold">
                  Commercial
                </Link>
                <Link href="/solutions/housing-societies" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-semibold">
                  Housing Societies
                </Link>
              </div>
            </div>

            {/* Solar Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-gray-800 hover:text-primary transition-colors py-2">
                <span>Solar Solutions</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl rounded-md border border-gray-100 py-2 w-56 mt-1 transition-all duration-200">
                {/* <Link href="/solutions/energy-storage-solutions" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-semibold">
                  Off-Grid Solar
                </Link> */}
                <Link href="/solutions/on-grid-solar" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-semibold">
                  On Grid Solar
                </Link>
                <Link href="/solutions/hybrid-solar" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-semibold">
                  Hybrid solar
                </Link>
              </div>
            </div>

            {/* Support Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold text-gray-800 hover:text-primary transition-colors py-2">
                <span>Support</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl rounded-md border border-gray-100 py-2 w-56 mt-1 transition-all duration-200">
                <Link href="/support/warranty" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-medium">
                  Warranty Claims
                </Link>
                <Link href="/support/wms-downloads" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-medium">
                  WMS Products
                </Link>
                <Link href="/support/inverter-downloads" className="block px-4 py-2 hover:bg-gray-1000 text-sm text-gray-700 hover:text-primary font-medium">
                  Inverters and Panels
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              className={`font-semibold hover:text-primary transition-colors ${pathname === "/about" ? "text-primary" : "text-gray-800"
                }`}
            >
              About us
            </Link>
            <Link
              href="/blog"
              className={`font-semibold hover:text-primary transition-colors ${pathname.startsWith("/blog") ? "text-primary" : "text-gray-800"
                }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`font-bold text-sm px-5 py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 ml-2 ${pathname === "/contact"
                ? "bg-primary-hover text-white"
                : "bg-primary hover:bg-primary-hover text-white"
                }`}
            >
              Contact us
            </Link>
          </nav>

          {/* Toggle Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800 hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-xl z-50 py-4 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col px-6 gap-3">
              <Link href="/" className="py-2 border-b border-gray-50 font-semibold text-gray-800">
                Home
              </Link>

              {/* Our Offerings mobile */}
              <div className="border-b border-gray-50 py-2">
                <button
                  onClick={() => toggleDropdown("offerings")}
                  className="flex justify-between items-center w-full font-semibold text-gray-800"
                >
                  <span>Our Offerings</span>
                  <ChevronDown size={18} className={`transform transition-transform ${activeDropdown === "offerings" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "offerings" && (
                  <div className="pl-4 mt-2 flex flex-col gap-2 text-sm text-gray-700">
                    <Link href="/solutions/homes" className="py-1">Homes</Link>
                    <Link href="/solutions/commercial" className="py-1">Commercial</Link>
                    <Link href="/solutions/housing-societies" className="py-1">Housing Societies</Link>
                  </div>
                )}
              </div>

              {/* Solar Solutions mobile */}
              <div className="border-b border-gray-50 py-2">
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className="flex justify-between items-center w-full font-semibold text-gray-800"
                >
                  <span>Solar Solutions</span>
                  <ChevronDown size={18} className={`transform transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "solutions" && (
                  <div className="pl-4 mt-2 flex flex-col gap-2 text-sm text-gray-700">
                    {/* <Link href="/solutions/energy-storage-solutions" className="py-1">Off-Grid Solar</Link> */}
                    <Link href="/solutions/on-grid-solar" className="py-1">On Grid Solar</Link>
                    <Link href="/solutions/hybrid-solar" className="py-1">Hybrid solar</Link>
                  </div>
                )}
              </div>

              {/* Support mobile */}
              <div className="border-b border-gray-50 py-2">
                <button
                  onClick={() => toggleDropdown("support")}
                  className="flex justify-between items-center w-full font-semibold text-gray-800"
                >
                  <span>Support</span>
                  <ChevronDown size={18} className={`transform transition-transform ${activeDropdown === "support" ? "rotate-180" : ""}`} />
                </button>
                {activeDropdown === "support" && (
                  <div className="pl-4 mt-2 flex flex-col gap-2 text-sm text-gray-700">
                    <Link href="/support/warranty" className="py-1">Warranty Claims</Link>
                    <Link href="/support/wms-downloads" className="py-1">WMS Products</Link>
                    <Link href="/support/inverter-downloads" className="py-1">Inverters and Panels</Link>
                  </div>
                )}
              </div>

              <Link href="/about" className="py-2 border-b border-gray-50 font-semibold text-gray-800">
                About us
              </Link>
              <Link href="/blog" className="py-2 border-b border-gray-50 font-semibold text-gray-800">
                Blog
              </Link>
              <Link href="/contact" className="py-2 border-b border-gray-50 font-semibold text-gray-800">
                Contact us
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
