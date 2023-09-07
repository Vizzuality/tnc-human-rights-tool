"use client";

import Link from "next/link";

import { CaretSortIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance, subDays } from "date-fns";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
    minSize: 400,
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
          {row.getValue("status")}
        </span>
      );
    },
  },
  {
    accessorKey: "dateUpdated",
    maxSize: 100,
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
  {
    id: "actions",
    maxSize: 100,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/projects/${row.original.id}`}>
                <Button variant="outline" size="icon" className="items-center">
                  <Pencil1Icon className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>

            <TooltipContent sideOffset={4} alignOffset={0}>
              Edit project
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <AlertDialog>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon" className="items-center">
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>

              <TooltipContent side="top" sideOffset={4} align="center">
                Delete project
              </TooltipContent>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your project
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Tooltip>
        </div>
      );
    },
  },
];
