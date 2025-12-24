"use client";

import { memo } from "react";
import { ExhibitionDescription } from "./ExhibitionDescription";

interface ExhibitionDescriptionSectionProps {
  contents: string;
  phone: string;
  telNumber: string;
}

export const ExhibitionDescriptionSection = memo(
  ({ contents, phone, telNumber }: ExhibitionDescriptionSectionProps) => {
    return (
      <>
        <div className="border-t border-border pt-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
            About
          </h3>
          <ExhibitionDescription content={contents} />
        </div>

        <div className="bg-muted rounded-lg p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Contact</p>
          <p className="text-sm md:text-base font-medium text-foreground">
            <a href={`tel:${telNumber}`} className="hover:underline">
              {phone}
            </a>
          </p>
        </div>
      </>
    );
  }
);

ExhibitionDescriptionSection.displayName = "ExhibitionDescriptionSection";
