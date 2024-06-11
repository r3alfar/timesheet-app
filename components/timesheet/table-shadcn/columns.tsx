import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Kegiatan = {
  id: number,
  judul: string,
  project_name: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  durasi: string,
}

export type KegiatanRaw = {
  id: number,
  judul: string,
  project_name_id: number,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  durasi: string,
}

export type ProyekSelect = {
  id: number,
  nama_proyek: string,
}

const formatDate = (value: string) => {
  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const readableDate = `${day}-${month}-${year}`;
  return readableDate
}

export const columns: ColumnDef<Kegiatan>[] = [
  {
    accessorKey: 'judul',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Kegiatan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("judul")}</div>
  },
  {
    accessorKey: 'project_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Proyek
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("project_name")}</div>
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Mulai
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {

      return <div>{formatDate(row.getValue("start_date"))}</div>
    }
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Berakhir
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("end_date"))}</div>
    }
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Waktu Mulai
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {

      return <div>{row.getValue("start_time")}</div>
    }
  },
  {
    accessorKey: 'end_time',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Waktu Berakhir
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {

      return <div>{row.getValue("end_time")}</div>
    }
  },
  {
    accessorKey: 'durasi',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durasi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {

      return <div>{row.getValue("durasi")}</div>
    }
  },
]
