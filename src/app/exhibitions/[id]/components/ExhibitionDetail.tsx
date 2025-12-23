"use client";

import { useExhibitionsDetail } from "@/hooks/useExhibitionsDetail";
import { ExhibitionDetailHeader } from "./ExhibitionHeader";
import { useEffect, useState } from "react";
import { ExhibitionTags } from "./ExhibitionTags";
import Image from "next/image";
import { ExhibitionInfoItem } from "./ExhibitionInfoItem";
import { Button } from "@/components/ui/button";
import { ExhibitionDescription } from "./ExhibitionDescription";
import { ExhibitionLocation } from "./ExhibitionLocation";
import { Calendar, MapPin } from "lucide-react";
import he from "he";
import formatPhoneForTel from "@/lib/formatPhoneForTel";
import formatDate from "@/lib/formatDate";
import sanitizeImageUrl from "@/lib/sanitizeImageUrl";
import {
  useAddWishList,
  useCheckWishList,
  useRemoveWishList,
} from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ExhibitionDetail({ id }: { id: string }) {
  const { data } = useExhibitionsDetail(id);
  const { mutate: addWishlist, isPending: addPending } = useAddWishList();
  const { user, isAuthenticated, loading } = useAuth();
  const { data: checkWishListData, isLoading: checkWishListIsLoading } =
    useCheckWishList(id);
  const { mutate: removeWishlist, isPending: removePending } =
    useRemoveWishList();
  const router = useRouter();
  const isWishlisted = checkWishListData?.isWishlisted ?? false;
  const isPending = addPending || removePending;

  const [isFavorite, setIsFavorite] = useState(isWishlisted);
  const [imageSrc, setImageSrc] = useState<string>("/images/placeholder.svg");

  useEffect(() => {
    if (data?.imgUrl) {
      setImageSrc(sanitizeImageUrl(data.imgUrl));
    }
  }, [data?.imgUrl]);

  const startDateFormatted = formatDate(data.startDate);
  const endDateFormatted = formatDate(data.endDate);
  const dateRange = `${startDateFormatted} - ${endDateFormatted}`;
  const telNumber = formatPhoneForTel(data.phone);

  const handleAddWishlist = () => {
    if (!isAuthenticated) {
      const url = new URL("/login", window.location.origin);
      url.searchParams.set("redirect", "true");
      router.push(url.toString());
      return;
    }

    if (isWishlisted) {
      removeWishlist(id);
    } else {
      addWishlist({
        item_id: id,
        item_type: data.realmName,
      });
    }
  };

  return (
    <div className="bg-background max-w-[1200px] w-full mx-auto">
      <ExhibitionDetailHeader
        title="Exhibition Details"
        isFavorite={isFavorite}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
        addWishlist={handleAddWishlist}
        isPending={isPending}
        checkWishListIsLoading={checkWishListIsLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Image Section */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-muted/30">
            <Image
              src={imageSrc}
              alt={he.decode(data.title)}
              fill
              className="object-cover"
              priority
              onError={() => {
                console.log("이미지 로드 실패:", imageSrc);
                setImageSrc("/images/placeholder.svg");
              }}
            />
          </div>

          {/* Mobile Info - shown on mobile, hidden on desktop */}
          <div className="lg:hidden">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {he.decode(data.title)}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {data.realmName}
              {(data.area || data.sigungu) && " • "}
              {[data.area, data.sigungu].filter(Boolean).join(" ")}
            </p>
            <ExhibitionTags tags={[data.realmName, data.area, "Exhibition"]} />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Desktop Title - hidden on mobile */}
          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {he.decode(data.title)}
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              {data.realmName}
              {(data.area || data.sigungu) && " • "}
              {[data.area, data.sigungu].filter(Boolean).join(" ")}
            </p>
            <ExhibitionTags tags={[data.realmName, data.area, "Exhibition"]} />
          </div>

          {/* Info Items */}
          <div className="space-y-4">
            <ExhibitionInfoItem
              icon={<Calendar className="w-5 h-5" />}
              label="날짜"
              value={dateRange}
            />
            <ExhibitionInfoItem
              icon={<MapPin className="w-5 h-5" />}
              label="장소"
              value={data.place}
            />
            {/* [TODO] 돈 이모티콘 통일성에 맞게 변경하기 */}
            <ExhibitionInfoItem
              icon={<div className="text-lg font-semibold">💵</div>}
              label="가격"
              value={data.price}
            />
          </div>

          <Button
            asChild
            className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-lg"
          >
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              홈페이지 이동하기
            </a>
          </Button>

          {/* Description */}
          <div className="border-t border-border pt-4">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
              About
            </h3>
            <ExhibitionDescription content={data.contents1} />
          </div>

          {/* Contact Info */}
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Contact</p>
            <p className="text-sm md:text-base font-medium text-foreground">
              <a href={`tel:${telNumber}`} className="hover:underline">
                {data.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Location Section - Full Width */}
      <div className="mt-8 lg:mt-12 border-t border-border pt-8 lg:pt-12">
        <ExhibitionLocation
          address={data.placeAddr}
          placeUrl={data.placeUrl}
          lat={data.gpsY}
          lng={data.gpsX}
        />
      </div>
    </div>
  );
}
