import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {

  try {
    const result =
      await sql`CREATE TABLE Proyek ( 
        id SERIAL PRIMARY KEY,
        nama_proyek varchar(255)
      );`;
    // return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json("error create", { status: 500 });
  }

  try {

    await sql`INSERT INTO Proyek (nama_proyek) 
      VALUES ('Aplikasi Website');`;

    await sql`INSERT INTO Proyek (nama_proyek) 
      VALUES ('Desain UI');`;

    await sql`INSERT INTO Proyek (nama_proyek) 
      VALUES ('Asisten Virtual');`;

    await sql`INSERT INTO Proyek (nama_proyek) 
      VALUES ('Desain Logo');`;

    await sql`INSERT INTO Proyek (nama_proyek) 
      VALUES ('Aplikasi Timesheet');`


  } catch (error) {
    return NextResponse.json("error insert", { status: 500 });
  }

  const pets = await sql`SELECT * FROM Proyek;`;
  return NextResponse.json({ pets }, { status: 200 });
}