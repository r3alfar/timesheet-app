export type Kegiatan = {
  id: string,
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

export const columns = [
  {
    key: 'judul',
    label: 'Judul Kegiatan',
  },
  {
    key: 'project_name',
    label: 'Nama Proyek',
  },
  {
    key: 'start_date',
    label: 'Tanggal Mulai',
  },
  {
    key: 'end_date',
    label: 'Tanggal Berakhir',
  },
  {
    key: 'start_time',
    label: 'Waktu Mulai',
  },
  {
    key: 'end_time',
    label: 'Waktu Berakhir',
  },
  {
    key: 'durasi',
    label: 'Durasi',
  },
]
