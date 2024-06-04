"use client";

import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import {
  ContextualRiskCategoryListResponseDataItem,
  PcbCategoryListResponseDataItem,
} from "@/types/generated/strapi.schemas";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    row?: TData;
    pcbCategories?: PcbCategoryListResponseDataItem[];
    contextualRiskCategories?: ContextualRiskCategoryListResponseDataItem[];
  }
}
interface ProjectsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching?: boolean;
}

export function ProjectsTable<TData, TValue>({ columns, data }: ProjectsTableProps<TData, TValue>) {
  const t = useTranslations();
  const queryPcbCategories = useGetPcbCategories({
    sort: "display_order:asc",
    locale: "all",
  });
  const { data: pcbCategoriesData } = useGetLocalizedList(queryPcbCategories);

  const queryContextualRiskCategories = useGetContextualRiskCategories({
    sort: "display_order:asc",
    locale: "all",
  });
  const { data: contextualRiskCategoriesData } = useGetLocalizedList(queryContextualRiskCategories);

  const table = useReactTable({
    data,
    meta: {
      pcbCategories: pcbCategoriesData?.data,
      contextualRiskCategories: contextualRiskCategoriesData?.data,
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "updatedAt",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="py-2.5"
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t("no_results")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
