import { Exhibition } from "@/types/models/exhibition";
import ExhibitionCard from "./ExhibitionCard";

export default function ExhibitionList({
  data,
  wishlistedIds,
}: {
  data: Exhibition[];
  wishlistedIds?: Set<string>;
}) {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-8">
        Showing {data?.length} exhibitions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data?.map((item) => (
          <ExhibitionCard
            key={item.id}
            item={item}
            isWishlisted={wishlistedIds?.has(item.id) ?? false}
          />
        ))}
      </div>
    </div>
  );
}
