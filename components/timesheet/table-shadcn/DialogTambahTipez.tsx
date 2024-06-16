"use client"
import React, { SyntheticEvent, useState } from 'react'
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
import { Label } from "@/components/ui/label"

interface ChildProps {
  onActiveStatusChange: (data: boolean) => void
}

function DialogTambahTipez({ onActiveStatusChange }: ChildProps) {
  const [nama, setNama] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log("submitted: ", nama)

    const req = {
      nama_proyek: nama
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/proyek`, { method: "POST", body: JSON.stringify(req) })
      onActiveStatusChange(true)
      console.log("sukses submit proyek baru")
    } catch (error) {
      console.log("ERROR: ", error)
    }
    setIsOpen(false)
  }
  return (
    <div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="link">Tambah Tipe Proyek</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}></form>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Nama Proyek</Label>
            <Input
              type='text'
              id="nama_proyek"
              placeholder="nama proyek.."
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type='submit' variant="default" onClick={onSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogTambahTipez