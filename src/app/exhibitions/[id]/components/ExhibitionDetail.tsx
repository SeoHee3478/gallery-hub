"use client";

import { useExhibitionsDetail } from "@/hooks/useExhibitionsDetail";
import { ExhibitionDetailHeader } from "./ExhibitionHeader";
import { memo, useCallback, useMemo } from "react";
import { ExhibitionTags } from "./ExhibitionTags";
import { Button } from "@/components/ui/button";
import { ExhibitionInfoSection } from "./ExhibitionInfoSection";
import { ExhibitionLocation } from "./ExhibitionLocation";
import { ImageSection } from "./ExhibitionImageSection";
import { ExhibitionDescriptionSection } from "./ExhibitionDescriptionSection";
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
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { data: checkWishListData, isLoading: checkWishListIsLoading } =
    useCheckWishList(id);

  const { mutate: addWishlist, isPending: addPending } = useAddWishList();
  const { mutate: removeWishlist, isPending: removePending } =
    useRemoveWishList();

  const isWishlisted = checkWishListData?.isWishlisted ?? false;
  const isPending = addPending || removePending;

  const tags = useMemo(
    () => [data.realmName, data.area].filter(Boolean),
    [data.realmName, data.area]
  );

  const imageSrc = useMemo(() => {
    if (!data?.imgUrl) return "/images/placeholder.svg";
    return sanitizeImageUrl(data.imgUrl);
  }, [data?.imgUrl]);

  const dateRange = useMemo(() => {
    if (!data?.startDate || !data?.endDate) return "";
    const start = formatDate(data.startDate);
    const end = formatDate(data.endDate);
    return `${start} - ${end}`;
  }, [data?.startDate, data?.endDate]);

  const telNumber = useMemo(() => {
    return formatPhoneForTel(data?.phone);
  }, [data?.phone]);

  const handleAddWishlist = useCallback(() => {
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
        item_type: data?.realmName,
      });
    }
  }, [
    isAuthenticated,
    isWishlisted,
    id,
    data?.realmName,
    router,
    removeWishlist,
    addWishlist,
  ]);

  const titleSection = (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
        {he.decode(data?.title)}
      </h2>
      <p className="text-sm lg:text-base text-muted-foreground mb-4">
        {data?.realmName}
        {(data?.area || data?.sigungu) && " • "}
        {[data?.area, data?.sigungu].filter(Boolean).join(" ")}
      </p>
      <ExhibitionTags tags={tags} />
    </>
  );

  return (
    <div className="bg-background max-w-[1200px] w-full mx-auto">
      <ExhibitionDetailHeader
        title="Exhibition Details"
        isFavorite={isWishlisted}
        addWishlist={handleAddWishlist}
        isPending={isPending}
        checkWishListIsLoading={checkWishListIsLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Image Section */}
        <ImageSection imageSrc={imageSrc} title={data.title} />
        {/* Content Section */}
        <div className="space-y-6">
          {titleSection}
          {/* Info Items */}
          <ExhibitionInfoSection
            dateRange={dateRange}
            place={data.place}
            price={data.price}
          />

          <Button
            asChild
            className="w-full h-12 md:h-14 text-base md:text-lg font-semibold rounded-lg"
          >
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              홈페이지 이동하기
            </a>
          </Button>

          {/* Description */}
          <ExhibitionDescriptionSection
            contents={data.contents1}
            phone={data.phone}
            telNumber={telNumber}
          />
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
