"use client";

import Image from "next/image";
import { memo } from "react";
import he from "he";

interface ExhibitionImageSectionProps {
  imageSrc: string;
  title: string;
}

export const ImageSection = memo(
  ({ imageSrc, title }: ExhibitionImageSectionProps) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-muted/30">
          <Image
            src={imageSrc}
            alt={he.decode(title)}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }
);
ImageSection.displayName = "ImageSection";
