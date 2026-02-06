import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { config } from "../config";

// Mock data for gallery images
const galleryCategories = [
  {
    title: "Wedding",
    images: [
      {
        id: "w1",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
        alt: "Wedding Couple",
        className: "aspect-[3/4]",
      },
      {
        id: "w2",
        src: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000",
        alt: "Wedding Ceremony",
        className: "aspect-video",
      },
      {
        id: "w3",
        src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000",
        alt: "Wedding Details",
        className: "aspect-square",
      },
      {
        id: "w4",
        src: "https://images.unsplash.com/photo-1519225448526-0a0295155809?q=80&w=1000",
        alt: "Bride and Groom",
        className: "aspect-[2/3]",
      },
      {
        id: "w5",
        src: "https://images.unsplash.com/photo-1553102674-af685bb5fe40?q=80&w=1000",
        alt: "Wedding Outdoor",
        className: "aspect-[4/3]",
      },
    ],
  },
  {
    title: "Birthday Party",
    images: [
      {
        id: "b1",
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000",
        alt: "Birthday Cake",
        className: "aspect-square",
      },
      {
        id: "b2",
        src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000",
        alt: "Birthday Celebration",
        className: "aspect-video",
      },
      {
        id: "b3",
        src: "https://images.unsplash.com/photo-1502086223501-8351e090653d?q=80&w=1000",
        alt: "Kids Party",
        className: "aspect-[3/4]",
      },
      {
        id: "b4",
        src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=1000",
        alt: "Party Balloons",
        className: "aspect-[2/3]",
      },
    ],
  },
  {
    title: "Pre-Wedding",
    images: [
      {
        id: "p1",
        src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000",
        alt: "Pre-wedding Outdoor",
        className: "aspect-[3/4]",
      },
      {
        id: "p2",
        src: "https://images.unsplash.com/photo-1623838279864-4e427fa78089?q=80&w=1000",
        alt: "Couple Shoot",
        className: "aspect-video",
      },
      {
        id: "p3",
        src: "https://images.unsplash.com/photo-1632152862080-606c4b2b1011?q=80&w=1000",
        alt: "Romantic Pose",
        className: "aspect-[4/5]",
      },
      {
        id: "p4",
        src: "https://images.unsplash.com/photo-1522673607200-1645062cd955?q=80&w=1000",
        alt: "Engagement",
        className: "aspect-square",
      },
    ],
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <Helmet>
        <title>Our Work | {config.studioName}</title>
        <meta
          name="description"
          content={`Browse the portfolio of ${config.studioName}. See our latest weddings, pre-wedding shoots, and event photography.`}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-20 px-6 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-6">
            Our Gallery
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A visual journey through our finest moments. Explore our portfolio
            of captured memories across different celebrations.
          </p>
        </div>
      </div>

      {/* Gallery Categories */}
      <div className="container mx-auto px-6 space-y-24">
        {galleryCategories.map((category) => (
          <section key={category.title} className="space-y-8">
            {/* Category Header */}
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white">
                {category.title}
              </h2>
              <div className="h-px bg-amber-500/50 flex-1"></div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {category.images.map((image) => (
                <div
                  key={image.id}
                  className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                  onClick={() =>
                    setSelectedImage({ src: image.src, alt: image.alt })
                  }
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full object-cover rounded-lg shadow-lg shadow-black/50 ${image.className}`}
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-amber-400 z-50"
              aria-label="Close gallery modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
