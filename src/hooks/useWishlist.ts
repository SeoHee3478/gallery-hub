import { WishlistItem } from "@/types/models/favoriteExhibition";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { useAuthStore } from "@/store/useAuthStore";

interface ApiError extends Error {
  status?: number;
  statusCode?: number;
}

const WISHLIST_KEYS = {
  all: ["wishlist"] as const,
  lists: () => [...WISHLIST_KEYS.all, "list"] as const,
  detail: (id: string) => [...WISHLIST_KEYS.all, "detail", id] as const,
  check: (itemId: string) => [...WISHLIST_KEYS.all, "check", itemId] as const,
};

const wishlistAPI = {
  add: async (params: { item_id: string; item_type: string }) => {
    const response = await fetch(`${getBaseUrl()}/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      const error = new Error(
        data.message || "좋아요 담기에 실패하였습니다.",
      ) as ApiError;
      error.status = response.status;
      throw error;
    }
    return data;
  },

  check: async (itemId: string) => {
    const response = await fetch(
      `${getBaseUrl()}/api/wishlist/check/${itemId}`,
    );

    if (!response.ok) {
      if (response.status === 401) {
        return { isWishlisted: false };
      }
      throw new Error("좋아요 상태 확인을 하려면 로그인이 필요합니다.");
    }

    return response.json();
  },

  remove: async (itemId: string) => {
    const response = await fetch(`${getBaseUrl()}/api/wishlist/${itemId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (!response.ok) {
      const error = new Error(
        data.message || "좋아요 취소에 실패하였습니다.",
      ) as ApiError;
      error.status = response.status;
      throw error;
    }
    return data;
  },

  list: async (): Promise<WishlistItem[]> => {
    const response = await fetch(`${getBaseUrl()}/api/wishlist`);

    if (response.status === 401) {
      return [];
    }

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        data.message || "좋아요 리스트 불러오기에 실패하였습니다.",
      ) as ApiError;
      error.status = response.status;
      throw error;
    }
    return data.items || data || [];
  },
};

export const useAddWishList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: wishlistAPI.add,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: WISHLIST_KEYS.check(variables.item_id),
      });
      toast.success("좋아요 리스트에 추가되었습니다.");
    },
    onError: (error: ApiError) => {
      if (error.status === 401 || error.message.includes("Unauthorized")) {
        // toast.error("로그인이 필요한 서비스입니다.");
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

export const useCheckWishList = (itemId: string) => {
  const { isLoggedIn } = useAuthStore();

  return useQuery({
    queryKey: WISHLIST_KEYS.check(itemId),
    queryFn: () => wishlistAPI.check(itemId),
    enabled: !!itemId && isLoggedIn,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const useRemoveWishList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: wishlistAPI.remove,
    onSuccess: (_, itemId) => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: WISHLIST_KEYS.check(itemId),
      });
      toast.success("좋아요가 취소되었습니다.");
    },
    onError: (error: ApiError) => {
      if (error.status === 401 || error.message.includes("Unauthorized")) {
        router.push("/login");
        return;
      }

      toast.error(error.message || "좋아요 취소에 실패했습니다.");
    },
  });
};

export const useWishList = () => {
  const { isLoggedIn } = useAuthStore();

  return useQuery<WishlistItem[]>({
    queryKey: WISHLIST_KEYS.lists(),
    queryFn: wishlistAPI.list,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10, // 10분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
