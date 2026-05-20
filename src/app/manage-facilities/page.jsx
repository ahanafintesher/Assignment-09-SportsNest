"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { DeleteModal } from "./DeleteModal";

export default function ManageFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/facilities")
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage My Facilities
        </h1>

        <Link href="/add-facility">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition">
            + Add New
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
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
            {facilities.map((facility) => (
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

                <td className="px-6 py-5 text-gray-600">
                  {facility.location}
                </td>

                <td className="px-6 py-5 text-gray-700 font-medium">
                  ৳{facility.price_per_hour}
                </td>

                <td className="px-6 py-5 flex items-center gap-3">
                 <UpdateModal key={facility._id} facility={facility} ></UpdateModal>

                  <DeleteModal key={facility._id} facility={facility}></DeleteModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {facilities.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No facilities found
          </div>
        )}
      </div>
    </div>
  );
}

