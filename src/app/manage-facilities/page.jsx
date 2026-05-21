"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { DeleteModal } from "./DeleteModal";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function ManageFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch("https://sportsnest-server.vercel.app/facilities");
        const data = await res.json();
        setFacilities(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
          Manage My Facilities
        </h1>

        <Link href="/add-facilities">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-medium transition whitespace-nowrap">
            + Add New
          </button>
        </Link>
      </div>

     
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-4">Facility Name</th>
              <th className="text-left px-6 py-4">Type</th>
              <th className="text-left px-6 py-4">Location</th>
              <th className="text-left px-6 py-4">Price/Hour</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {facilities.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No facilities found
                </td>
              </tr>
            ) : (
              facilities.map((facility) => (
                <tr
                  key={facility._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 text-gray-700 font-medium">
                    {facility.name}
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                      {facility.facility_type}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-600">{facility.location}</td>
                  <td className="px-6 py-5 text-gray-700 font-medium">
                    ৳{facility.price_per_hour}
                  </td>
                  <td className="px-6 py-5 flex items-center gap-3">
                    <UpdateModal key={facility._id} facility={facility} />
                    <DeleteModal key={facility._id} facility={facility} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      <div className="lg:hidden flex flex-col gap-4">
        {facilities.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No facilities found
          </div>
        ) : (
          facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    {facility.name}
                  </h2>
                  <span className="inline-block mt-1 bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    {facility.facility_type}
                  </span>
                </div>
                <span className="text-gray-700 font-semibold text-sm whitespace-nowrap ml-2">
                  ৳{facility.price_per_hour}/hr
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                📍 {facility.location}
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                <UpdateModal facility={facility} />
                <DeleteModal facility={facility} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}