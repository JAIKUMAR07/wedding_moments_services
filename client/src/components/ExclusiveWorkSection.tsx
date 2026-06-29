import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clients = [
  {
    id: 1,
    image: "weddingShoot/20.webp",
    name: "Bride Shoot ",
  },

  {
    id: 1,
    image: "weddingShoot/6.webp",
    name: "Wedding Ceremony",
  },
  {
    id: 1,
    image: "weddingShoot/9.webp",
    name: "Haldi Ceremony",
  },
  {
    id: 1,
    image: "weddingShoot/19.webp",
    name: "Bride Shoot",
  },

  {
    id: 1,
    image: "preWeddingShoot/14.webp",
    name: "Pre-wdding Shoot",
  },
  {
    id: 1,
    image: "weddingShoot/18.webp",
    name: "Bride Shoot",
  },
  {
    id: 1,
    image: "preWeddingShoot/14.webp",
    name: "Photo Shoot",
  },
  {
    id: 1,
    image: "babyShoot/4.webp",
    name: "Baby Shoot",
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
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 capitalize">
            Our Exclusive Works
          </h2>
        </div>

        <div className="relative group px-6">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 md:p-3 rounded-full text-white hover:bg-amber-600 hover:text-white transition-all duration-300 backdrop-blur-sm md:-ml-2 lg:-ml-6 flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
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
                className="flex-none w-[300px] md:w-[350px] aspect-3/4 relative group/card cursor-pointer snap-center"
              >
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover/card:opacity-40"></div>
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 md:p-3 rounded-full text-white hover:bg-amber-600 hover:text-white transition-all duration-300 backdrop-blur-sm md:-mr-2 lg:-mr-6 flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveWorkSection;
