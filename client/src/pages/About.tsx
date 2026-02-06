import AboutStorySection from "../components/AboutStorySection";
import AboutShopSection from "../components/AboutShopSection";
import { Helmet } from "react-helmet-async";
import { config } from "../config";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <Helmet>
        <title>About Us | {config.studioName}</title>
        <meta
          name="description"
          content={`Learn more about ${config.studioName}, our passionate team, and our journey in capturing timeless memories.`}
        />
      </Helmet>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Us
            </span>
          </h1>
        </div>

        {/* About Shop Section */}
        <div className="mb-20">
          <AboutShopSection />
        </div>

        {/* About Story Section */}
        <div className="mb-20">
          <AboutStorySection />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all duration-300">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-white mb-2">
              Professional Quality
            </h3>
            <p className="text-gray-400">
              High-end equipment and expert techniques for stunning results
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all duration-300">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-white mb-2">
              Timely Delivery
            </h3>
            <p className="text-gray-400">
              Quick turnaround without compromising on quality
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-amber-400/50 transition-all duration-300">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-semibold text-white mb-2">
              Customer Satisfaction
            </h3>
            <p className="text-gray-400">
              Your happiness is our priority, every step of the way
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Ready to Create Magic Together?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your photography needs and create something beautiful
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
            >
              Contact Us on WhatsApp
            </a>
            <a
              href="mailto:info@weddingmoments.com"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Send us an Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
