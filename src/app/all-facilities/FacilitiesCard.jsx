"use client";

import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const THEME = {
  Cricket:        { emoji: "🏏", accent: "text-amber-600",   badge: "bg-amber-100 text-amber-700",    border: "border-amber-200"   },
  Football:       { emoji: "⚽", accent: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200" },
  Carrom:         { emoji: "🎯", accent: "text-purple-600",  badge: "bg-purple-100 text-purple-700",  border: "border-purple-200"  },
  "Table Tennis": { emoji: "🏓", accent: "text-cyan-600",    badge: "bg-cyan-100 text-cyan-700",      border: "border-cyan-200"    },
  Badminton:      { emoji: "🏸", accent: "text-rose-600",    badge: "bg-rose-100 text-rose-700",      border: "border-rose-200"    },
  Swimming:       { emoji: "🏊", accent: "text-blue-600",    badge: "bg-blue-100 text-blue-700",      border: "border-blue-200"    },
};

const DEFAULT_THEME = {
  emoji: "🏟️",
  accent: "text-gray-600",
  badge: "bg-gray-100 text-gray-700",
  border: "border-gray-200",
};

export default function AllFacilityCard({ facility }) {
  const {
    _id,
    name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
    booking_count,
    description,
  } = facility;

  const theme = THEME[facility_type] ?? DEFAULT_THEME;
  const coverImage = Array.isArray(image) ? image[0] : image;

  return (
    <Card className={`bg-white border ${theme.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group`}>

      {/* ── Cover image ── */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* type badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${theme.badge} backdrop-blur-sm`}>
          {theme.emoji} {facility_type}
        </span>

        {/* booking count */}
        <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/80 text-gray-600 backdrop-blur-sm">
          🔖 {booking_count} booked
        </span>
      </div>

      <Card.Content className="p-5 flex flex-col gap-3">

        {/* Name & location */}
        <div>
          <h3 className={`text-base font-bold text-gray-900 group-hover:${theme.accent} transition-colors leading-snug`}>
            {name}
          </h3>
          <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{description}</p>

        {/* Price + capacity */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 mb-0.5">Price/hour</p>
            <p className={`text-sm font-bold ${theme.accent}`}>৳{price_per_hour}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 mb-0.5">Capacity</p>
            <p className="text-sm font-bold text-gray-700">{capacity} players</p>
          </div>
        </div>

        {/* Slots */}
        <div>
          <p className="text-xs text-gray-400 mb-1.5">Available Slots</p>
          <div className="flex flex-wrap gap-1.5">
            {available_slots?.slice(0, 3).map((slot) => (
              <span key={slot} className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 text-gray-500 border border-gray-200">
                {slot}
              </span>
            ))}
            {available_slots?.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 text-gray-400 border border-gray-200">
                +{available_slots.length - 3} more
              </span>
            )}
          </div>
        </div>

      </Card.Content>

      <Card.Footer className="px-5 pb-5 pt-0">
       <Link href={`/all-facilities/${_id}`}>
             <Button
         
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
        >
          Book Now
        </Button>
       </Link>
      </Card.Footer>
    </Card>
  );
}