"use client"

import { Label } from '@/components/ui/label';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';


function DeleteButton({ kegiatanId }: { kegiatanId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (productId: number) => {
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/kegiatan?id=${productId}`, { method: "DELETE" })
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };


  function onSubmit() {
    console.log("submit delete")
  }



  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive"><TrashIcon /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Data</DialogTitle>
            <DialogDescription>
              Are you sure to delete data? data can't be retrieved back
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>

            </DialogClose>
            <Button type='submit' variant='destructive' onClick={() => handleDelete(kegiatanId)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteButton