// import { Pengaturan } from "@/components/timesheet/Pengaturan";
import Timesheet from "@/components/timesheet/Timesheet";
// import { Kegiatan, KegiatanRaw, ProyekSelect } from "@/components/timesheet/table-shadcn/columns";
import { getAllKegiatan, getProfile } from "@/lib/prisma";
// import { sql } from '@vercel/postgres';
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// async function getKegiatans(): Promise<Kegiatan[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/kegiatan`, {
//     method: "GET"
//   })

//   const data = await res.json()
//   return data.data
// }

// async function getKegiatans(): Promise<KegiatanRaw[]> {
//   try {
//     const kegiatans = await prisma.kegiatan.findMany({
//       relationLoadStrategy: 'join',
//       include: {
//         proyek: true,
//       }
//     });
//     return kegiatans
//   } catch (error) {
//     console.log("ERRRO: ", JSON.stringify(error, null, 2))
//     throw (error)
//   }
// }

// async function getProfile(): Promise<Pengaturan[]> {
//   try {
//     const profiles = await prisma.pengaturan.findMany()
//     return profiles
//   } catch (error) {
//     console.log("ERRRO: ", JSON.stringify(error, null, 2))
//     throw (error)
//   }
// }

// async function getProfile(): Promise<Pengaturan[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/pengaturan`, {
//     method: "GET"
//   })

//   const data = await res.json()
//   return data.data
// }

// async function getProyek(): Promise<ProyekSelect[]> {
//   try {
//     const proyeks = await prisma.proyek.findMany()
//     // const proj = await proyeks.json()

//     return proyeks;
//     // return NextResponse.json({ data }, { status: 200 });
//   } catch (error) {
//     console.log("ERRRO: ", JSON.stringify(error, null, 2));
//     throw (error)
//     // return NextResponse.json({ error }, { status: 500 })
//   }
//   // const res = await fetch('http://localhost:3000/api/proyek', { method: "GET" })

//   // const data = await res.json()
//   // return data.data
// }

export default async function Home() {
  // const kegiatans = await getKegiatans();
  // const profil = await getProfile();
  // const project = await getProyek();
  // const kegiatans = await getAllKegiatan()
  // const profil = await getProfile()

  const [kegiatans, profil] = await Promise.all([getAllKegiatan(), getProfile()])

  // console.log("PROJECT: ", project)
  // console.log("KEGIATANS: ", kegiatans);
  // console.log("PENGARUAN: ", profil)
  return (
    <main className="min-h-screen ">
      <div className="grid grid-rows-1 mt-4 px-6">
        <h1 className="mb-6">Timesheet</h1>
        <Timesheet data={kegiatans} profil={profil} />
      </div>
    </main>
  );
}
