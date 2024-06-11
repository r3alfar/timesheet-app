'use client'
import { Button, DateRangePicker, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TimeInput, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { Pencil1Icon, PlusCircledIcon, ClockIcon } from "@radix-ui/react-icons";
import { any, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast"
import { Kegiatan } from './columns';
import { Input } from '@/components/ui/input';
import { Time, parseTime, parseDate } from '@internationalized/date'

const formSchema = z.object({
  judul: z.string(),
  project_name: z.string(),
  // start_date: z.date(),
  // end_date: z.date(),
  tanggal_pengerjaan: z.any(),
  start_time: z.any(),
  // start_time: z.string(),
  // end_time: z.string(),
  end_time: z.any(),
  durasi: z.string(),
})

function ModalTambah({ data }: { data?: Kegiatan }) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: data?.judul ?? '',
      project_name: data?.project_name ?? '',
      // start_date: data?.start_date ? new Date(data?.start_date) : new Date(),
      tanggal_pengerjaan: data?.end_date ?? {
        start: parseDate("2024-06-06"),
        end: parseDate("2024-06-07"),
      },
      // end_date: data?.end_date ? new Date(data?.end_date) : new Date(),
      // start_time: data?.start_time ?? '',
      start_time: data?.start_time ? parseTime(data.start_time) : new Time(0),
      // end_time: data?.end_time ?? '',
      end_time: data?.end_time ? parseTime(data.end_time) : new Time(0),
      durasi: data?.durasi ?? '',

    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // if (values && values.tanggal_pengerjaan) {
    //   console.log("convert datae: ", values.tanggal_pengerjaan.toString())
    // }

    //manipulate kalender
    if (values && (values.tanggal_pengerjaan)) {
      let tgl = []
      tgl.push(values.tanggal_pengerjaan.start.toString())
      tgl.push(values.tanggal_pengerjaan.end.toString())
      values.tanggal_pengerjaan = JSON.stringify(tgl)
    }

    //manipuilate time value to string
    if (values && (values.start_time || values.end_time)) {
      values.start_time = values.start_time.toString();
      values.end_time = values.end_time.toString();
    }

    console.log("RAW values: ", values)
    console.log("CLICKED SUBMIT")
    console.log(JSON.stringify(values, null, 2))
    toast({
      title: "Submitted values",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();

    // if (values.start_date && values.end_date) {
    //   const start = new Date(values.start_date)
    //   const end = new Date(values.end_date)

    //   if (end <= start) {
    //     console.log("masuk")
    //     toast({
    //       variant: 'destructive',
    //       title: "Invalid End Date!",
    //       description: "Please Make sure Tanggal Berakhir is not lesser than Tanggal Mulai",
    //     })
    //     form.resetField("end_date")
    //   }
    //   else {

    //     const constructedData = {
    //       judul: values.judul,
    //       start_date: values.start_date,
    //       end_date: values.end_date,
    //       start_time: values.start_time,
    //       end_time: values.end_time,
    //       projectName_id: 2
    //     }

    //     // const response = await fetch('http://localhost:3000/api/kegiatan', {
    //     //   method: "POST",
    //     //   body: JSON.stringify(constructedData),
    //     // })

    //     // if (!response.ok) {
    //     //   setError('Failed to POST data');
    //     //   setIsLoading(false)
    //     //   setOpen(false);
    //     // }

    //     console.log(JSON.stringify(values, null, 2))
    //     toast({
    //       title: "Submitted values",
    //       description: (
    //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //         </pre>
    //       ),
    //     })
    //     form.reset();
    //   }
    // }

  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className=''>
      <Button onPress={onOpen} color="secondary">
        <PlusCircledIcon /> Tambah Kegiatan
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='auto'
      >
        <ModalContent className='min-w-[800px]'>
          {
            (onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Tambah Kegiatan</ModalHeader>
                <ModalBody>
                  {/* FORM */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-4 gap-4 mb-2">

                        {/* <FormField
                          name="start_date"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Tanggal Mulai</FormLabel>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}

                        <FormField
                          name="tanggal_pengerjaan"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Tanggal Pengerjaan</FormLabel>
                              <FormControl>
                                <DateRangePicker
                                  aria-label='tanggal_pengerjaan'
                                  isRequired
                                  visibleMonths={2}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="start_time"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="col-span-1">
                              <FormLabel>Jam Mulai</FormLabel>
                              <FormControl>
                                <TimeInput
                                  startContent={(
                                    <ClockIcon className="flex-shrink-0" />
                                  )}
                                  hourCycle={24}
                                  granularity='minute'
                                  aria-label='start_time'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name="end_time"
                          control={form.control}

                          render={({ field }) => (
                            <FormItem className="col-span-1">
                              <FormLabel>Jam Berakhir</FormLabel>
                              <FormControl>
                                <TimeInput
                                  startContent={(
                                    <ClockIcon className="flex-shrink-0" />
                                  )}
                                  hourCycle={24}
                                  granularity='minute'
                                  aria-label='end_time'

                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        name="judul"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-1 mb-4">
                            <FormLabel>Judul Kegiatan</FormLabel>
                            <FormControl>
                              <Input placeholder="proyek.." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="project_name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel>Nama Proyek</FormLabel>
                            <FormControl>
                              <Input placeholder="proyek.." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <div className="flex sm:justify-end my-4 justify-end gap-x-2">
                        <div className="flex justify-end space-x-2">
                          <Button color='danger' variant='ghost' onPress={onClose}>Kembali</Button>
                        </div>
                        <Button type="submit" variant="solid" color='secondary'>Simpan</Button>
                      </div>

                    </form>
                  </Form>
                </ModalBody>
                {/* <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="secondary" >
                    Submit
                  </Button>
                </ModalFooter> */}
              </>
            )
          }

        </ModalContent>
      </Modal>

    </div>
  )
}

export default ModalTambah