import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApiError extends Error {
  status?: number;
  statusCode?: number;
}

const WISHLIST_KEYS = {
  all: ["wishlist"] as const,
  lists: () => [...WISHLIST_KEYS.all, "list"] as const,
  detail: (id: string) => [...WISHLIST_KEYS.all, "detail", id] as const,
};

const wishlistAPI = {
  add: async (params: { item_id: string; item_type: string }) => {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      const error = new Error(
        data.message || "좋아요 담기에 실패하였습니다."
      ) as ApiError;
      error.status = response.status;
      throw error;
    }
    return data;
  },
};

export const useAddWishList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: wishlistAPI.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.lists() });
    },
    onError: (error: ApiError) => {
      if (error.status === 401 || error.message.includes("Unauthorized")) {
        toast.error("로그인이 필요한 서비스입니다.");
        router.push("/login");
      }
      if (error.status === 409) {
        toast.error("이미 좋아요 리스트에 담긴 프로그램입니다.");
        return;
      }

      toast.error(error.message || "오류가 발생했습니다.");
    },
  });
};
