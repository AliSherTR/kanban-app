export type SubTask = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: number;
  title: string;
  status: string;
  subtasks: SubTask[];
};

export type SingleTaskProps = {
  boardName: string;
  tasks: Task[];
};

export type Boards = Record<string, Task[]>;
