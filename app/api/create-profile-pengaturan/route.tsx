import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {

  try {
    const result =
      await sql`CREATE TABLE pengaturan ( 
        id SERIAL PRIMARY KEY,
        username varchar(255),
        rate int
      );`;
    // return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json("error create", { status: 500 });
  }

  try {

    await sql`INSERT INTO pengaturan (username, rate) 
      VALUES ('Akun Demo', 50000);`;


  } catch (error) {
    return NextResponse.json("error insert", { status: 500 });
  }

  const pets = await sql`SELECT * FROM pengaturan;`;
  return NextResponse.json({ pets }, { status: 200 });
}