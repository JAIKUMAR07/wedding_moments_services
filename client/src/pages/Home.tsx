import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import WelcomeSection from "../components/WelcomeSection";
import ExclusiveWorkSection from "../components/ExclusiveWorkSection";
import BookingStepsSection from "../components/BookingStepsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { config } from "../config";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>{config.studioName} | Professional Wedding Photography</title>
        <meta
          name="description"
          content={`Welcome to ${config.studioName}. We specialize in capturing your most precious wedding moments with elegance and style.`}
        />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* ... (Hero content remains unchanged) ... */}
        {/* Background Image - Fixed */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070")',
          }}
        >
          {/* Gradient Overlay - Left aligned content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        {/* Content - Left Aligned */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl space-y-8">
              {/* Badge */}
              <div className="flex items-center gap-3 animate-slideInLeft">
                <div className="flex items-center gap-2 text-amber-400">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium tracking-[0.2em] uppercase">
                    Professional Photography
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight animate-slideInLeft animation-delay-200">
                Capturing Life's Most
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                  Precious Moments
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-slideInLeft animation-delay-400">
                Choose from our curated photography sessions and send your
                booking request directly to us via WhatsApp or Gmail.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slideInLeft animation-delay-600">
                <Link
                  to="/services"
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 text-center"
                >
                  <span className="relative z-10">Book a Session</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </Link>

                <Link
                  to="/services"
                  className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
                >
                  View Portfolio
                  <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-scrollDown"></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Exclusive Work Section */}
      <ExclusiveWorkSection />
      {/* Booking Steps Section */}
      <BookingStepsSection />
      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default Home;
