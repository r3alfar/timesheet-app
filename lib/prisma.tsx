import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient()
const prisma = new PrismaClient();

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

export async function getAllKegiatan() {
  try {
    const kegiatans = await prisma.kegiatan.findMany({
      relationLoadStrategy: 'join',
      include: {
        proyek: true,
      }
    });
    return kegiatans
  } catch (error) {
    // console.log("ERRRO: ", JSON.stringify(error, null, 2))
    throw (error)
  }
}

export async function getProfile() {
  try {
    const profiles = await prisma.pengaturan.findMany()
    return profiles
  } catch (error) {
    // console.log("ERRRO: ", JSON.stringify(error, null, 2))
    throw (error)
  }
}

export async function getAllProyek() {
  try {
    const proyeks = await prisma.proyek.findMany()

    return proyeks;
  } catch (error) {
    throw (error)
  }
}