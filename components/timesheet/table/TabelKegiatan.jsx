// 'use client'
// import React, { useMemo, useState, useCallback } from 'react'
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner, Input } from "@nextui-org/react";
// import { columns } from './columns';
// import { SearchIcon } from '@/app/demo/SearchIcon';

// export default function TabelKegiatan(data) {
//   // const [isLoading, setIsLoading] = React.useState(true);
//   // const dataa = data.data

//   //sort
//   const [sortDescriptor, setSortDescriptor] = useState({
//     column: "",
//     direction: "",
//   });
//   //pagination
//   const [rowsPerPage, setRowsPerPage] = useState(3);
//   const [page, setPage] = useState(1);
//   //filter
//   const [filterValue, setFilterValue] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const hasSearchFilter = Boolean(filterValue);


//   //sortir per kolom dengan data array
//   const items = data.data;
//   const sortedItems = useMemo(() => {
//     return [...items].sort((a, b) => {
//       const first = a[sortDescriptor.column];
//       const second = b[sortDescriptor.column];
//       const cmp = first < second ? -1 : first > second ? 1 : 0;

//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);


//   //filter search by judul
//   const filteredItems = useMemo(() => {
//     let filteredKegiatan = [...data.data];

//     //check if the search field has a value
//     if (hasSearchFilter) {
//       filteredKegiatan = filteredKegiatan.filter((kegiatan) =>
//         kegiatan.judul.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }

//     return filteredKegiatan
//   }, [data.data, filterValue])

//   const onSearchChange = useCallback((value) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//   const onClear = useCallback(() => {
//     setFilterValue("")
//     setPage(1)
//   }, [])


//   const topContent = useMemo(() => {
//     return (
//       <div className='flex flex-col gap-4'>
//         <div className='flex justify--between gap-3 items-end'>
//           <Input
//             isClearable
//             className='w-full sm:max-w-[44%]'
//             placeholder='search by judul'
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={() => onClear()}
//             onValueChange={onSearchChange}
//           />
//         </div>

//       </div>
//     )
//   }, [filterValue, onSearchChange, hasSearchFilter])


//   return (
//     <Table
//       aria-label="Data Timesheet"
//       classNames={{
//         table: "min-h-[400px]",
//       }}
//       //sort by column
//       sortDescriptor={sortDescriptor}
//       onSortChange={setSortDescriptor}
//       //topCOntent
//       topContent={topContent}
//       topContentPlacement="outside"
//     >
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn
//             key={column.key}
//             allowsSorting={column.sortable}
//           >
//             {column.label}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody
//         emptyContent={"No Data Found!"}
//         items={sortedItems}
//       >
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }

// // export default DaftarKegiatan