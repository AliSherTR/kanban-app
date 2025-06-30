// import React from "react";
// import SingleTask from "@/features/task-board/components/single-task";
// import mockApi from "../../../../mockApi";
// import { Boards } from "@/types";
// import { Plus } from "lucide-react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import NewColumnModal from "@/features/task-board/components/new-column-modal";

// export default function Page() {
//   const boards: Boards = mockApi.getTasks();

//   return (
//     <div className="min-h-screen w-full bg-[#f4f7fd]  dark:bg-[#20212c] overflow-auto">
//       <div className="ps-4 py-4 min-w-[1200px] flex gap-2 h-full">
//         {Object.keys(boards).map((boardName) => (
//           <SingleTask
//             key={boardName}
//             boardName={boardName}
//             tasks={boards[boardName]}
//           />
//         ))}

//         <div className=" h-screen flex grow self-stretch items-center justify-center bg-white dark:bg-[#2b2c37]  max-w-[300px] w-full rounded-md shrink-0">
//           <div className=" flex gap-1 items-center dark:text-[#828fa3] ">
//             <Dialog>
//               <DialogTrigger className=" flex gap-1 items-center hover:text-blue-500">
//                 <Plus strokeWidth={5} size={18} color="#828fa3" />
//                 <span className=" font-bold text-lg text-[#828fa3]">
//                   New Column
//                 </span>
//               </DialogTrigger>
//               <DialogContent className=" w-full dark:bg-[#2b2c37]">
//                 <NewColumnModal />
//               </DialogContent>
//             </Dialog>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect, useCallback } from "react";
import SingleTask from "@/features/task-board/components/single-task";
import mockApi from "../../../../mockApi";
import { Boards, Task } from "@/types";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NewColumnModal from "@/features/task-board/components/new-column-modal";

export default function Page() {
  const [boards, setBoards] = useState<Boards>(mockApi.getTasks());
  const [mounted, setMounted] = useState(false);
  const [draggedTask, setDraggedTask] = useState<{
    task: Task;
    sourceColumn: string;
    sourceIndex: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggedTask) {
        setPosition({
          x: e.clientX - draggedTask.offsetX,
          y: e.clientY - draggedTask.offsetY,
        });
      }
    },
    [draggedTask]
  );

  const handleMouseUp = useCallback(() => {
    if (!draggedTask) return;

    // Find the drop target
    const elements = document.elementsFromPoint(
      position?.x || 0,
      position?.y || 0
    );
    let destColumn: string | null = null;
    let destIndex: number | null = null;

    for (const element of elements) {
      const column = element.closest("[data-column]");
      const taskElement = element.closest("[data-task-id]");
      if (column) {
        destColumn = column.getAttribute("data-column");
        if (taskElement) {
          destIndex = Number(taskElement.getAttribute("data-task-index"));
          // Adjust index if dropping below the task
          const rect = taskElement.getBoundingClientRect();
          if (position && position.y > rect.top + rect.height / 2) {
            destIndex += 1;
          }
        } else {
          destIndex = 0; // Empty column
        }
        break;
      }
    }

    if (destColumn && destIndex !== null) {
      // Log destination board
      console.log(
        `Task "${draggedTask.task.title}" with id : ${draggedTask.task.id} moved to board: ${destColumn}`
      );

      // Update boards
      const newBoards = { ...boards };
      const sourceTasks = [...newBoards[draggedTask.sourceColumn]];
      sourceTasks.splice(draggedTask.sourceIndex, 1);
      newBoards[draggedTask.sourceColumn] = sourceTasks;

      const destTasks = [...newBoards[destColumn]];
      destTasks.splice(destIndex, 0, draggedTask.task);
      newBoards[destColumn] = destTasks;

      setBoards(newBoards);
    }

    setDraggedTask(null);
    setPosition(null);
  }, [draggedTask, position, boards]);

  useEffect(() => {
    if (draggedTask) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggedTask, handleMouseMove, handleMouseUp]);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-[#f4f7fd] dark:bg-[#20212c] overflow-auto">
        <div className="ps-4 py-4 min-w-[1200px] flex gap-2 h-full">
          {Object.keys(boards).map((boardName) => (
            <SingleTask
              key={boardName}
              boardName={boardName}
              tasks={boards[boardName]}
              setDraggedTask={setDraggedTask}
            />
          ))}
          <div className="h-screen flex grow self-stretch items-center justify-center bg-white dark:bg-[#2b2c37] max-w-[300px] w-full rounded-md shrink-0">
            <div className="flex gap-1 items-center dark:text-[#828fa3]">
              <Dialog>
                <DialogTrigger className="flex gap-1 items-center hover:text-blue-500">
                  <Plus strokeWidth={5} size={18} color="#828fa3" />
                  <span className="font-bold text-lg text-[#828fa3]">
                    New Column
                  </span>
                </DialogTrigger>
                <DialogContent className="w-full dark:bg-[#2b2c37]">
                  <NewColumnModal />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f7fd] dark:bg-[#20212c] overflow-auto">
      <div className="ps-4 py-4 min-w-[1200px] flex gap-2 h-full">
        {Object.keys(boards).map((boardName) => (
          <SingleTask
            key={boardName}
            boardName={boardName}
            tasks={boards[boardName]}
            setDraggedTask={setDraggedTask}
          />
        ))}
        <div className="h-screen flex grow self-stretch items-center justify-center bg-white dark:bg-[#2b2c37] max-w-[300px] w-full rounded-md shrink-0">
          <div className="flex gap-1 items-center dark:text-[#828fa3]">
            <Dialog>
              <DialogTrigger className="flex gap-1 items-center hover:text-blue-500">
                <Plus strokeWidth={5} size={18} color="#828fa3" />
                <span className="font-bold text-lg text-[#828fa3]">
                  New Column
                </span>
              </DialogTrigger>
              <DialogContent className="w-full dark:bg-[#2b2c37]">
                <NewColumnModal />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {draggedTask && position && (
        <div
          className="fixed pointer-events-none bg-white dark:bg-[#2b2c37] rounded-md shadow-lg p-5 opacity-80"
          style={{ left: position.x, top: position.y, width: "280px" }}
        >
          <h3 className="text-base mb-1 font-bold text-gray-800 dark:text-gray-200">
            {draggedTask.task.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {
              draggedTask.task.subtasks.filter((subtask) => subtask.isCompleted)
                .length
            }{" "}
            of {draggedTask.task.subtasks.length} subtasks completed
          </p>
        </div>
      )}
    </div>
  );
}
