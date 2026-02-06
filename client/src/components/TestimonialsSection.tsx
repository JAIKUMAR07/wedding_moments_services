const testimonials = [
  {
    id: 1,
    name: "Sarah & Mike",
    role: "Wedding Clients",
    text: "The team at Wedding Moments Studio captured our day perfectly. Every emotion, every detail was preserved beautifully. We couldn't be happier!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Portfolio Shoot",
    text: "Professional, creative, and incredibly talented. They made me feel so comfortable during the shoot and the results were stunning.",
    rating: 5,
  },
  {
    id: 3,
    name: "David & Jessica",
    role: "Pre-Wedding",
    text: "Absolutely magical photos! They found the perfect locations and lighting. Highly recommended for any couple looking for unique memories.",
    rating: 5,
  },
  {
    id: 4,
    name: "The Kapoor Family",
    role: "Birthday Event",
    text: "They covered our daughter's first birthday and the video highlights were just emotional and beautiful. Great team to work with!",
    rating: 4,
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Fashion Shoot",
    text: "A truly premium experience. The attention to detail and post-processing quality is top-notch. Will definitely book again.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  // Duplicate the array to ensure seamless infinite scroll
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-zinc-900 py-24 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-amber-400/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-white">
          What Our Clients Say
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* Gradient Masks for smooth fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>

        <div className="flex animate-scroll gap-8 w-max px-8">
          {scrollingTestimonials.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[350px] md:w-[450px] bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex-shrink-0 hover:border-amber-500/30 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < item.rating ? "fill-current" : "text-zinc-700 fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed italic mb-6">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-serif text-xl font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg font-serif">
                    {item.name}
                  </h4>
                  <p className="text-zinc-500 text-sm">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
