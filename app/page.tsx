import { Pengaturan } from "@/components/timesheet/Pengaturan";
import Timesheet from "@/components/timesheet/Timesheet";
import { Kegiatan } from "@/components/timesheet/table-shadcn/columns";

async function getKegiatans(): Promise<Kegiatan[]> {
  const res = await fetch('http://localhost:3000/api/kegiatan', {
    method: "GET"
  })

  const data = await res.json()
  return data.data
}

async function getProfile(): Promise<Pengaturan[]> {
  const res = await fetch('http://localhost:3000/api/pengaturan', {
    method: "GET"
  })

  const data = await res.json()
  return data.data
}

// async function getProyek(): Promise<ProyekSelect[]> {
//   const res = await fetch('http://localhost:3000/api/proyek', { method: "GET" })

//   const data = await res.json()
//   return data.data
// }

export default async function Home() {
  const kegiatans = await getKegiatans();
  const profil = await getProfile();
  return (
    <main className="min-h-screen ">
      <div className="grid grid-rows-1 mt-4 px-6">
        <h1 className="mb-6">Timesheet</h1>
        <Timesheet data={kegiatans} profil={profil} />
      </div>
    </main>
  );
}
