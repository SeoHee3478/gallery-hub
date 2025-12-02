import { ExhibitionDetail } from "@/types/api/exhibitionDetail";
import { useQuery } from "@tanstack/react-query";

async function fetchExhibitionsDetail(id: string): Promise<ExhibitionDetail> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      : "";

  const response = await fetch(`${baseUrl}/api/exhibitions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }
  return response.json();
}

export function useExhibitionsDetail(id: string) {
  return useQuery({
    queryKey: ["exhibition", id],
    queryFn: () => fetchExhibitionsDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
