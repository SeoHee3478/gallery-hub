"use client";

import { ArrowLeft, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { memo } from "react";

interface ExhibitionDetailHeaderProps {
  title: string;
  onShare?: () => void;
  isFavorite?: boolean;
  addWishlist: () => void;
  isPending: boolean;
  checkWishListIsLoading: boolean;
}

export const ExhibitionDetailHeader = memo(
  ({
    title,
    onShare,
    isFavorite = false,
    addWishlist,
    isPending,
    checkWishListIsLoading,
  }: ExhibitionDetailHeaderProps) => {
    const router = useRouter();

    const onClickFavoriteBtn = () => {
      addWishlist();
    };
    return (
      <div className="flex items-center justify-between gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full hover:cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 text-center text-md md:text-base font-semibold text-gray-800">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClickFavoriteBtn}
            className="rounded-full cursor-pointer"
            disabled={isPending || checkWishListIsLoading}
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onShare}
            className="rounded-full cursor-pointer"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }
);

ExhibitionDetailHeader.displayName = "ExhibitionDetailHeader";
