"use client"
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { columns } from './table/columns';

export default function DaftarKegiatan() {
  const [isLoading, setIsLoading] = React.useState(true);

  // let list = useAsyncList({
  //   async load({ signal }) {
  //     let res = await fetch('https://swapi.py4e.com/api/people/?search', {
  //       signal,
  //     });
  //     let json = await res.json();
  //     setIsLoading(false);

  //     return {
  //       items: json.results,
  //     };
  //   },
  //   async sort({ items, sortDescriptor }) {
  //     return {
  //       items: items.sort((a, b) => {
  //         let first = a[sortDescriptor.column];
  //         let second = b[sortDescriptor.column];
  //         let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

  //         if (sortDescriptor.direction === "descending") {
  //           cmp *= -1;
  //         }

  //         return cmp;
  //       }),
  //     };
  //   },
  // });

  return (
    <Table
      aria-label="Data Timesheer"
      // sortDescriptor={list.sortDescriptor}
      // onSortChange={list.sort}
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody
      // items={list.items}
      // isLoading={isLoading}
      // loadingContent={<Spinner label="Loading..." />}
      >
        {/* {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )} */}
      </TableBody>
    </Table>
  );
}

// export default DaftarKegiatan