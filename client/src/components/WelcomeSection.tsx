import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side: Image Grid */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 h-[500px] md:h-[600px]">
              {/* Image Strip 1 */}
              <div className="flex flex-col gap-4 mt-8 animate-fadeInUp">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000"
                  alt="Wedding detail"
                  className="w-full h-full object-cover rounded-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Image Strip 2 */}
              <div className="flex flex-col gap-4 -mt-8 animate-fadeInUp animation-delay-200">
                <img
                  src="https://images.unsplash.com/photo-1623838279864-4e427fa78089?q=80&w=1000"
                  alt="Bride portrait"
                  className="w-full h-full object-cover rounded-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Image Strip 3 */}
              <div className="flex flex-col gap-4 mt-4 animate-fadeInUp animation-delay-400">
                <img
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000"
                  alt="Couple moment"
                  className="w-full h-full object-cover rounded-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Image Strip 4 */}
              <div className="flex flex-col gap-4 -mt-4 animate-fadeInUp animation-delay-600">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000"
                  alt="Groom portrait"
                  className="w-full h-full object-cover rounded-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <span className="text-amber-400 text-lg font-medium tracking-wider uppercase font-sans mb-2 block animate-fadeInUp">
              Welcome To
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight animate-fadeInUp animation-delay-200">
              Wedding Moments Studio
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed animate-fadeInUp animation-delay-400">
              Step into Wedding Moments Studio, where passion meets precision in
              every frame. With expertise spanning portraits, landscapes, and
              events, our award-winning studio transforms moments into timeless
              treasures. Let us capture your story with creativity and flair,
              ensuring memories that last a lifetime.
            </p>

            <div className="pt-4 animate-fadeInUp animation-delay-600">
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 uppercase tracking-wide text-sm shadow-lg hover:shadow-amber-500/50"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
