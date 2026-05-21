"use client";
   import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";

export function DeleteBooking({ booking }) {
    const { name, _id } = booking



const handleDelete = async () => {
  const toastId = toast.loading("Deleting booking...");

  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `/bookings/${_id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Booking deleted successfully!", {
        id: toastId,
      });
    } else {
      toast.error(data?.message || "Failed to delete booking", {
        id: toastId,
      });
    }

    console.log(data);
  } catch (error) {
    console.log(error);

    toast.error("Something went wrong", {
      id: toastId,
    });
  }
};

  return (
    <AlertDialog>
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete this booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}