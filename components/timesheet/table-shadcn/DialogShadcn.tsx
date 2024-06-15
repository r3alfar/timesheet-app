'use client'
import React, { useEffect, useState } from 'react'
import { Pencil1Icon, PlusCircledIcon, ClockIcon } from "@radix-ui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast"
import { Kegiatan, KegiatanRaw, ProyekSelect } from './columns';
import { Input } from '@/components/ui/input';
import { Time, parseTime } from '@internationalized/date'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { TimeInput } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
// import { Select as SelectNext, SelectItem as SelectItemNext, TimeInput } from "@nextui-org/react";

const formSchema = z.object({
  judul: z.string(),
  project_name: z.any(),
  tanggal_pengerjaan: z.any(),
  start_time: z.any(),
  end_time: z.any(),
  durasi: z.string(),
})


function DialogShadcn({ data, proyek }: { data?: KegiatanRaw, proyek?: ProyekSelect[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [openz, setOpenz] = useState(false);
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // })

  const [proyeks, setProyeks] = useState<ProyekSelect[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      judul: data?.judul ?? '',
      project_name: data?.proyek?.id ?? '',
      tanggal_pengerjaan: data?.end_date && data?.start_date ? {
        from: new Date(data.start_date),
        to: new Date(data.end_date)
      } : {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 1))
      },
      start_time: data?.start_time ? parseTime(data.start_time) : new Time(0),
      end_time: data?.end_time ? parseTime(data.end_time) : new Time(0),
      durasi: data?.durasi ?? '',

    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    //manipuilate time value to string
    if (values && (values.start_time || values.end_time)) {
      values.start_time = values.start_time.toString().slice(0, -3);
      values.end_time = values.end_time.toString().slice(0, -3);
    }

    //construct request
    const req = {
      judul: values.judul,
      project_name_id: parseInt(values.project_name),
      start_date: values.tanggal_pengerjaan.from,
      end_date: values.tanggal_pengerjaan.to,
      start_time: values.start_time,
      end_time: values.end_time
    }

    // setIsLoading(true);
    if (data && data != null) {
      //UPDATE DATA
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/kegiatan?id=${data?.id}`, { method: "PATCH", body: JSON.stringify(req) })
      }
      catch (error) {
        toast({
          title: "Failed to submit (UPDATE)",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(error, null, 2)}</code>
            </pre>
          ),
        });
      }
    } else {
      //CREATE BARU
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/kegiatan`, { method: "POST", body: JSON.stringify(req) })
      } catch (error) {
        toast({
          title: "Failed to submit (UPDATE)",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(error, null, 2)}</code>
            </pre>
          ),
        });
      }
    }



    // setIsLoading(false);
    // console.log("RAW data: ", data)
    // console.log("CLICKED SUBMIT")
    // console.log(JSON.stringify(req, null, 2))
    toast({
      title: "Submitted values",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    form.reset();
    setOpenz(false);
    router.refresh();



  }

  function onTambah() {
    console.log("button tambah proyek clicked")
    console.log(data)
  }


  useEffect(() => {

    async function getProyek() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/proyek`, { method: "GET" })

      const data = await res.json()
      setProyeks(data.data)
    }

    if (openz && proyeks.length < 1) {
      console.log("fetched data")
      try {
        getProyek()
      } catch (error) {
        console.log("ERROR: ", error)
      }
    }
  }, [openz, proyeks])



  return (
    <Dialog open={openz} onOpenChange={setOpenz}>
      <DialogTrigger asChild>
        {
          data ?
            <Button variant='outline' className="ml-auto">
              <Pencil1Icon className="" />
            </Button>

            :
            <Button variant='outline' className="ml-auto">
              <PlusCircledIcon className="mr-2 h-4 w-4" /> Tambah Kegiatan
            </Button>

        }

      </DialogTrigger>
      <DialogContent className='sm:max-w-md min-w-[800px]'  >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 gap-4 mb-2">

              <FormField
                name="tanggal_pengerjaan"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className='dark:text-blue-500'>Tanggal Pengerjaan</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>

                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field?.value.to}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>

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
                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>

                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Pilih Tipe" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            <Button variant='link' onClick={onTambah}>Tambah Tipe Proyek</Button>
                          </SelectLabel>
                          {
                            proyeks?.map((item, index) => (
                              <SelectItem key={item.id} value={item?.id.toString() ?? ''}>{item.nama_proyek}</SelectItem>
                            ))
                          }
                          {/* <SelectItem key="coba1" value='coba1'>Coba 1</SelectItem>
                          <SelectItem key="coba2" value='coba2'>Coba 2</SelectItem> */}
                        </SelectGroup>

                      </SelectContent>
                    </Select>
                  </FormControl>

                  {/* <FormControl>
                    <SelectNext
                      aria-label='brel'
                      {...field}
                    >
                      <SelectItemNext key="coba1" value="coba1">Coba 1</SelectItemNext>
                      <SelectItemNext key="coba2" value="coba2">Coba 2</SelectItemNext>

                    </SelectNext>
                  </FormControl> */}


                  <FormMessage />
                </FormItem>
              )}
            />




            <div className="flex sm:justify-end my-4 justify-end gap-x-2">
              <div className="flex justify-end space-x-2">
                <Button color='danger' variant='ghost'>Kembali</Button>
              </div>
              <Button type="submit" variant="default" color='secondary'>Simpan</Button>
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogShadcn