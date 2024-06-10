"use client"
import { Tab, Tabs, select } from '@nextui-org/react'
import React, { useState } from 'react'
import DaftarKegiatan from './DaftarKegiatan'
import Pengaturan from './Pengaturan'

function formattedMenuTab(tab: any) {
  return tab
    .replace('_', ' ')
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function Timesheet() {

  const tabList = [
    "daftar_kegiatan",
    "pengaturan"
  ]
  const [selectedTab, setSelectedTab] = useState('daftar_kegiatan')
  return (
    <>
      <Tabs
        variant='underlined'
      // selectedKey={selectedTab}
      // onSelectionChange={setSelectedTab}
      >
        {/* {
          tabList.map((t, index) => (
            <Tab key={t} title={formattedMenuTab(t)} />
          ))
        } */}
        <Tab key={tabList[0]} title="Daftar Kegiatan">
          <DaftarKegiatan />
        </Tab>
        <Tab key={tabList[1]} title="Pengaturan">
          <Pengaturan />
        </Tab>
      </Tabs>
      {/* {
        selectedTab === 'daftar_kegiatan' ?
          <DaftarKegiatan />
          : selectedTab === 'pengaturan' ?
            <Pengaturan />
            : null
      } */}
    </>
  )
}

