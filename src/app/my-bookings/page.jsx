"use client";

import { useEffect, useState } from "react";
import { DeleteBooking } from "./DeleteBooking";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBookings = async () => {
    const {data:tokenData} = await authClient.token()
          console.log(tokenData)
    try {
      const res = await fetch("https://sportsnest-server.vercel.app/bookings",{
         headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      });
      const data = await res.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  fetchBookings();
}, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "cancelled":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  if (loading) {
    return (
      <LoadingSpinner></LoadingSpinner>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Bookings
        </h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      {/* ── MOBILE: Card Layout ── */}
      <div className="flex flex-col gap-4 md:hidden">
        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm">
            <p className="text-gray-400 text-base">No bookings found</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <h2 className="text-base font-semibold text-gray-800 leading-tight">
                  {booking.facility_name}
                </h2>
                <span className="shrink-0 bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full whitespace-nowrap">
                  {booking.booking_date}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Time Slot</p>
                  <p className="text-gray-700 font-medium">{booking.time_slot}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Hours</p>
                  <p className="text-gray-700 font-medium">{booking.hours} hr</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Total Price</p>
                  <p className="text-gray-800 font-bold">৳{booking.total_price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Status</p>
                  <span
                    className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusStyle(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                <DeleteBooking  key={booking._id} booking={booking}></DeleteBooking>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── DESKTOP: Table Layout ── */}
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-xl shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">Facility Name</th>
              <th className="text-left px-6 py-4">Booking Date</th>
              <th className="text-left px-6 py-4">Time Slot</th>
              <th className="text-left px-6 py-4">Hours</th>
              <th className="text-left px-6 py-4">Total Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              // ✅ Empty state এখন tbody-র ভেতরে — header সবসময় উপরে থাকবে
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-16 text-gray-400 text-base"
                >
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5 text-gray-800 font-medium">
                    {booking.facility_name}
                  </td>

                  <td className="px-6 py-5">
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                      {booking.booking_date}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-gray-600 whitespace-nowrap">
                    {booking.time_slot}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {booking.hours} hr
                  </td>

                  <td className="px-6 py-5 text-gray-800 font-semibold">
                    ৳{booking.total_price}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusStyle(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <DeleteBooking key={booking._id} booking={booking} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}