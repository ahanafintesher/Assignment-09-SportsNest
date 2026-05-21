"use client";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";

export function DeleteModal({ facility }) {
    const { name, _id } = facility

   

const handleDelete = async () => {
  const toastId = toast.loading("Deleting facility...");

  try {
    const { data: tokenData } = await authClient.token();

    console.log(tokenData);

    const res = await fetch(
      `https://sportsnest-server.vercel.app/facilities/${_id}`,
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
      toast.success("Facility deleted successfully!", {
        id: toastId,
      });
    } else {
      toast.error(data?.message || "Failed to delete facility", {
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
      <Button variant="danger">Delete Facility</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete this facility permanently?</AlertDialog.Heading>
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
                Delete Facility
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}