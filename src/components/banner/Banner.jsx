"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const SPORTS = ["Football", "Badminton", "Carrom Table", "Tennis", "Cricket", "Table Tennis"];

export default function Banner() {
  const [currentSport, setCurrentSport] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const full = SPORTS[loopIndex % SPORTS.length];
    const speed = isDeleting ? 60 : 100;

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(full.slice(0, displayed.length + 1));
        if (displayed.length + 1 === full.length) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setDisplayed(full.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setLoopIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, loopIndex]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#050a0e]">

      {/* ── Animated grid background ── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(52,211,153,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Radial glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] pointer-events-none" />

      {/* ── Floating sport icons ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {[
          { icon: "⚽", top: "12%", left: "8%", delay: "0s", size: "text-4xl" },
          { icon: "🏸", top: "20%", right: "10%", delay: "0.8s", size: "text-3xl" },
          { icon: "🎾", bottom: "25%", left: "5%", delay: "1.6s", size: "text-3xl" },
          { icon: "🏊", top: "60%", right: "6%", delay: "0.4s", size: "text-4xl" },
          { icon: "🏀", bottom: "15%", right: "18%", delay: "1.2s", size: "text-3xl" },
          { icon: "🏏", top: "40%", left: "3%", delay: "2s", size: "text-2xl" },
        ].map((item, i) => (
          <span
            key={i}
            className={`absolute ${item.size} opacity-20`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              animation: `floatBob 4s ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            {item.icon}
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">
              Book your court in seconds
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Find & Book
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {displayed}
                <span className="inline-block w-[3px] h-[0.85em] bg-emerald-400 ml-1 align-middle animate-pulse" />
              </span>
            </span>
            <br />
            <span className="text-white/90">Facilities Near You</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-white/50 max-w-xl mb-10 leading-relaxed font-light">
            Discover premium sports venues, check real-time availability, and
            secure your slot — all in one place. No calls, no hassle.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              as={Link}
              href="/facilities"
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 h-12 text-base rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              Explore Facilities
            </Button>
            <Link href={'/signup'}>
                <Button
              as={Link}
              href="/register"
              size="lg"
              variant="bordered"
              className="border-white/20 text-white/70 hover:text-white hover:border-white/40 font-semibold px-8 h-12 text-base rounded-xl transition-all"
            >
              Create Account
            </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10">
            {[
              { value: "200+", label: "Facilities" },
              { value: "50K+", label: "Bookings Made" },
              { value: "15+", label: "Sports Covered" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-sm text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* ── Float animation keyframes ── */}
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(5deg); }
          66% { transform: translateY(-6px) rotate(-3deg); }
        }
      `}</style>
    </section>
  );
}