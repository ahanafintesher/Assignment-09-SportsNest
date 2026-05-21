"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  Card,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { toast } from "react-hot-toast";

const AddFacilitiesPage = () => {
  const { data: session } = authClient.useSession();



const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.currentTarget);

    const facilities = Object.fromEntries(formData.entries());
    facilities.available_slots = formData.getAll("available_slots");

    console.log(facilities);

    const { data: tokenData } = await authClient.token();

    const toastId = toast.loading("Adding facility...");

    const res = await fetch("https://sportsnest-server.vercel.app/facilities", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(facilities),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Facility added successfully!", {
        id: toastId,
      });

      e.target.reset();
    } else {
      toast.error(data?.message || "Failed to add facility", {
        id: toastId,
      });
    }

    console.log(data);
  } catch (error) {
    console.log(error);

    toast.error("Something went wrong");
  }
};
  return (
    <div>
      
      <Card>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 ">
          Add Facilities
        </h1>
        <form className="p-10 space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
            <div className="md:col-span-2">
              <TextField name="name" isRequired>
                <Label>Facility Name</Label>
                <Input
                  placeholder="Mirpur Indoor Stadium"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            
            <div>
              <Select
                name="facility_type"
                isRequired
                className="w-full"
                placeholder="Select facility type"
              >
                <Label>Facility Type</Label>

                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Football" textValue="Football">
                      Football
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="Cricket" textValue="Cricket">
                      Cricket
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="Badminton" textValue="Badminton">
                      Badminton
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="Swimming" textValue="Swimming">
                      Swimming
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="Basketball" textValue="Basketball">
                      Basketball
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="Tennis" textValue="Tennis">
                      Tennis
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

           
            <TextField name="image" isRequired>
              <Label>Image Upload URL</Label>
              <Input
                type="url"
                placeholder="https://i.ibb.co/example.jpg"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

          
            <TextField name="location" isRequired>
              <Label>Location</Label>
              <Input placeholder="Dhaka, Bangladesh" className="rounded-2xl" />
              <FieldError />
            </TextField>

           
            <TextField name="price_per_hour" type="number" isRequired>
              <Label>Price Per Hour</Label>
              <Input type="number" placeholder="1500" className="rounded-2xl" />
              <FieldError />
            </TextField>

           
            <TextField name="capacity" type="number" isRequired>
              <Label>Capacity</Label>
              <Input type="number" placeholder="22" className="rounded-2xl" />
              <FieldError />
            </TextField>

           
            <div className="md:col-span-2">
              <Label className="mb-3 block">Available Time Slots</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="available_slots"
                    value="06:00 AM - 08:00 AM"
                  />
                  06:00 AM - 08:00 AM
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="available_slots"
                    value="08:00 AM - 10:00 AM"
                  />
                  08:00 AM - 10:00 AM
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="available_slots"
                    value="12:00 PM - 02:00 PM"
                  />
                  12:00 PM - 02:00 PM
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="available_slots"
                    value="04:00 PM - 06:00 PM"
                  />
                  04:00 PM - 06:00 PM
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="available_slots"
                    value="08:00 PM - 10:00 PM"
                  />
                  08:00 PM - 10:00 PM
                </label>
              </div>
            </div>

           
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label>Description</Label>

                <TextArea
                  placeholder="Write facility details..."
                  className="rounded-3xl"
                />

                <FieldError />
              </TextField>
            </div>

           
            <TextField name="booking_count">
              <Label>Booking Count</Label>

              <Input type="number" placeholder="0" className="rounded-2xl" />

              <FieldError />
            </TextField>
            
            <div className="md:col-span-2">
              <TextField name="owner_email">
                <Label>Owner Email</Label>

                <Input
                  value={session?.user?.email || ""}
                  isReadOnly
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>
          </div>

         
          <Button
            type="submit"
            variant="outline"
            className="rounded-none w-full bg-green-600 text-white"
          >
            Add Facility
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddFacilitiesPage;
