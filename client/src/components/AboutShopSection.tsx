import { config } from "../config";

const AboutShopSection = () => {
  return (
    <section className="bg-black py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/5 blur-3xl rounded-l-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-amber-500/5 blur-3xl rounded-r-full"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-white">
            The {config.studioName}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="prose prose-lg prose-invert text-gray-400">
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Located in the heart of the city,{" "}
                <span className="text-amber-400 font-serif">
                  {config.studioName}
                </span>{" "}
                is not just a photography studio; it's a creative sanctuary
                designed to turn fleeting moments into eternal memories.
              </p>
              <p>
                Our state-of-the-art facility is equipped with industry-leading
                lighting systems, high-resolution cameras, and a variety of
                curated backdrops that cater to every mood—from rustic vintage
                to ultra-modern chic. We believe that the environment plays a
                crucial role in the artistic process, which is why our studio is
                designed to be comfortable, inspiring, and professional.
              </p>
              <p>
                Whether you are visiting for a bridal consultation, a baby
                portfolio shoot, or a commercial project, our studio offers a
                welcoming ambiance where ideas flourish. We invite you to step
                in, explore our gallery walls showcasing our finest work, and
                discuss how we can bring your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-500/50 transition-colors duration-300">
                <h4 className="text-3xl font-serif text-amber-500 font-bold mb-1">
                  5+
                </h4>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  Years of Excellence
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-500/50 transition-colors duration-300">
                <h4 className="text-3xl font-serif text-amber-500 font-bold mb-1">
                  1000+
                </h4>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="https://images.unsplash.com/photo-1590635292440-ae64501438fa?q=80&w=1000"
                  alt="Studio Interior"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="https://images.unsplash.com/photo-1595514682025-a1c6a2133fcc?q=80&w=1000"
                  alt="Camera Gear"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="https://images.unsplash.com/photo-1588531773099-245873752db2?q=80&w=1000"
                  alt="Lighting Setup"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="https://images.unsplash.com/photo-1520696937669-e054457e51ca?q=80&w=1000"
                  alt="Client Lounge"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutShopSection;
