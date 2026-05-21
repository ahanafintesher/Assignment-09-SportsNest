"use client";

import { authClient } from "@/lib/auth-client";
import { Pencil } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import {
  Button,
  Select,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextField,
  TextArea,
} from "@heroui/react";

const slots = [
  "06:00 AM - 08:00 AM",
  "08:00 AM - 10:00 AM",
  "12:00 PM - 02:00 PM",
  "04:00 PM - 06:00 PM",
  "08:00 PM - 10:00 PM",
];

const facilityTypes = [
  "Football",
  "Cricket",
  "Badminton",
  "Swimming",
  "Basketball",
  "Tennis",
  "Gym",
];

export function UpdateModal({ facility }) {
  const { name, facility_type, booking_count, location, price_per_hour, capacity, description, _id } = facility;
  const { data: session } = authClient.useSession();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const facilities = Object.fromEntries(formData.entries());
    facilities.available_slots = formData.getAll("available_slots");

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    try {
      const promise = fetch(`https://sportsnest-server.vercel.app/facilities/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(facilities),
      });

      toast.promise(promise, {
        loading: "Updating facility...",
        success: "Facility updated successfully!",
        error: "Failed to update facility",
      });

      const res = await promise;
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className="rounded-xl border border-default-200 hover:bg-default-100"
      >
        <Pencil className="size-4" />
        Edit Facility
      </Button>

      {/* Modal */}
      <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-4xl rounded-3xl overflow-hidden border border-default-200 bg-background shadow-2xl">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="border-b border-default-100 px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Pencil className="size-5" />
                </div>
                <div>
                  <Modal.Heading className="text-2xl font-bold">
                    Edit Facility
                  </Modal.Heading>
                  <p className="text-sm text-default-500 mt-1">
                    Update your sports facility information.
                  </p>
                </div>
              </div>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="max-h-[80vh] overflow-y-auto bg-default-50/40">
              <Surface
                variant="default"
                className="rounded-none bg-transparent shadow-none"
              >
                <form id="update-facility-form" className="space-y-8 p-8" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Facility Name */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={name} name="name" isRequired>
                        <Label>Facility Name</Label>
                        <Input
                          placeholder="Mirpur Indoor Stadium"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Facility Type */}
                    <div>
                      <Select
                        defaultValue={facility_type}
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
                            {facilityTypes.map((type) => (
                              <ListBox.Item key={type} id={type} textValue={type}>
                                {type}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Image URL */}
                    <TextField name="image" isRequired>
                      <Label>Image URL</Label>
                      <Input
                        type="url"
                        placeholder="https://i.ibb.co/example.jpg"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Location */}
                    <TextField defaultValue={location} name="location" isRequired>
                      <Label>Location</Label>
                      <Input
                        placeholder="Dhaka, Bangladesh"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Price */}
                    <TextField defaultValue={price_per_hour} name="price_per_hour" type="number" isRequired>
                      <Label>Price Per Hour (৳)</Label>
                      <Input
                        type="number"
                        placeholder="1500"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Capacity */}
                    <TextField defaultValue={capacity} name="capacity" type="number" isRequired>
                      <Label>Capacity</Label>
                      <Input
                        type="number"
                        placeholder="22"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Slots */}
                    <div className="md:col-span-2">
                      <Label className="mb-4 block text-sm font-medium">
                        Available Time Slots
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {slots.map((slot) => (
                          <label
                            key={slot}
                            className="flex items-center gap-3 rounded-2xl border border-default-200 bg-white px-4 py-3 transition hover:border-green-500 hover:bg-green-50"
                          >
                            <input
                              type="checkbox"
                              name="available_slots"
                              value={slot}
                              className="accent-green-600"
                            />
                            <span className="text-sm">{slot}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={description} name="description" isRequired>
                        <Label>Description</Label>
                        <TextArea
                          placeholder="Write facility details..."
                          className="rounded-3xl min-h-[140px]"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Booking Count */}
                    <TextField defaultValue={booking_count} name="booking_count">
                      <Label>Booking Count</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    {/* Owner Email */}
                    <div className="md:col-span-2">
                      <TextField name="owner_email">
                        <Label>Owner Email</Label>
                        <Input
                          value={session?.user?.email || ""}
                          isReadOnly
                          className="rounded-2xl bg-default-100"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>
                </form>
              </Surface>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="border-t border-default-100 px-8 py-5">
              <div className="flex w-full justify-end gap-3">
                <Button
                  slot="close"
                  variant="secondary"
                  className="rounded-xl"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="update-facility-form"
                  className="rounded-xl bg-green-600 text-white hover:bg-green-700"
                >
                  Update Facility
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}