import { ExhibitionDetail } from "@/types/api/exhibitionDetail";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBaseUrl } from "@/lib/getBaseUrl";

async function fetchExhibitionsDetail(id: string): Promise<ExhibitionDetail> {
  const baseUrl = getBaseUrl();

  const response = await fetch(`${baseUrl}/api/exhibitions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return response.json();
}

export function useExhibitionsDetail(id: string) {
  return useSuspenseQuery({
    queryKey: ["exhibition", id],
    queryFn: () => fetchExhibitionsDetail(id),
    staleTime: 1000 * 60 * 60 * 24, // 1일
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1일
  });
}
