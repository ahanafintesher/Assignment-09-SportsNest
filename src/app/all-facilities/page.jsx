"use client";

import { useEffect, useState } from "react";
import AllFacilityCard from "./FacilitiesCard";


const SPORT_TYPES = [
  "All",
  "Football",
  "Cricket",
  "Badminton",
  "Swimming",
  "Table Tennis",
  "Carrom",
];

export default function AllFacilitiesSection() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  // Fetch facilities from backend with search + filter
  useEffect(() => {
    setLoading(true);

  

    fetch(`http://localhost:5000/facilities/?search=${search}&type=${activeType}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setFacilities(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [search, activeType]);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-600 mb-2">
            Explore
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            All <span className="text-emerald-500">Facilities</span>
          </h1>

          <p className="mt-2 text-gray-500 text-base max-w-lg">
            Browse all available sports venues and book your preferred slot instantly.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">

          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by facility name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {SPORT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`text-sm px-4 py-2 rounded-xl font-medium border transition-all ${
                  activeType === type
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Result Count */}
        {!loading && !error && (
          <p className="text-sm text-gray-400 mb-6">
            Showing{" "}
            <span className="font-semibold text-gray-600">
              {facilities.length}
            </span>{" "}
            facilities
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            Loading facilities...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20 text-red-500">
            Failed to load facilities
          </div>
        )}

        {/* Empty */}
        {!loading && !error && facilities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-gray-700">
              No facilities found
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveType("All");
              }}
              className="mt-4 text-emerald-600 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && facilities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <AllFacilityCard
                key={facility._id}
                facility={facility}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}