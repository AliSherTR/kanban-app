// import React from "react";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { SingleTaskProps } from "@/types";
// import SingleTaskModal from "./single-task-modal";

// export default function SingleTask({ boardName, tasks }: SingleTaskProps) {
//   return (
//     <div className=" p-1 max-w-[300px] w-full shrink-0 ">
//       <h2 className="text-sm tracking-wide font-semibold mb-4 text-gray-800 dark:text-gray-200 capitalize">
//         {boardName}
//       </h2>
//       {tasks.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-400">No tasks</p>
//       ) : (
//         tasks.map((task) => (
//           <Dialog key={task.id}>
//             <DialogTrigger className=" w-full text-start">
//               <div className="mb-4 px-5 py-4 bg-white dark:bg-[#2b2c37] rounded-md">
//                 <h3 className="text-base mb-1 font-bold text-gray-800 dark:text-gray-200">
//                   {task.title}
//                 </h3>
//                 <p className="text-xs text-gray-600 dark:text-gray-400">
//                   {
//                     task.subtasks.filter((subtask) => subtask.isCompleted)
//                       .length
//                   }{" "}
//                   of {task.subtasks.length} subtasks completed
//                 </p>
//               </div>
//             </DialogTrigger>
//             <DialogContent className=" w-full py-8 px-5 dark:bg-[#2b2c37]">
//               <SingleTaskModal {...task} />
//             </DialogContent>
//           </Dialog>
//         ))
//       )}
//     </div>
//   );
// }

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SingleTaskProps, Task } from "@/types";
import SingleTaskModal from "./single-task-modal";

interface DragState {
  task: Task;
  sourceColumn: string;
  sourceIndex: number;
  offsetX: number;
  offsetY: number;
}

interface Props extends SingleTaskProps {
  setDraggedTask: React.Dispatch<React.SetStateAction<DragState | null>>;
}

export default function SingleTask({
  boardName,
  tasks,
  setDraggedTask,
}: Props) {
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    task: Task,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDraggedTask({
      task,
      sourceColumn: boardName,
      sourceIndex: index,
      offsetX,
      offsetY,
    });
  };

  return (
    <div data-column={boardName} className="p-1 max-w-[300px] w-full shrink-0">
      <h2 className="text-sm tracking-wide font-semibold mb-4 text-gray-800 dark:text-gray-200 capitalize">
        {boardName}
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tasks</p>
      ) : (
        tasks.map((task, index) => (
          <div
            key={task.id}
            data-task-id={task.id}
            data-task-index={index}
            onMouseDown={(e) => handleMouseDown(e, task, index)}
            className="mb-4"
          >
            <Dialog>
              <DialogTrigger className="w-full text-start">
                <div className="px-5 py-4 bg-white dark:bg-[#2b2c37] rounded-md cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-base mb-1 font-bold text-gray-800 dark:text-gray-200">
                    {task.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {
                      task.subtasks.filter((subtask) => subtask.isCompleted)
                        .length
                    }{" "}
                    of {task.subtasks.length} subtasks completed
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full py-8 px-5 dark:bg-[#2b2c37]">
                <SingleTaskModal {...task} />
              </DialogContent>
            </Dialog>
          </div>
        ))
      )}
    </div>
  );
}
