"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddTaskModal from "@/features/task-board/components/create-task-modal";
import { DialogClose } from "@radix-ui/react-dialog";

export default function AppHeader() {
  const { slug } = useParams();
  const params = useSearchParams();

  return (
    <div className="sticky top-0 flex items-center py-5 bg-white dark:bg-[#2b2c37] justify-between px-5">
      {slug && (
        <span className="text-xl font-semibold">
          {decodeURIComponent(slug as string)}
        </span>
      )}

      {slug && (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full py-6 px-8 cursor-pointer bg-[#635fc7] dark:text-white flex items-center gap-2 font-bold">
                <Plus size={20} strokeWidth={5} />
                <span>Add New Task</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#2b2c37] overflow-y-scroll">
              <AddTaskModal />
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="dark:text-white text-black p-2"
                aria-label="Board options"
              >
                <EllipsisVertical size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-[#2b2c37] mt-4">
              <Dialog>
                <DialogTrigger className=" px-2 py-1 text-sm hover:bg-gray-100 dark:hover:text-black rounded-sm w-full text-left">
                  Edit Board
                </DialogTrigger>
                <DialogContent className="dark:bg-[#2b2c37] overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Edit Board</DialogTitle>
                  </DialogHeader>
                  <AddTaskModal />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className=" px-2 py-1 text-sm hover:bg-gray-100 dark:hover:text-black rounded-sm w-full text-left">
                  Delete Board
                </DialogTrigger>
                <DialogContent className="dark:bg-[#2b2c37] overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Delete Board</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    This will delete the board and all the tasks in the board.
                    Are you sure you want to delete{" "}
                    <span className=" font-bold">
                      {decodeURIComponent(slug as string)}?
                    </span>
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button className=" bg-red-600 hover:bg-red-400">
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
