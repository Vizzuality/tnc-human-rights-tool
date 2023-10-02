"use client";

import Link from "next/link";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";

import { getStatus } from "@/lib/status";

import { ProjectListResponseDataItem } from "@/types/generated/strapi.schemas";
import { PCBs, Risks } from "@/types/project";

import ProjectsActions from "@/containers/projects/list/actions";

import { Button } from "@/components/ui/button";

const STATUS = {
  1: "Pending",
  2: "Pending",
  3: "Pending",
  4: "Pending",
  5: "Completed",
};

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
    accessorFn: (row) => {
      return getStatus({
        pcbs: row?.attributes?.pcbs as PCBs,
        risks: row?.attributes?.risks as Risks,
      });
    },
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
      const state = getStatus({
        pcbs: row?.original?.attributes?.pcbs as PCBs,
        risks: row?.original?.attributes?.risks as Risks,
      });

      return (
        <span
          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            STATUS[state] === "Completed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {/* {row.getValue("status")} */}
          {STATUS[state]}
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
