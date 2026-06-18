import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import { Download, CheckCircle, ChevronRight, Phone, Mail, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  if (!product) {
    return {
      title: "Product Not Found | SunLynk Solar",
    };
  }
  return {
    title: `${product.title} | SunLynk Solar`,
    description: `Buy and install ${product.title}. Get high-efficiency solar panels and inverter components from SunLynk Solar. Model Type: ${product.type}, Max Efficiency: ${product.efficiency || "N/A"}.`,
    keywords: [
      product.title,
      `solar panel ${product.type}`,
      "high efficiency solar panels",
      "solar inverter",
      "buy solar panels India",
      "solar components",
      `${product.title} Lucknow`
    ]
  };
}

export async function generateStaticParams() {
  return productsData.map((prod) => ({
    slug: prod.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products sidebar list
  const sidebarProducts = productsData.filter((p) => p.category === product.category);

  return (
    <div>
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        ></div>
        {/* Infinite sliding text banner */}
        <div className="absolute top-0 left-0 w-full overflow-hidden bg-primary/20 py-2.5">
          <div className="whitespace-nowrap flex animate-text-scroll text-xs uppercase font-extrabold tracking-widest text-primary gap-8">
            {Array(10).fill(`* ${product.categoryName}`).map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 mt-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">{product.categoryName}</span>
          <h1 className="text-3xl md:text-5xl font-black">{product.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-white">{product.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar Left (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Sidebar Navigation */}
            <div className="bg-gray-1000 border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-800 text-lg mb-4 border-b border-gray-200 pb-2">Related Products</h4>
              <ul className="flex flex-col gap-2">
                {sidebarProducts.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      className={`flex justify-between items-center px-4 py-3 rounded-md border text-sm font-semibold transition-all duration-300 ${p.id === product.id
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-1000 hover:text-primary"
                        }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Datasheet Download */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-sm border border-gray-800 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Product Documentation</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Download the technical specifications and mechanical parameters datasheet for the {product.title}.
              </p>
              <a
                href={product.datasheet}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>Download Datasheet</span>
              </a>
            </div>

            {/* Sidebar quick support */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col gap-4">
              <h4 className="font-bold text-gray-800 text-lg">Need Assistance?</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Have questions about design layout or grid capacity integration? Speak with our solar specialists.
              </p>
              <div className="flex flex-col gap-2">
                <a href="tel:+918573003001" className="flex items-center gap-2 text-sm font-bold text-dark hover:text-primary transition-colors">
                  <Phone size={16} className="text-primary" />
                  <span>+91 8573003001</span>
                </a>
                <a href="mailto:info@sunlynksolar.com" className="flex items-center gap-2 text-sm font-bold text-dark hover:text-primary transition-colors">
                  <Mail size={16} className="text-primary" />
                  <span>info@sunlynksolar.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Product detail Right (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-left">
            {/* Product Image */}
            <div className="relative w-full aspect-[16/9] bg-gray-1000 rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Specifications Card */}
            <div className="bg-gray-1000 border border-gray-100 rounded-2xl p-8 flex flex-col gap-4">
              <h3 className="text-2xl font-extrabold text-dark">{product.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Model Type</span>
                  <span className="text-base font-bold text-gray-800 mt-1 block">{product.type}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Power Capacity</span>
                  <span className="text-base font-bold text-primary mt-1 block">{product.powerRange}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-bold">Max Efficiency</span>
                  <span className="text-base font-bold text-primary mt-1 block">{product.efficiency}</span>
                </div>
              </div>
            </div>

            {/* Description & Features */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold text-dark">Technical Features</h4>
              <ul className="flex flex-col gap-3">
                {product.features.map((feature, idx) => {
                  const parts = feature.split(":");
                  const title = parts[0];
                  const desc = parts.slice(1).join(":");

                  return (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow transition-shadow">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                      <div>
                        {desc ? (
                          <>
                            <strong className="text-gray-800 font-bold">{title}:</strong>
                            <span>{desc}</span>
                          </>
                        ) : (
                          <span>{feature}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* General FAQs accordion block */}
            <div className="flex flex-col gap-4 mt-4">
              <h4 className="text-xl font-bold text-dark">Where can I get some?</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-1000 border-b border-gray-200">
                  <h5 className="font-bold text-gray-800 text-sm">How do I request a quote for this product?</h5>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    You can request a custom quotation by clicking the floating &ldquo;Buy Now&rdquo; button on the bottom right or filling out the inquiry form below. Our engineering team will review your project requirements and provide customized specifications.
                  </p>
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-gray-800 text-sm">What is the delivery and commissioning timeline?</h5>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Deliveries for standard PV modules and string inverters take 2 to 4 weeks depending on batch capacity. Weather monitoring stations and customized central SCADA enclosures typically require 4 to 6 weeks for custom layout testing and IEC calibration certifications.
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed call to action form */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center mt-6">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg font-bold text-gray-800">Interested in this product?</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Let us help you design and scale your solar generation portfolio with our authorized bankable equipment.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-primary"
              >
                <span>Request Custom Quote</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
