"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { Pencil } from 'lucide-react';
export const columns: ColumnDef<EventType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p>{row.original.title}</p>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <p>{row.original.date}</p>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <p>{row.original.time}</p>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <p>{row.original.location}</p>,
  },
  {
    accessorKey: "funder",
    header: "Funded By",
    cell: ({ row }) => <p>{row.original.funder}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => <p>{row.original.createdAt.toString().slice(0,10)}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
    <div className="flex justify-start items-center ">
         <Link
        href={`/events/${row.original._id}`}
        className="bg-green-500 text-white w-14 h-10 px-4 py-2 rounded-md mr-2"
      >
        <Pencil/>
      </Link>
    <Delete item="events" id={row.original._id} />
    </div>
  ),
   
  },
];