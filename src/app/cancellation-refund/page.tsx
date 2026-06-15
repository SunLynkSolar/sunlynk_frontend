"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, RefreshCw, AlertTriangle, Calendar, Phone, Mail, CheckCircle2 } from "lucide-react";

export default function CancellationRefundPolicy() {
  const tableData = [
    {
      stage: "Booking Advance Paid (Before DEV* or within 24 Hours of Booking)",
      policy: "Eligible for FULL REFUND if requested within 24 hours of payment.",
      highlight: true,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      stage: "Post 24 Hours of Booking until Detailed Engineering Visit (DEV) is done",
      policy: "Refundable after deducting a processing fee of ₹10,000 for onboarding.",
      highlight: false,
      color: "bg-slate-50 text-slate-700 border-slate-200"
    },
    {
      stage: "On the day of or after the Detailed Engineering Visit (DEV)",
      policy: "NOT eligible for Refund or Cancellation.",
      highlight: false,
      color: "bg-rose-50/40 text-rose-800 border-rose-100"
    },
    {
      stage: "After engineering design has been shared for approval",
      policy: "NOT eligible for Refund or Cancellation.",
      highlight: false,
      color: "bg-rose-50/40 text-rose-800 border-rose-100"
    },
    {
      stage: "After Remainder Payment (30% for loans, or 30-100% for direct payments)",
      policy: "NOT eligible for Refund or Cancellation.",
      highlight: false,
      color: "bg-rose-50/40 text-rose-800 border-rose-100"
    },
    {
      stage: "After delivery of solar materials (partially or fully)",
      policy: "NOT eligible for Refund or Cancellation. Damaged or missing materials will be replaced.",
      highlight: false,
      color: "bg-rose-50/40 text-rose-800 border-rose-100"
    },
    {
      stage: "During or after project installation",
      policy: "NOT permitted. Remaining balance of the order value will be payable.",
      highlight: false,
      color: "bg-rose-50/40 text-rose-800 border-rose-100"
    }
  ];

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
            Commercial Guidelines
          </span>
          <h1 className="text-3xl md:text-5xl font-black">Cancellation & Refund Policy</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Cancellation & Refund</span>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col gap-10">
          
          {/* Header Note */}
          <div>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
              At **SunLynk Solar**, we place your satisfaction at the heart of everything we do. In the event that you wish to cancel your solar project, rest assured that we have a fair and transparent cancellation and refund policy in place.
            </p>
          </div>

          {/* Section 1: Customer Cancellation */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full shrink-0" />
              1. Cancellation By Customer
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                <strong>1.1. Request Initiation:</strong> To initiate cancellation of your solar project, please send a written request to our official delight email at{" "}
                <a href="mailto:info@sunlynksolar.com" className="text-primary font-bold hover:underline">
                  info@sunlynksolar.com
                </a>{" "}
                or message us on our helpline WhatsApp number{" "}
                <a href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20free%20Solar%20Consultation." target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                  +91 8573003001
                </a>. For clarity and records validation, we are unable to process verbal cancellation requests.
              </p>
              
              <p>
                <strong>1.2. Stage-Wise Refund Rules:</strong> The cancellation processing window depends on the stage of the project when the cancellation request is officially raised:
              </p>

              {/* Stage Table */}
              <div className="overflow-x-auto my-6 border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 font-bold text-slate-700 w-1/2">Project Stage When Requested</th>
                      <th className="p-4 font-bold text-slate-700 w-1/2">Refund Eligibility & Processing Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-semibold text-slate-800 leading-relaxed">{row.stage}</td>
                        <td className={`p-4 border-l border-slate-100 font-medium ${row.color}`}>
                          {row.policy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 italic">
                *DEV refers to the Detailed Engineering Visit conducted by our technical team at your project premises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Conditions for Cancellation */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
                <h4 className="font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" />
                  1.3. When is my order eligible?
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                  <li><strong>Timeline Window:</strong> The request must fall within the permitted refund stages in the stage table above.</li>
                  <li><strong>Non-Fulfilment:</strong> If SunLynk Solar has made a formal timeline commitment in writing, but fails to adhere to the same.</li>
                </ul>
              </div>

              {/* Conditions for Non-Cancellation */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
                <h4 className="font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600" />
                  1.4. When can the order NOT be cancelled?
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                  <li><strong>Change of Mind:</strong> If requested post 24 hours of paying booking advance.</li>
                  <li><strong>Custom Design:</strong> Requesting non-standard components/installation against our guidelines.</li>
                  <li><strong>Third-party Delays:</strong> Delays caused by utility companies (Discoms) or structural feasibility issues.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Cancellation by SunLynk Solar */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full shrink-0" />
              2. Cancellation By SunLynk Solar
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed text-justify space-y-3">
              <p>
                We aim to serve every customer with the highest commitment. However, in rare or exceptional situations, we reserve the right to cancel our booking at our sole discretion. This applies regardless of whether the order is confirmed or payment has been received:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li><strong>Force Majeure:</strong> Natural disasters, labor strikes, or other conditions beyond our control. Any costs incurred will be communicated and rescheduling options offered.</li>
                <li><strong>Logistical roadblocks:</strong> Limitations in safety permits, height restrictions, or discom infrastructure limits.</li>
                <li><strong>Design Feasibility:</strong> If, during detailed structural reviews, we discover feasibility issues that prevent safe installation. A refund is issued in this case after deducting a ₹10,000 onboarding fee.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Refunds Processing */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full shrink-0" />
              3. Refunds Processing Guidelines
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                <strong>3.1. Gateway Anomalies:</strong> Double charges or debits for failed transactions will be refunded in full (excluding payment gateway processing charges).
              </p>
              <p>
                <strong>3.2. Processing Timelines:</strong> Approved refunds for electronic payments (Credit Card, Net Banking, UPI) will be processed within **15 business days** back to the customer bank account.
              </p>
              <p>
                <strong>3.3. Bank Account Match:</strong> Refund payments are issued only in Indian Rupees (INR). We do not issue cash refunds. The beneficiary bank account details shared must match the original booking name to prevent unauthorized transfers.
              </p>
              <p>
                <strong>3.4. Failed Communications:</strong> No refund will be processed if no response is received from the customer following four outreach attempts through meetings, phone, WhatsApp, or email.
              </p>
            </div>
          </div>

          {/* Section 4 to 9: Additional Rules */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full shrink-0" />
              4. Additional Conditions
            </h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                <strong>4. Change Orders:</strong> Project layout changes requested before design finalization may alter commercial quotes and are processed separately from the cancellation rules.
              </p>
              <p>
                <strong>5. Rescheduling:</strong> Subject to technical validation, SunLynk Solar may offer to reschedule installation timelines instead of cancellation.
              </p>
              <p>
                <strong>6. System Warranty:</strong> Post-installation concerns regarding system power generation or panel specifications are covered under our product warranty guidelines, and cancellation is not permitted.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-2xl text-center text-xs">
            <p className="font-semibold text-slate-600">
              Need assistance or want to follow up on a cancellation refund?
            </p>
            <p className="mt-2 flex items-center justify-center gap-4 text-primary font-bold">
              <a href="mailto:info@sunlynksolar.com" className="flex items-center gap-1 hover:underline">
                <Mail size={14} /> info@sunlynksolar.com
              </a>
              <span>•</span>
              <a href="tel:+918573003001" className="flex items-center gap-1 hover:underline">
                <Phone size={14} /> +91 8573003001
              </a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
