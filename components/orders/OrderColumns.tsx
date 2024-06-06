"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil } from 'lucide-react';
export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => <p>{row.original._id}</p>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
    <div className="flex justify-start items-center ">
         <Link
        href={`/orders/${row.original._id}`}
        className="bg-green-500 text-white w-14 h-10 px-4 py-2 rounded-md mr-2"
      >
        <Pencil/>
      </Link>
    </div>
  ),
   
  },
];