import Image from "next/image";
import { Package, Zap, Lock } from "lucide-react";

const features = [
  { icon: Package, text: "Track orders in real-time" },
  { icon: Zap, text: "Exclusive deals for members" },
  { icon: Lock, text: "Secure & private checkout" },
];

export default function LeftPanel() {
  return (
    <div
      className="hidden lg:flex flex-[0_0_58%] relative overflow-hidden items-center px-16 py-12"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%)",
      }}
    >
      {/* Background illustration */}
      {/* <Image
        src="/auth-bg.png"
        alt=""
        fill
        style={{ objectFit: "cover", opacity: 0.18 }}
        priority
      /> */}

      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { size: 180, top: "8%", left: "5%", opacity: 0.5 },
          { size: 80, top: "65%", left: "12%", opacity: 0.7 },
          { size: 120, top: "20%", right: "8%", opacity: 0.45 },
          { size: 60, bottom: "12%", right: "18%", opacity: 0.6 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-white"
            style={{
              width: s.size,
              height: s.size,
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              opacity: s.opacity * 0.15,
            }}
          />
        ))}

        {/* Dot grid */}
        <svg
          className="absolute bottom-[10%] left-[6%] opacity-15"
          width="160"
          height="120"
          viewBox="0 0 160 120"
        >
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 22 + 6}
                cy={row * 22 + 6}
                r="2.5"
                fill="white"
              />
            )),
          )}
        </svg>

        {/* Triangle */}
        <svg
          className="absolute bottom-[8%] left-[44%] opacity-25"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <polygon points="9,0 18,18 0,18" fill="white" />
        </svg>

        {/* X mark */}
        <svg
          className="absolute bottom-[8%] right-[8%] opacity-25"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <line
            x1="0"
            y1="0"
            x2="20"
            y2="20"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="20"
            y1="0"
            x2="0"
            y2="20"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-105">
        <div className="inline-block bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1.5 text-xs font-bold text-white tracking-widest uppercase mb-6">
          Premium Tech Accessories
        </div>

        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
          Welcome Back
          <br />
          to TechNest
        </h1>

        <p className="text-white/75 text-base leading-relaxed mb-10 max-w-sm">
          Access your orders, track deliveries, and manage your purchases — all
          in one place.
        </p>

        <div className="flex flex-col gap-3">
          {features.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/18 rounded-xl px-4 py-2.5 w-fit"
            >
              <Icon size={18} className="text-white shrink-0" />
              <span className="text-white text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
