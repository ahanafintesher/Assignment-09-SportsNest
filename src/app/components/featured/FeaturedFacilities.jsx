"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";

const FEATURED = [
  {
    id: 1,
    name: "Cricket Ground",
    type: "Cricket",
    emoji: "🏏",
    location: "Mirpur, Dhaka",
    price: 1200,
    capacity: 22,
    slots: ["6:00 AM", "9:00 AM", "3:00 PM", "6:00 PM"],
  },
  {
    id: 2,
    name: "Football Turf",
    type: "Football",
    emoji: "⚽",
    location: "Uttara, Dhaka",
    price: 800,
    capacity: 14,
    slots: ["7:00 AM", "10:00 AM", "4:00 PM", "7:00 PM"],
  },
  {
    id: 3,
    name: "Carrom Room",
    type: "Carrom",
    emoji: "🎯",
    location: "Dhanmondi, Dhaka",
    price: 300,
    capacity: 4,
    slots: ["8:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"],
  },
  {
    id: 4,
    name: "Table Tennis Hall",
    type: "Table Tennis",
    emoji: "🏓",
    location: "Gulshan, Dhaka",
    price: 500,
    capacity: 4,
    slots: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
  },
];

export default function FeaturedFacilities() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-600 mb-3">
              Top Picks
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Featured
              <span className="text-green-600">
                {" "}Facilities
              </span>
            </h2>

            <p className="mt-3 text-gray-500 text-base max-w-md">
              Hand-picked venues ready for your next game. Book instantly, play today.
            </p>
          </div>

          <Button
            as={Link}
            href="/facilities"
            variant="bordered"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl shrink-0 transition-all"
          >
            View All →
          </Button>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((facility) => (
            <Card
              key={facility.id}
              className="
                bg-white border border-green-100
                rounded-2xl transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl
                hover:border-green-600/40 group
              "
            >
              <Card.Content className="p-6 flex flex-col gap-5">

                {/* Icon + badge */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl border border-green-200">
                    {facility.emoji}
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                    {facility.type}
                  </span>
                </div>

                {/* Name & location */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {facility.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    {facility.location}
                  </p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Price/hour
                    </p>

                    <p className="text-sm font-bold text-green-600">
                      ৳{facility.price}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      Capacity
                    </p>

                    <p className="text-sm font-bold text-gray-900">
                      {facility.capacity} players
                    </p>
                  </div>
                </div>

                {/* Time slots */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    Available Slots
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {facility.slots.map((slot) => (
                      <span
                        key={slot}
                        className="text-xs px-2 py-0.5 rounded-lg bg-green-50 text-green-700 border border-green-100"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

              </Card.Content>

              <Card.Footer className="px-6 pb-6 pt-0">
                <Button
                  as={Link}
                  href={`/facility/${facility.id}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all"
                >
                  Book Now
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}