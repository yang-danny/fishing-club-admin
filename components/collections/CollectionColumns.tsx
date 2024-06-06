"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { Pencil } from 'lucide-react';
export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p>{row.original.title}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
    <div className="flex justify-start items-center ">
         <Link
        href={`/collections/${row.original._id}`}
        className="bg-green-500 text-white w-14 h-10 px-4 py-2 rounded-md mr-2"
      >
        <Pencil/>
      </Link>
    <Delete item="collections" id={row.original._id} />
    </div>
  ),
   
  },
];