type Exhibition = {
  id: number;
  title: string;
  location: string;
  date: string;
  category: string;
  image?: string;
  region: string;
};

export default function ExhibitionList({ data }: { data: Exhibition[] }) {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-8">
        Showing {data.length} exhibitions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image Container */}
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              {item.image ? (
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    No image
                  </span>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                {item.title}
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {item.region} / {item.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
