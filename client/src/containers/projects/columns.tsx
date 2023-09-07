"use client";

import Link from "next/link";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance, subDays } from "date-fns";

import { Button } from "@/components/ui/button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: number;
  name: string;
  status: "pending" | "completed";
  dateUpdated: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Project</span>
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/projects/${row.original.id}`}>
          <Button variant="link">{row.getValue("name")}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Progress</span>
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span
          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.getValue("status") === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.getValue("status")}
        </span>
      );
    },
  },
  {
    accessorKey: "dateUpdated",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Last Updated</span>
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const date = formatDistance(subDays(new Date(row.getValue("dateUpdated")), 3), new Date(), {
        addSuffix: true,
      });

      return <span className="ml-4">{date}</span>;
    },
  },
];
