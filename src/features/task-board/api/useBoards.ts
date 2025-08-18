import { useQuery } from "@tanstack/react-query";

async function getAllBoards() {
  const res = await fetch(`/api/boards/getAllBoards`);
  const data = await res.json();
  if (res.ok) {
    return data.data;
  }
  throw new Error(data.message);
}

export default function useBoards() {
  const boardsQuery = useQuery({
    queryKey: ["boards"],
    queryFn: getAllBoards,
  });

  return {
    boardsData: boardsQuery.data,
    boardsPending: boardsQuery.isPending,
    boardsError: boardsQuery.error,
  };
}
