import Image from "next/image";
import { Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Get In Touch</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Have a question about the project, want to collaborate, or just want
          to say hi? I would love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="relative h-80 w-full">
              <Image
                src="/eyas.jpg"
                alt="Eyas Mohammed"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-bold text-xl">Eyas Mohammed</p>
                <p className="text-white/70 text-sm">Full-Stack Developer</p>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <a
                href="mailto:Eyasadam01@outlook.com"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition">
                    Eyasadam01@outlook.com
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-slate-300 ml-auto shrink-0"
                />
              </a>

              <a
                href="tel:+6281235619255"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">WhatsApp / Phone</p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-green-600 transition">
                    +62 812 3561 9255
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-slate-300 ml-auto shrink-0"
                />
              </a>

              <a
                href="https://github.com/Eyasdm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Github size={16} className="text-slate-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">GitHub</p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition">
                    github.com/Eyasdm
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-slate-300 ml-auto shrink-0"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/eyas-adam/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Linkedin size={16} className="text-blue-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">LinkedIn</p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition">
                    linkedin.com/in/eyas-adam
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="text-slate-300 ml-auto shrink-0"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 text-lg mb-1">
            Send a Message
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            I will get back to you as soon as possible.
          </p>

          <form
            action="https://formsubmit.co/Eyasadam01@outlook.com"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_subject"
              value="New message from TechNest portfolio"
            />
            <input
              type="hidden"
              name="_next"
              value="http://localhost:3000/contact?sent=true"
            />

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Collaboration, job opportunity, feedback..."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 mb-1 block">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me what is on your mind..."
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all text-sm"
            >
              Send Message
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-4">
            Or email me directly at{" "}
            <a
              href="mailto:Eyasadam01@outlook.com"
              className="text-blue-600 hover:underline"
            >
              Eyasadam01@outlook.com
            </a>
          </p>
        </div>
      </div>

      <div className="mt-10 bg-linear-to-r from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-bold text-slate-900 mb-2">About TechNest</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          TechNest is a full-stack e-commerce application built as a portfolio
          project. It features a Next.js frontend, Node.js/Express backend,
          MongoDB database, Stripe payments, JWT authentication with HttpOnly
          cookies, real-time cart management, order tracking, and an admin
          dashboard — all built from scratch.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            "Next.js",
            "Node.js",
            "Express",
            "MongoDB",
            "Stripe",
            "React Query",
            "Tailwind CSS",
            "JWT",
          ].map((tech) => (
            <span
              key={tech}
              className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
