"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { Pencil } from 'lucide-react';
export const columns: ColumnDef<PublishNewsType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p>{row.original.title}</p>,
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => <p>{row.original.author}</p>,
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
    cell: ({ row }) => <p>{row.original.publisher}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Publish Date",
    cell: ({ row }) => <p>{row.original.createdAt.toString().slice(0,10)}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
    <div className="flex justify-start items-center ">
         <Link
        href={`/publishNews/${row.original._id}`}
        className="bg-green-500 text-white w-14 h-10 px-4 py-2 rounded-md mr-2"
      >
        <Pencil/>
      </Link>
    <Delete item="publishNews" id={row.original._id} />
    </div>
  ),
   
  },
];