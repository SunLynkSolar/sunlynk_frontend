"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Users, Heart, Award, ArrowRight, Send, Mail, X, Loader2, Check } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
}

interface ApplyForm {
  name: string;
  email: string;
  phone: string;
  resumeLink: string;
  coverNote: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyForm, setApplyForm] = useState<ApplyForm>({ name: "", email: "", phone: "", resumeLink: "", coverNote: "" });
  const [applyLoading, setApplyLoading] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/jobs`);
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch {
        // silently fall back to empty
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const openApplyModal = (job: Job) => {
    setSelectedJob(job);
    setApplySuccess(false);
    setApplyError("");
    setApplyForm({ name: "", email: "", phone: "", resumeLink: "", coverNote: "" });
    setSelectedFile(null);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplySuccess(false);
    setApplyError("");
    setSelectedFile(null);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    if (!selectedFile) {
      setApplyError("Please select a resume file to upload.");
      return;
    }
    setApplyLoading(true);
    setApplyError("");
    try {
      // 1. Upload file using multer endpoint
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const uploadRes = await fetch(`${API_URL}/api/upload/resume`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const uploadData = await uploadRes.json();
        throw new Error(uploadData.error || "Failed to upload resume file");
      }

      const uploadData = await uploadRes.json();
      const resumeLink = uploadData.url;

      // 2. Submit application details with the uploaded resume URL
      const res = await fetch(`${API_URL}/api/jobs/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob._id,
          ...applyForm,
          resumeLink,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit application");
      }
      setApplySuccess(true);
    } catch (err: unknown) {
      setApplyError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setApplyLoading(false);
    }
  };

  const benefits = [
    { title: "Growth Oriented", desc: "Fast-track your professional journey in India's leading clean tech renewable sector.", icon: Award },
    { title: "Inclusive Culture", desc: "Collaborate with cross-functional experts in engineering, automation, and project logistics.", icon: Users },
    { title: "Impact Driven", desc: "Directly contribute to reducing carbon footprints and clean energy transitions daily.", icon: Heart },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Page Header */}
      <section className="relative bg-dark text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center max-w-3xl">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Join Our Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">Build the Future of Clean Energy</h1>
          <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed">
            Accelerate your career in the renewable energy sector. We are looking for passionate individuals who want to build high-performance, bankable solar systems.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Careers</span>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-xs uppercase tracking-wider font-extrabold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
            Our Culture
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 max-w-lg mx-auto leading-tight">
            Why you will love working at SunLynk Solar
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-3">
            We offer competitive compensation, health benefits, flexible working parameters, and the chance to lead complex project executions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {benefits.map((ben, idx) => {
              const Icon = ben.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200/50 p-8 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-lg">{ben.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{ben.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-200/40">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full">
              Opportunity
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 leading-tight">
              Open Positions
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Explore your fit and apply directly to join our dynamic teams.
            </p>
          </div>

          {jobsLoading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm font-semibold">Loading open positions...</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Briefcase size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-semibold">No open positions at the moment.</p>
              <p className="text-sm text-slate-400 mt-1">Check back soon or send us a speculative application below.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md hover:border-slate-300/60 transition-all">
                  <div className="space-y-2 max-w-xl text-left">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MapPin size={10} /> {job.location}
                      </span>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{job.description}</p>
                    {job.requirements.length > 0 && (
                      <ul className="mt-1 flex flex-col gap-0.5">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                            <span className="mt-0.5 text-primary font-bold shrink-0">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => openApplyModal(job)}
                    className="bg-emerald-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md flex items-center gap-2 hover:bg-emerald-700 active:scale-[0.98] transition-all whitespace-nowrap self-stretch md:self-auto justify-center cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Career Call To Action Application Card */}
      <section className="py-20 bg-white border-t border-slate-200/40">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center text-primary">
                <Briefcase size={22} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black">Don&apos;t see the right role?</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                If you are passionate about solar energy but don&apos;t see a matching open position, we would still love to hear from you. Send us your CV and a brief cover letter.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 w-full max-w-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-sm flex-1 justify-center sm:justify-start">
                  <Mail size={16} />
                  <span>info@sunlynksolar.com</span>
                </div>
                <a
                  href="mailto:info@sunlynksolar.com?subject=Speculative%20Job%20Application%20-%20SunLynk%20Solar"
                  className="bg-primary hover:bg-primary-hover text-white font-extrabold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md w-full sm:w-auto justify-center"
                >
                  <span>Submit CV</span>
                  <Send size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Apply Modal ─────────────────────────────────────────────────────────── */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-start justify-between gap-4 z-10">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-primary">Apply for Position</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{selectedJob.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedJob.department} · {selectedJob.location} · {selectedJob.type}</p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0 cursor-pointer mt-0.5">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6">
              {applySuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center">
                    <Check size={28} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg">Application Submitted!</h4>
                    <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">Our HR team will review your application and reach out within 3–5 business days.</p>
                  </div>
                  <button onClick={closeModal} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-xl text-sm transition-colors cursor-pointer">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                  {applyError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm py-3 px-4 rounded-xl">
                      {applyError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text" required
                        placeholder="Your full name"
                        value={applyForm.name}
                        onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                        className="border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address *</label>
                      <input
                        type="email" required
                        placeholder="your@email.com"
                        value={applyForm.email}
                        onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                        className="border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number *</label>
                    <input
                      type="tel" required
                      placeholder="+91 98765 43210"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      className="border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Upload Resume (PDF, DOC, DOCX) *</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSelectedFile(file);
                      }}
                      className="border border-slate-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400">Please upload a PDF or Word document up to 10MB</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Cover Note</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us why you're a great fit for this role..."
                      value={applyForm.coverNote}
                      onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                      className="border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary text-slate-800 bg-slate-50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={applyLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60 cursor-pointer mt-1"
                  >
                    {applyLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    <span>{applyLoading ? "Submitting..." : "Submit Application"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
