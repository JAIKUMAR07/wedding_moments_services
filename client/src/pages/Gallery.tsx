import { useState } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { config as staticConfig } from "../config";

// Mock data for gallery images
const galleryCategories = [
  {
    title: "Wedding Shoot",
    images: [
      {
        id: "ws1",
        src: "weddingShoot/19.webp",
        alt: "Wedding Outdoor",
        // className: "aspect-[3/4]",
      },
      {
        id: "ws7",
        src: "weddingShoot/20.webp",
        alt: "Wedding Outdoor",
      },

      {
        id: "ws4",
        src: "weddingShoot/6.webp",
        alt: "Wedding Outdoor",
      },

      {
        id: "ws2",
        src: "weddingShoot/7.webp",
        alt: "Wedding Outdoor",
      },

      {
        id: "ws6",
        src: "weddingShoot/9.webp",
        alt: "Wedding Outdoor",
      },

      {
        id: "ws5",
        src: "weddingShoot/18.webp",
        alt: "Wedding Outdoor",
      },
    ],
  },
  {
    title: "Baby-Shoot",
    images: [
      {
        id: "bs3",
        src: "babyShoot/4.webp",
        alt: "Baby Picture",
      },
      {
        id: "bs8",
        src: "babyShoot/23.webp",
        alt: "Baby Picture",
      },
      {
        id: "bs6",
        src: "babyShoot/17.webp",
        alt: "Baby Picture",
      },
      {
        id: "bs2",
        src: "babyShoot/2.webp",
        alt: "Baby Picture",
      },

      {
        id: "bs10",
        src: "babyShoot/25.webp",
        alt: "Baby Picture",
      },
      {
        id: "bs1",
        src: "babyShoot/1.webp",
        alt: "Baby Picture",
      },
      {
        id: "bs5",
        src: "babyShoot/11.webp",
        alt: "Baby Picture",
      },

      {
        id: "bs7",
        src: "babyShoot/22.webp",
        alt: "Baby Picture",
      },

      {
        id: "bs4",
        src: "babyShoot/5.webp",
        alt: "Baby Picture",
      },
      {
        id: "bs9",
        src: "babyShoot/24.webp",
        alt: "Baby Picture",
      },
    ],
  },
  {
    title: "Pre-Wedding Shoot",
    images: [
      {
        id: "ws12",
        src: "preWeddingShoot/30.webp",
        alt: "Wedding Picture",
      },
      {
        id: "ws12",
        src: "preWeddingShoot/14.webp",
        alt: "Wedding Picture",
      },

      {
        id: "ws12",
        src: "preWeddingShoot/26.webp",
        alt: "Wedding Picture",
      },

      {
        id: "ws1",
        src: "preWeddingShoot/10.webp",
        alt: "Wedding Picture",
      },
      {
        id: "ws12",
        src: "preWeddingShoot/13.webp",
        alt: "Wedding Picture",
      },
      {
        id: "ws12",
        src: "preWeddingShoot/27.webp",
        alt: "Wedding Picture",
      },
      {
        id: "ws12",
        src: "preWeddingShoot/28.webp",
        alt: "Wedding Picture",
      },
      {
        id: "ws12",
        src: "preWeddingShoot/29.webp",
        alt: "Wedding Picture",
      },
      {
        id: "ws12",
        src: "preWeddingShoot/15.webp",
        alt: "Wedding Picture",
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
        <title>Our Work | {staticConfig.studioName}</title>
        <meta
          name="description"
          content={`Browse the portfolio of ${staticConfig.studioName}. See our latest weddings, pre-wedding shoots, and event photography.`}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-20 px-6 bg-linear-to-b from-zinc-900 to-black">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500 mb-6">
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
                    className={`w-full object-cover rounded-lg shadow-lg shadow-black/50  `}
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
              <X className="h-8 w-8" />
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
