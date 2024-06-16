import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request) {
  const r = await request.json()
  if (!r) {
    return NextResponse.json("kurang sesuatu", { status: 500 });
  }

  const proyek = {
    nama_proyek: r.nama_proyek
  }

  try {
    const upProyek = await prisma.proyek.create({ data: proyek })
    return NextResponse.json(upProyek, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }



}

// export async function GET() {
//   try {
//     const pengaturans = await sql`
//     SELECT * FROM proyek
//     ;`;
//     const data = pengaturans.rows;
//     return NextResponse.json({ data }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }

// }

export async function GET() {
  try {
    const data = await prisma.proyek.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const kid = searchParams.get('id');
//   try {
//     const response = await sql`
//       DELETE FROM kegiatan
//       WHERE id = ${kid}
//     `
//     return NextResponse.json({ response }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }
// }

