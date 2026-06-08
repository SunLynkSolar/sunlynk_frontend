"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  isDark?: boolean;
}

export default function FaqAccordion({ faqs, isDark = false }: FaqAccordionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(1);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className={`border rounded-lg overflow-hidden transition-all ${
            isDark ? "border-emerald-950/40 bg-[#071813]/80" : "border-gray-200 bg-white"
          }`}
        >
          <button
            onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
            className={`w-full flex justify-between items-center p-4 text-left font-bold transition-colors focus:outline-none ${
              isDark ? "text-white hover:text-emerald-400" : "text-gray-800 hover:text-primary"
            }`}
          >
            <span>{faq.question}</span>
            <ChevronDown
              size={18}
              className={`transform transition-transform ${
                activeFaq === faq.id ? (isDark ? "rotate-180 text-emerald-400" : "rotate-180 text-primary") : ""
              }`}
            />
          </button>
          {activeFaq === faq.id && (
            <div
              className={`p-4 border-t text-sm leading-relaxed text-justify ${
                isDark ? "bg-[#0A2017]/40 border-emerald-950/40 text-slate-300" : "bg-gray-1000 border-gray-200 text-gray-600"
              }`}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
