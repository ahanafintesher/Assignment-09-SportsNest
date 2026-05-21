"use client";

import { useEffect, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";
import FeaturedCard from "./FeaturedCard";

export default function FeaturedSection() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://sportsnest-server.vercel.app/featured-facilities")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setFacilities(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-[#050a0e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-3">
              Top Picks
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Featured
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {" "}
                Facilities
              </span>
            </h2>
            <p className="mt-3 text-white/40 text-base max-w-md">
              Hand-picked venues ready for your next game. Book instantly, play
              today.
            </p>
          </div>
          <Button
            as={Link}
            href="/facilities"
            variant="bordered"
            className="border-white/15 text-white/60 hover:text-white hover:border-white/30 rounded-xl shrink-0"
          >
            View All →
          </Button>
        </div>

        {/* ── Loading state ── */}
        {loading && (
          <div className="flex justify-center items-center h-72">
            <Spinner size="lg" color="success" />
          </div>
        )}

        {/* ── Error state ── */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">⚠️</span>
            <p className="text-white/50 text-base">
              Could not load facilities. Please try again later.
            </p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && facilities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">🏟️</span>
            <p className="text-white/50 text-base">
              No facilities available yet. Check back soon!
            </p>
          </div>
        )}

        {/* ── Cards grid ── */}
        {!loading && !error && facilities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((facility) => (
              <FeaturedCard key={facility._id} facility={facility} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
