import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types";

const statusOptions = ["To Do", "Doing", "Done"];
export default function SingleTaskModal(task: Task) {
  return (
    <>
      <DialogHeader className=" mb-3">
        <DialogTitle>{task.title}</DialogTitle>
      </DialogHeader>
      <h3 className=" text-sm">
        Sub Tasks ({" "}
        {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
        {task.subtasks.length} )
      </h3>
      <div>
        <div className="bg-[#f4f7fd] dark:bg-[#20212c] py-2 px-2 rounded-lg">
          {task.subtasks.map((subTask) => (
            <div key={subTask.id}>
              <div className=" flex items-center px-3 py-1 gap-5 text-sm mb-2 text-black dark:text-white">
                <Checkbox
                  checked={subTask.isCompleted}
                  className="bg-white border-black checked:border-black dark:border-white"
                />
                <span
                  className={` ${subTask.isCompleted ? "line-through" : ""}`}
                >
                  {subTask.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        <h1 className="my-3 text-sm font-bold dark:text-white">
          Current Status
        </h1>
        <Select>
          <SelectTrigger className=" w-full">
            <SelectValue placeholder={"Hello"} />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#2b2c37]">
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="w-full bg-[#635fc7] hover:bg-[#635fc7]/90 rounded-full text-white"
        >
          Save Task
        </Button>
      </DialogFooter>
    </>
  );
}
