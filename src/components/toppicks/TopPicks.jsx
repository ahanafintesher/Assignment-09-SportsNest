"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";

const TOP_PICKS = [
  {
    id: 1,
    name: "Cricket Ground",
    type: "Cricket",
    emoji: "🏏",
    location: "Mirpur, Dhaka",
    price: 1200,
    capacity: 22,
    rating: "4.9",
  },
  {
    id: 2,
    name: "Football Turf",
    type: "Football",
    emoji: "⚽",
    location: "Uttara, Dhaka",
    price: 800,
    capacity: 14,
    rating: "4.8",
  },
  {
    id: 3,
    name: "Carrom Room",
    type: "Carrom",
    emoji: "🎯",
    location: "Dhanmondi, Dhaka",
    price: 300,
    capacity: 4,
    rating: "4.7",
  },
  {
    id: 4,
    name: "Table Tennis Hall",
    type: "Table Tennis",
    emoji: "🏓",
    location: "Gulshan, Dhaka",
    price: 500,
    capacity: 4,
    rating: "4.9",
  },
];

export default function TopPicks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

       
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-600 mb-3">
              Most Popular
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Top
              <span className="text-green-600"> Picks</span>
            </h2>

            <p className="mt-3 text-gray-500 text-base max-w-md">
              Discover the most booked and highest-rated sports facilities near you.
            </p>
          </div>

          
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_PICKS.map((facility) => (
            <Card
              key={facility.id}
              className="
                border border-green-100
                rounded-3xl overflow-hidden
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
                group
              "
            >

              
              <div className="bg-green-50 p-6 border-b border-green-100">
                <div className="flex items-center justify-between">

                  <div className="w-16 h-16 rounded-2xl bg-white border border-green-200 flex items-center justify-center text-4xl shadow-sm">
                    {facility.emoji}
                  </div>

                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-green-100">
                    <span>⭐</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {facility.rating}
                    </span>
                  </div>

                </div>
              </div>

              
              <Card.Content className="p-6 flex flex-col gap-5">

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                      {facility.type}
                    </span>

                    <span className="text-sm font-bold text-green-600">
                      ৳{facility.price}/hr
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {facility.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    📍 {facility.location}
                  </p>
                </div>

                {/* Extra Info */}
                <div className="flex items-center justify-between bg-green-50 rounded-2xl px-4 py-3">
                  <div>
                    <p className="text-xs text-gray-500">
                      Capacity
                    </p>

                    <p className="font-bold text-gray-900">
                      {facility.capacity} Players
                    </p>
                  </div>

                  <div className="w-px h-10 bg-green-100" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Status
                    </p>

                    <p className="font-bold text-green-600">
                      Available
                    </p>
                  </div>
                </div>

              </Card.Content>

             
              <Card.Footer className="px-6 pb-6 pt-0">
                <Link href={'/all-facilities'}>
                  <Button
                 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl h-11"
                >
                  Book Facility
                </Button>
                </Link>
              </Card.Footer>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}