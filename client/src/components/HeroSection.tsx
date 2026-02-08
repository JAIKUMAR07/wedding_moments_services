import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image - Static/Fixed */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070")',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl space-y-4 animate-fadeInUp">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-tight animate-slideInLeft animation-delay-300">
              Capturing Life's Most
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-300 to-yellow-200">
                Precious Moments
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-slideInLeft animation-delay-400">
              Choose from our curated photography sessions and send your booking
              request directly to us via WhatsApp or Gmail.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slideInLeft animation-delay-600">
              <Link
                to="/services"
                className="group relative px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 text-center"
              >
                <span className="relative z-10">Book a Session</span>
                <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>

              <Link
                to="/gallery"
                className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
              >
                View Portfolio
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-3 pt-4 text-amber-400 animate-slideInLeft animation-delay-800">
              <div className="w-12 h-[2px] bg-linear-to-r from-amber-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}

      {/* Scroll Down Animation */}
      <div className="absolute  bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-scrollDown"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
