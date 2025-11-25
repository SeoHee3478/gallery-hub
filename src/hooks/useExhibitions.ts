import { useInfiniteQuery } from "@tanstack/react-query";
import { Exhibition } from "@/types/models/exhibition";

interface ExhibitionsResponse {
  exhibitions: Exhibition[];
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}

async function fetchExhibitions(page: number): Promise<ExhibitionsResponse> {
  const response = await fetch(`/api/exhibitions?page=${page}&limit=20`);
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return response.json();
}

export function useExhibitions() {
  return useInfiniteQuery({
    queryKey: ["exhibitions"],
    queryFn: ({ pageParam = 1 }) => fetchExhibitions(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
