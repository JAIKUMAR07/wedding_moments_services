import { useRef } from "react";

const clients = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000",
    name: "Wedding Ceremony",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000",
    name: "Royal Reception",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000",
    name: "Pre-Wedding Shoot",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1623838279864-4e427fa78089?q=80&w=1000",
    name: "Traditional Rials",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000",
    name: "Birthday Bash",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=1000",
    name: "Cultural Event",
  },
];

const ExclusiveWorkSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-zinc-900 py-24 border-t border-white/5">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-amber-400/80 text-sm font-medium tracking-[0.2em] uppercase">
            Our Exclusive Client's
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white capitalize">
            Our Exclusive Clients
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-amber-400 to-transparent mx-auto mt-8"></div>
        </div>

        <div className="relative group px-6">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-amber-600 hover:text-white transition-all duration-300 backdrop-blur-sm -ml-2 lg:-ml-6 hidden md:block"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Carousel Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex-none w-[300px] md:w-[350px] aspect-[3/4] relative group/card cursor-pointer snap-center"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover/card:opacity-40"></div>
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover/card:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-white text-xl font-serif font-medium drop-shadow-lg transform translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
                    {client.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full text-white hover:bg-amber-600 hover:text-white transition-all duration-300 backdrop-blur-sm -mr-2 lg:-mr-6 hidden md:block"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveWorkSection;
