interface ExhibitionTagsProps {
  tags: string[];
}

export function ExhibitionTags({ tags }: ExhibitionTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block px-3 py-1 text-xs md:text-sm font-medium rounded-full bg-primary/10 text-primary"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
