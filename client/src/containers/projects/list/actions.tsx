import Link from "next/link";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { CellContext } from "@tanstack/react-table";

import { useDeleteProjectsId } from "@/types/generated/project";
import { ProjectListResponseDataItem } from "@/types/generated/strapi.schemas";

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

export default function ProjectsActions({
  row,
}: CellContext<ProjectListResponseDataItem, unknown>) {
  const deleteProjectsIdMutation = useDeleteProjectsId();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    if (!row.original.id) {
      return;
    }

    deleteProjectsIdMutation.mutate(
      {
        id: row.original.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["/projects"]);
        },
      },
    );
  };

  return (
    <div className="flex space-x-1 px-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/projects/${row.original.id}`}>
            <Button variant="outline" size="icon" className="items-center">
              <Pencil1Icon />
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
                <TrashIcon />
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
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Tooltip>
    </div>
  );
}
