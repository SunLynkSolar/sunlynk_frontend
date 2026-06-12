"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Eye, Lock, RefreshCw, UserCheck, HelpCircle } from "lucide-react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "1. Introduction & Scope", icon: Eye },
    { id: "personal-info", title: "2. Personal Info We Collect", icon: HelpCircle },
    { id: "opt-out", title: "3. User Rights & Opt-Out", icon: RefreshCw },
    { id: "security", title: "4. Security Practices (ISO 27001)", icon: Lock },
    { id: "grievance", title: "5. Grievance Officer Details", icon: UserCheck },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Legal & Privacy Compliance
          </span>
          <h1 className="text-3xl md:text-5xl font-black">Privacy Policy</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Sidebar TOC */}
            <div className="lg:col-span-4 sticky top-28 hidden lg:block bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-2">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                        isActive
                          ? "bg-primary/10 text-primary border-l-4 border-primary"
                          : "text-slate-600 hover:bg-slate-100/60 hover:text-slate-800"
                      }`}
                    >
                      <Icon size={16} />
                      {sec.title}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-150">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Last updated: June 10, 2026. For details about website compliance or intermediary guidelines, visit our official{" "}
                  <Link href="/terms" className="text-primary font-bold hover:underline">
                    Terms of Use
                  </Link>.
                </p>
              </div>
            </div>

            {/* Right Column: Legal Text */}
            <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col gap-10">
              
              {/* Introduction Intro Card */}
              <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm mb-1">Branding & Alignment Notice</h4>
                  <p className="text-xs text-slate-500 leading-relaxed text-justify">
                    SunLynk Solar Energy Private Limited is fully committed to protecting the privacy and security of information supplied by our clients and website visitors. This Privacy Policy is updated to comply with current data protection rules and intermediary guidelines.
                  </p>
                </div>
              </div>

              {/* Section 1 */}
              <div id="introduction" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">1. Introduction & Scope</h2>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-4">
                  <p>
                    **SunLynk Solar Energy Private Limited** (“SunLynk Solar”/“We”/ “Us”) is committed to upholding the privacy and security of the information supplied by every person (“User”/“You”) accessing and using any version of the **https://www.sunlynksolar.com/** (“Website”).
                  </p>
                  <p>
                    This Privacy Policy explains the manner in which We collect, store, and use User information. By accessing or using the Website, You signify that You have read, understood, and agree to be bound by this Privacy Policy. This Privacy Policy does not apply to information collected from residents of countries other than India.
                  </p>
                  <p>
                    Your access and use of the Website following any such change constitutes your agreement to follow and be bound by this Privacy Policy, as updated or modified. For this reason, We encourage You to review this Privacy Policy each time You access and use the Website. Your use of the Website and any disputes arising therefrom is subject to this Privacy Policy and our associated{" "}
                    <Link href="/terms" className="text-primary font-bold hover:underline">
                      Terms of Use
                    </Link>.
                  </p>
                  <p>
                    We reserve the right to update or modify this Privacy Policy at any time without prior notice and such changes shall be effective immediately upon posting the updated or modified Privacy Policy on the Website and We shall not be bound to inform you of any modifications hereof.
                  </p>
                  <p>
                    On occasion, SunLynk Solar may offer special programs, activities, events, or promotions (“Programs”) that have unique or additional specific terms, privacy notices, and/or consent forms that explain how any information You provide will be processed in connection with the Programs. You should review the applicable terms before interacting or participating in the Programs.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="personal-info" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">2. Personal Information & SPDI Collected</h2>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-4">
                  <p>
                    We shall collect personal information of the User, by which he/ she/ it, as a person can be identified, including without limitation, name, gender, age, date of birth, height, weight, mobile number, address, email address, any identity proof number, phone number, health and fitness parameters, monthly electricity bills, and geographical coordinates.
                  </p>
                  <p>
                    We collect this information to customize rooftop solar engineering designs, calculate utility cost savings, assist in subsidy verification with grid utilities (Discoms), and communicate promotional offers. The data is collected directly from you when you complete submission forms (such as contact forms, popup forms, or savings calculators) or during site engineering surveys.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div id="opt-out" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">3. User Rights: Data Review, Modification & Consent Withdrawal</h2>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-4">
                  <p>
                    In accordance with Rule 5(7) of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (“Data Protection Rules”), you have the following rights regarding the personal information and Sensitive Personal Data or Information (SPDI) you share with us:
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 my-4 space-y-3">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Right to Review and Modify:</strong> You have the right to request a review of the personal information or SPDI provided by you to ensure that any inaccurate or deficient information is corrected or amended.
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <strong>Right to Opt-Out & Withdraw Consent:</strong> You have the option to withdraw your consent for data collection or processing at any time. If you decide to opt-out, please note that SunLynk Solar may be unable to continue offering its customized engineering services, technical consultations, or project layout services to you.
                    </p>
                  </div>

                  <p>
                    To request review, modification, or withdrawal of consent, please send a written request to our support desk email at{" "}
                    <a href="mailto:info@sunlynksolar.com" className="text-primary font-bold hover:underline">
                      info@sunlynksolar.com
                    </a>. We will process your request in accordance with the regulatory timelines.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div id="security" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">4. Reasonable Security Practices & Procedures</h2>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-4">
                  <p>
                    We prioritize keeping your personal information and SPDI secure. SunLynk Solar implements reasonable physical, electronic, managerial, and operational security measures to prevent unauthorized access, theft, loss, alteration, or disclosure of data.
                  </p>
                  <p>
                    We conform to international standards such as **IS/ISO/IEC 27001** on “Information Technology – Security Techniques – Information Security Management System – Requirements” to protect data integrity and secure our lead databases, calculators, and customer documents. Access control protocols, encryption standards, and secure backup procedures are continuously audited to ensure compliance with these international standards.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="grievance" className="scroll-mt-28">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">5. Designation of Grievance Officer</h2>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-4">
                  <p>
                    In accordance with Rule 5(9) of the Data Protection Rules, 2011, and Rules 3(1)(c) & 3(1)(f) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 (“Intermediary Rules”), SunLynk Solar has designated a Grievance Officer to address any questions, discrepancies, or grievances regarding the processing of your personal information.
                  </p>
                  
                  <p>
                    You may contact our Grievance Officer with details of your query or grievance, and we will address your concerns within the statutory period of 15 (fifteen) business days.
                  </p>

                  {/* Grievance Card */}
                  <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-2xl p-6 mt-4">
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <UserCheck size={16} className="text-primary" />
                      Grievance Redressal Desk
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Officer Name</span>
                        <span className="text-slate-700 font-bold">Mr. Amit Kumar</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Designation</span>
                        <span className="text-slate-700 font-bold">Grievance Officer</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Corporate Address</span>
                        <span className="text-slate-700 font-bold leading-relaxed">
                          SunLynk Solar Energy Private Limited, D 67 Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh - 226010
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Email Support</span>
                        <a href="mailto:info@sunlynksolar.com" className="text-primary font-bold hover:underline">
                          info@sunlynksolar.com
                        </a>
                      </div>
                      <div>
                        <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Direct Helpline</span>
                        <span className="text-slate-700 font-bold">+91 8573003001</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to top helper for mobile */}
              <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                <span>Last updated: June 10, 2026</span>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-primary font-bold">
                  Back to Top
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
