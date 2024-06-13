import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request) {
  const r = await request.json()
  if (!r) {
    return NextResponse.json("kurang sesuatu", { status: 500 });
  }


  let pengaturan
  if (r && r.id) {
    try {
      await sql`UPDATE pengaturan
        SET 
          username= ${r.username},
          rate = ${r.rate} 
        WHERE
          id = ${r.id}
      ;`;
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    const res = await sql`SELECT * FROM pengaturan;`;
    return NextResponse.json({ res }, { status: 200 });
  } else {
    pengaturan = {
      username: r.username,
      rate: r.rate
    }

    try {
      await sql`INSERT INTO pengaturan (username, rate) 
        VALUES (
          ${pengaturan.username}, 
          ${pengaturan.rate}
        );`;
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    const res = await sql`SELECT * FROM pengaturan;`;
    return NextResponse.json({ res }, { status: 200 });
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

