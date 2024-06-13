"use client"
import { Tab, Tabs } from '@nextui-org/react'
import { Pengaturan } from './Pengaturan'
import { Kegiatan } from './table-shadcn/columns'
import TableShadcn from './table-shadcn/TableShadcn'
import { Label } from '../ui/label'
import { ProyekSelect } from './table-shadcn/columns'

function formattedMenuTab(tab: any) {
  return tab
    .replace('_', ' ')
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Timesheet({ data, profil, proyek }: { data: Kegiatan[], profil: Pengaturan[], proyek?: ProyekSelect[] }) {

  const tabList = [
    "daftar_kegiatan",
    "pengaturan"
  ]
  // const [selectedTab, setSelectedTab] = useState('daftar_kegiatan')
  return (
    <>
      <Tabs
        variant='underlined'
      >
        <Tab key="daftar_kegiatan" title="Daftar Kegiatan" className='my-2 dark:text-white'>
          {/* <TabelKegiatan data={data} /> */}
          {/* <p>Daftar Kegiatan</p> */}
          <div className='w-full flex flex-row'>
            <div className='flex-1 items-center'>
              <Label>Nama Karyawan</Label>
              <p>{profil[0].username}</p>

            </div>
            <div className='flex-1 items-center'>
              <Label>Rate</Label>
              <p>{profil[0].rate}</p>

            </div>


          </div>
          <div className='flex items-center mt-4'>
            <h1 className='pt-4 font-bold w-[150px]'>Daftar Kegiatan</h1>
          </div>
          <TableShadcn data={data} />
        </Tab>
        <Tab key="pengaturan" title="Pengaturan">
          {/* <Pengaturan /> */}
        </Tab>
      </Tabs>
    </>
  )
}

