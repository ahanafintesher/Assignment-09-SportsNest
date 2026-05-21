"use client";

import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const THEME = {
  Cricket:        { emoji: "🏏", accent: "text-amber-400",   badge: "bg-amber-500/15 text-amber-400",   border: "border-amber-500/30"   },
  Football:       { emoji: "⚽", accent: "text-emerald-400", badge: "bg-emerald-500/15 text-emerald-400", border: "border-emerald-500/30" },
  Carrom:         { emoji: "🎯", accent: "text-purple-400",  badge: "bg-purple-500/15 text-purple-400",  border: "border-purple-500/30"  },
  "Table Tennis": { emoji: "🏓", accent: "text-cyan-400",    badge: "bg-cyan-500/15 text-cyan-400",      border: "border-cyan-500/30"    },
  Badminton:      { emoji: "🏸", accent: "text-rose-400",    badge: "bg-rose-500/15 text-rose-400",      border: "border-rose-500/30"    },
  Swimming:       { emoji: "🏊", accent: "text-blue-400",    badge: "bg-blue-500/15 text-blue-400",      border: "border-blue-500/30"    },
};

const DEFAULT_THEME = {
  emoji: "🏟️",
  accent: "text-gray-400",
  badge: "bg-gray-500/15 text-gray-400",
  border: "border-gray-500/30",
};

export default function FeaturedCard({ facility }) {
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
  } = facility;

  const theme = THEME[facility_type] ?? DEFAULT_THEME;
  const coverImage = Array.isArray(image) ? image[0] : image;

  return (
    <Card className={`bg-white/[0.03] border ${theme.border} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group`}>

      
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

       
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${theme.badge}`}>
          {theme.emoji} {facility_type}
        </span>

       
        <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 text-white/70 backdrop-blur-sm">
          🔖 {booking_count} booked
        </span>
      </div>

      <Card.Content className="p-5 flex flex-col gap-4">

        
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
            {name}
          </h3>
          <p className="text-sm text-white/40 mt-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        </div>

        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/30 mb-1">Price/hour</p>
            <p className={`text-sm font-bold ${theme.accent}`}>৳{price_per_hour}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-xs text-white/30 mb-1">Capacity</p>
            <p className="text-sm font-bold text-white">{capacity} players</p>
          </div>
        </div>

        
        <div>
          <p className="text-xs text-white/30 mb-2">Available Slots</p>
          <div className="flex flex-wrap gap-1.5">
            {available_slots?.slice(0, 3).map((slot) => (
              <span key={slot} className="text-xs px-2 py-0.5 rounded-lg bg-white/5 text-white/50 border border-white/10">
                {slot}
              </span>
            ))}
            {available_slots?.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-lg bg-white/5 text-white/30 border border-white/10">
                +{available_slots.length - 3} more
              </span>
            )}
          </div>
        </div>

      </Card.Content>

      <Card.Footer className="px-5 pb-5 pt-0">
        <Link href={`/all-facilities/${_id}`}>
            <Button
          
          className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl hover:bg-emerald-500/20 transition-colors"
          variant="flat"
        >
          Book Now
        </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}