"use client";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LayoutDashboard, Moon, Plus, Sun } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import CreateBoardModal from "@/features/task-board/components/create-board-modal";

const sidebarItems = [
  { id: 0, name: "Platform Launch" },
  { id: 1, name: "Marketing Plan" },
  { id: 2, name: "Roadmap" },
];

export default function AppSidebar() {
  const params = useParams();
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Sidebar className="bg-white dark:bg-[#2b2c37] border-none">
      <SidebarHeader className="px-3 py-4 flex flex-row items-center gap-3 mb-4">
        <img
          src="https://kanban-task-management-app.netlify.app/static/media/logo-mobile.e60c2fbc3dcefa4256e0569ffba5e523.svg"
          className="w-[10%]"
          alt="Kanban Logo"
        />
        <h1 className="text-3xl font-semibold">kanban</h1>
      </SidebarHeader>

      <SidebarContent>
        <span className="px-3 mb-3 text-xs font-bold text-[#828fa3] tracking-widest uppercase">
          All Boards ({sidebarItems.length})
        </span>
        {sidebarItems.map((item) => {
          const isActive =
            decodeURIComponent(params?.slug as string) === item.name;
          return (
            <Link
              href={`/dashboard/board/${encodeURIComponent(item.name)}?id=${
                item.id
              }`}
              key={item.id}
            >
              <SidebarMenuItem
                className={`${
                  isActive
                    ? "bg-[#635fc7] text-white "
                    : "text-[#828fa3]  hover:text-[#635fc7] dark:hover:bg-white"
                } py-3 px-5 w-[90%] flex gap-2 items-center transition-colors duration-200 rounded-r-full`}
              >
                <LayoutDashboard size={20} />
                <span className="font-semibold">{item.name}</span>
              </SidebarMenuItem>
            </Link>
          );
        })}
        <SidebarMenuItem className="py-3 px-5 w-[90%] flex gap-2 rounded-r-full items-center text-[#635fc7] hover:bg-[#635fc7]/10 dark:hover:bg-white cursor-pointer transition-colors duration-200">
          <Dialog>
            <DialogTrigger className=" flex gap-2 items-center">
              <Plus size={20} />
              <span className="font-semibold">Create New Board</span>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#2b2c37]">
              <CreateBoardModal />
            </DialogContent>
          </Dialog>
        </SidebarMenuItem>
      </SidebarContent>

      <SidebarFooter className="w-[90%] mx-auto p-3 bg-[#f4f7fd] dark:bg-[#20212c] rounded-lg mb-10 flex flex-row items-center justify-center gap-4">
        <Moon
          size={18}
          className={`transition-colors duration-200 ${
            !isDark ? "text-[#828fa3]" : "text-white"
          }`}
        />
        <Switch
          checked={!isDark}
          onCheckedChange={handleThemeChange}
          className="data-[state=checked]:bg-[#635fc7] transition-transform duration-500 ease-in-out"
        />
        <Sun
          size={18}
          className={`transition-colors duration-200 ${
            isDark ? "text-[#828fa3]" : "text-yellow-500"
          }`}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
