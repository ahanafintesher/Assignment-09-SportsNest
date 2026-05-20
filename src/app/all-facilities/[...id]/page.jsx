'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from '@heroui/react';

const HOURS = [1, 2, 3, 4, 5, 6];

const DetailsPage = ({ params }) => {
  const [facility, setFacility] = useState(null);
  const [hours, setHours] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchFacility = async () => {
      const { id } = await params;
      const res = await fetch(`http://localhost:5000/facilities/${id}`);
      const data = await res.json();
      setFacility(data);
    };
    fetchFacility();
  }, [params]);

  const handleHoursChange = (val) => {
    setHours(val);
    if (val && facility?.price_per_hour) {
      setTotalPrice(Number(val) * Number(facility.price_per_hour));
    } else {
      setTotalPrice(0);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const booking = Object.fromEntries(formData.entries());
    booking.total_price = totalPrice;
    console.log(booking);

    const res = await fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking),
    });
    const data = await res.json();
    console.log(data);
  };

  if (!facility) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  const {
    image, name, facility_type, booking_count,
    location, price_per_hour, capacity, description,
  } = facility;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Facility Info Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="relative w-full h-64 bg-gray-100">
            <Image src={image} alt={name} fill className="object-cover" />
            <span className="absolute top-4 left-4 bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-gray-200">
              {facility_type}
            </span>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M12 21c-4.418-4.03-7-7.582-7-10.5a7 7 0 1 1 14 0C19 13.418 16.418 16.97 12 21z" />
                  <circle cx="12" cy="10.5" r="2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
                </svg>
                {location}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatCard
                icon={<svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4-1.343 4-3-1.79-3-4-3zM3 17c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>}
                label="Capacity" value={capacity}
              />
              <StatCard
                icon={<svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" /></svg>}
                label="Bookings" value={booking_count}
              />
              <StatCard
                icon={<svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 8v1m0-10V3m0 18v-1" /></svg>}
                label="Per Hour" value={`$${price_per_hour}`}
              />
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">About</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <Card>
          <form className="p-8 space-y-6" onSubmit={onSubmit}>
            <h2 className="text-base font-semibold text-gray-800">Book This Facility</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Facility Name */}
              <div className="md:col-span-2">
                <TextField name="facility_name" isRequired>
                  <Label>Facility Name</Label>
                  <Input value={name} isReadOnly className="rounded-2xl bg-gray-50" />
                  <FieldError />
                </TextField>
              </div>

              {/* Booking Date */}
              <div className="md:col-span-2">
                <TextField name="booking_date" type="date" isRequired>
                  <Label>Booking Date</Label>
                  <Input type="date" className="rounded-2xl" />
                  <FieldError />
                </TextField>
              </div>

              {/* Time Slot */}
              <Select
                name="time_slot"
                isRequired
                className="w-full"
                placeholder="Select a time slot"
              >
                <Label>Time Slot</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {['06:00 AM - 08:00 AM', '08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM',
                      '12:00 PM - 02:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM',
                      '06:00 PM - 08:00 PM', '08:00 PM - 10:00 PM'].map((slot) => (
                      <ListBox.Item key={slot} id={slot} textValue={slot}>
                        {slot}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Hours */}
              <Select
                name="hours"
                isRequired
                className="w-full"
                placeholder="Select hours"
                onSelectionChange={(val) => handleHoursChange(val)}
              >
                <Label>Hours</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {HOURS.map((h) => (
                      <ListBox.Item key={String(h)} id={String(h)} textValue={`${h} ${h === 1 ? 'hour' : 'hours'}`}>
                        {h} {h === 1 ? 'hour' : 'hours'}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Total Price */}
              <div className="md:col-span-2">
                <TextField name="total_price">
                  <Label>Total Price</Label>
                  <Input
                    value={totalPrice > 0 ? `$${totalPrice}` : '—'}
                    isReadOnly
                    className="rounded-2xl bg-gray-50 font-semibold"
                  />
                </TextField>
              </div>

            </div>

            <Button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 text-white font-medium"
            >
              Confirm Booking
            </Button>
          </form>
        </Card>

      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-100">
      {icon}
    </div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800">{value}</p>
  </div>
);

export default DetailsPage;