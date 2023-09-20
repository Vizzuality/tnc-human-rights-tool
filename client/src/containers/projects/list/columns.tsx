"use client";

import Link from "next/link";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";

import { ProjectListResponseDataItem } from "@/types/generated/strapi.schemas";

import ProjectsActions from "@/containers/projects/list/actions";

import { Button } from "@/components/ui/button";

export const columns: ColumnDef<ProjectListResponseDataItem>[] = [
  {
    id: "name",
    accessorFn: (row) => row?.attributes?.name,
    minSize: 1000,
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
        <Link href={`/projects/${row?.original?.id}`}>
          <Button variant="link">{row?.original?.attributes?.name}</Button>
        </Link>
      );
    },
  },
  {
    id: "status",
    maxSize: 100,
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
          {/* {row.getValue("status")} */}
          Pending
        </span>
      );
    },
  },
  {
    id: "updatedAt",
    accessorFn: (row) => row?.attributes?.updatedAt,
    minSize: 250,
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
      if (!row?.original?.attributes?.updatedAt) return "-";

      const date = formatDistance(new Date(row?.original?.attributes?.updatedAt), new Date(), {
        addSuffix: true,
      });

      return <span className="ml-4">{date}</span>;
    },
  },
  {
    id: "actions",
    maxSize: 0,
    cell: (props) => {
      return <ProjectsActions {...props} />;
    },
  },
];
