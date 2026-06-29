import { config } from "../config";

const AboutShopSection = () => {
  const currentYear = new Date().getFullYear();
  const shopStartYear = 2025;
  const yearsOfExperience = Math.max(1, currentYear - shopStartYear);
  const happyClients = yearsOfExperience * 48;

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
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="prose prose-lg prose-invert text-gray-400">
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Located in Raipur,{" "}
                <span className="text-amber-400 font-serif">
                  {config.studioName}
                </span>{" "}
                is a creative space where beautiful moments are captured and
                turned into lasting memories.
              </p>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                {" "}
                Founded in 2025,{" "}
                <span className="text-amber-400 font-serif">
                  {config.studioName}
                </span>{" "}
                is built on professional photography experience dating back to
                2018. We offer photography services for weddings, pre-weddings,
                baby shoots, birthdays, and commercial projects. Every session
                is handled with creativity, attention to detail, and a passion
                for capturing genuine moments that you'll cherish for years to
                come.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-500/50 transition-colors duration-300">
                <h4 className="text-3xl font-serif text-amber-500 font-bold mb-1">
                  {yearsOfExperience}+
                </h4>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  Years of Excellence
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-500/50 transition-colors duration-300">
                <h4 className="text-3xl font-serif text-amber-500 font-bold mb-1">
                  {happyClients}+
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
                  src="shop/1.webp  "
                  alt="Studio Interior"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="shop/3.webp  "
                  alt="Camera Gear"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="shop/2.webp  "
                  alt="Lighting Setup"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
                <img
                  src="shop/5.webp  "
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
