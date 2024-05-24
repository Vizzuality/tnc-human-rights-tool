"use client";

import { useMemo } from "react";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { CellContext, Column, ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { useLocale, useTranslations } from "next-intl";

import { useGetLocalizedList } from "@/lib/locallizedQuery";
import { getProgress, getStatus } from "@/lib/status";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import { ProjectListResponseDataItem } from "@/types/generated/strapi.schemas";
import { PCBs, Risks } from "@/types/project";

import { LOCALES } from "@/constants/navigation";

import ProjectsActions from "@/containers/projects/list/actions";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n";

export function Header<T>({ column, tid }: { column: Column<T, unknown>; tid: string }) {
  const t = useTranslations();

  return (
    <Button
      variant="ghost"
      className="items-center"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <span>{t(tid)}</span>
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function CellLastUpdated({ row }: CellContext<ProjectListResponseDataItem, unknown>) {
  const locale = useLocale() as keyof typeof LOCALES;
  if (!row?.original?.attributes?.updatedAt) return "-";

  const l = LOCALES[locale];

  const date = formatDistance(new Date(row?.original?.attributes?.updatedAt), new Date(), {
    addSuffix: true,
    locale: l.dateFns,
  });

  return <span className="ml-4">{date}</span>;
}

export function useColumns(): ColumnDef<ProjectListResponseDataItem>[] {
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

  const c = useMemo<ColumnDef<ProjectListResponseDataItem>[]>(() => {
    return [
      {
        id: "name",
        accessorFn: (row) => row?.attributes?.name,
        minSize: 1000,
        header: ({ column }) => <Header column={column} tid="projects" />,
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
            pcbCategories: pcbCategoriesData?.data,
            contextualRiskCategories: contextualRiskCategoriesData?.data,
          });
        },
        maxSize: 100,
        header: ({ column }) => <Header column={column} tid="progress" />,
        cell: ({ row, table }) => {
          const progress = getProgress({
            pcbs: row?.original?.attributes?.pcbs as PCBs,
            risks: row?.original?.attributes?.risks as Risks,
            pcbCategories: table?.options?.meta?.pcbCategories,
            contextualRiskCategories: table?.options?.meta?.contextualRiskCategories,
          });

          const p =
            Object.values(progress).reduce((acc, curr) => acc + curr, 0) /
            Object.values(progress).length;

          const { format } = new Intl.NumberFormat("en-US", {
            style: "percent",
            maximumFractionDigits: 0,
          });

          return (
            <span
              className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                p === 1 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {/* {row.getValue("status")} */}
              {format(p)}
            </span>
          );
        },
      },
      {
        id: "updatedAt",
        accessorFn: (row) => row?.attributes?.updatedAt,
        minSize: 250,
        header: ({ column }) => <Header column={column} tid="last_updated" />,

        cell: (cellProps) => <CellLastUpdated {...cellProps} />,
      },
      {
        id: "actions",
        maxSize: 0,
        cell: (props) => {
          return <ProjectsActions {...props} />;
        },
      },
    ];
  }, [pcbCategoriesData?.data, contextualRiskCategoriesData?.data]);

  return c;
}
