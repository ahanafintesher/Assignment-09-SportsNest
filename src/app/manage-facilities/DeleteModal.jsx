"use client";

import {AlertDialog, Button} from "@heroui/react";

export function DeleteModal({ facility }) {
    const { name, _id } = facility

    const handleDelete = async() =>{
        const res = await fetch(`http://localhost:5000/facilities/${_id}`,{
            method:'DELETE',
            headers:{
                'content-type': 'application/json'
            }
        })
        const data = await res.json();
        console.log(data)
    }
  return (
    <AlertDialog>
      <Button variant="danger">Delete Facility</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
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