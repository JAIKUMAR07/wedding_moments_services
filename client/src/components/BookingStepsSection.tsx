import { Search, FileText, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "1. Explore Services",
    description:
      "Browse our diverse photography categories and choose the one that fits your occasion.",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "2. Customize Package",
    description:
      "Select specific sub-services and the number of days you need us for.",
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "3. Review & Connect",
    description:
      "Review your estimated total and send us a booking request via WhatsApp or Email.",
  },
];

const BookingStepsSection = () => {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="h-full w-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40L40 0H20L0 20M40 40V20L20 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif   text-amber-400">
            Simple Booking Steps
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-zinc-700 via-amber-500/50 to-zinc-700 z-0"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:border-amber-500 transition-colors duration-300 flex items-center justify-center mb-6 shadow-xl shadow-black/30">
                <div className="text-gray-400 group-hover:text-amber-400 transition-colors duration-300">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-400 max-w-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingStepsSection;
