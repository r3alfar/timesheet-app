import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const r = await request.json()
  if (!r) {
    return NextResponse.json("kurang sesuatu", { status: 500 });
  }
  const kegiatan = {
    judul: r.judul,
    project_name_id: r.projectName_id,
    start_date: r.start_date,
    end_date: r.end_date,
    start_time: r.start_time,
    end_time: r.end_time,
    durasi: calculateDuration(r.start_time, r.end_time)
  }

  try {
    await sql`INSERT INTO Kegiatan (judul, project_name_id, start_date, end_date, start_time, end_time, durasi) 
      VALUES (
        ${kegiatan.judul}, 
        ${kegiatan.project_name_id},
        ${kegiatan.start_date},
        ${kegiatan.end_date},
        ${kegiatan.start_time},
        ${kegiatan.end_time},
        ${kegiatan.durasi}
      );`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const kegiatans = await sql`SELECT * FROM Kegiatan;`;
  return NextResponse.json({ kegiatans }, { status: 200 });
}

export async function GET() {
  try {
    const kegiatans = await sql`
    SELECT 
      kegiatan.id, kegiatan.judul, kegiatan.start_date, kegiatan.end_date, kegiatan.start_time, kegiatan.end_time, kegiatan.durasi, proyek.nama_proyek AS project_name
    FROM 
      kegiatan
    INNER JOIN proyek ON kegiatan.project_name_id = proyek.id;`;
    const data = kegiatans.rows;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const kid = searchParams.get('id');
  try {
    const response = await sql`
      DELETE FROM kegiatan
      WHERE id = ${kid}
    `
    return NextResponse.json({ response }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

function calculateDuration(start_time: string, end_time: string) {

  const start = start_time.split(":");
  const end = end_time.split(":");
  var startDate = new Date(0, 0, 0, Number(start[0]), Number(start[1]), 0);
  var endDate = new Date(0, 0, 0, Number(end[0]), Number(end[1]), 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);

  // If using time pickers with 24 hours format, add the below line get exact hours
  if (hours < 0)
    hours = hours + 24;

  return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}