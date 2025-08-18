"use client";
import React from "react";
import TaskCard from "@/features/task-board/components/task-card";
import useBoards from "@/features/task-board/api/useBoards";
import { useAuth } from "@/features/auth/api/useAuth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { LoaderIcon } from "lucide-react";

export default function page() {
  const { boardsData, boardsPending, boardsError } = useBoards();
  const { logout } = useAuth();

  if (boardsPending) {
    return (
      <div className=" flex items-center justify-center h-full mt-32">
        <LoaderIcon className=" animate-spin" size={50} />
      </div>
    );
  }
  if (boardsError) {
    toast.error(boardsError.message);
    logout();
    redirect("/auth/login");
  }

  if (boardsData && boardsData.length === 0) {
    return (
      <div className=" flex flex-col items-center justify-center">
        <div>
          <h1 className=" text-2xl dark:text-gray-200 font-bold text-center mb-4 mt-10">
            You don't have any boards yet
          </h1>
          <span className=" text-sm text-center block">
            Start by creating a board
          </span>
        </div>
        <div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
            alt=""
            className=" w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className=" px-4 py-7 ">
      {boardsData.length === 0 ? (
        "Start By Creating a board"
      ) : (
        <>
          <h1 className=" dark:text-gray-200 mt-4">All Boards</h1>
          <div className=" grid grid-cols-4 gap-4 mt-4">
            <TaskCard />
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>

            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>

            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>

            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
            <div className="shadow-lg p-4 bg-white"></div>
          </div>
        </>
      )}
    </div>
  );
}
