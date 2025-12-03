"use client";

import { useState } from "react";

interface ExhibitionDescriptionProps {
  content: string;
}

export function ExhibitionDescription({ content }: ExhibitionDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const previewLength = 200;
  const shouldTruncate = content.length > previewLength;
  const displayText = isExpanded ? content : content.slice(0, previewLength);

  return (
    <div className="space-y-3">
      <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
        {displayText}
        {shouldTruncate && !isExpanded && "..."}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary text-sm font-semibold hover:underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
