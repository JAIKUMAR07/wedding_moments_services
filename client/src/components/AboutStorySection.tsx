import { config } from "../config";
import { Phone, Mail } from "lucide-react";
import { useConfig } from "../context/ConfigContext";

const AboutStorySection = () => {
  const { social } = useConfig();
  const startYear = 2018;
  const yearsOfExperience = new Date().getFullYear() - startYear;

  return (
    <section className="py-16 md:py-24 mx-4 my-12 md:mx-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Side: Image */}
          <div className="w-full lg:w-2/5 relative">
            <div className="relative aspect-3/4 w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img
                src="profile/profile.jpeg"
                alt="Photographer Portrait"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />
              {/* Decorative Border */}
              <div className="absolute inset-4 border-2 border-amber-400/30 rounded-xl z-20"></div>
            </div>
            {/* Background decoration */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-amber-500/10 border border-amber-500/20 rounded-2xl transform -rotate-3 hidden lg:block backdrop-blur-sm"></div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-3/5 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-amber-500 font-medium tracking-wide">
              All About My Story
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed text-lg text-justify">
              <p>
                Hi, I'm <span className="text-white  ">Fitesh Dewangan</span>,
                the photographer behind Wedding Moments Studio.
              </p>

              <p>
                Photography has always been more than a profession for me it's a
                way to capture genuine emotions and create memories that last a
                lifetime. I started my journey by working with different
                photography studios and as a freelance photographer, where I
                learned through hands-on experience and developed my own style
                behind the camera.
              </p>

              <p>
                I enjoy capturing weddings, candid moments, bride and couple
                portraits, family celebrations, baby shoots, and every special
                occasion that tells a unique story. My photography style is a
                blend of candid, traditional, cinematic, and modern photography,
                allowing me to capture every moment naturally and beautifully.
              </p>

              <p>
                My goal is simple to make every client feel comfortable in front
                of the camera and deliver photographs they'll love for years to
                come. I believe every smile deserves to be remembered, and I'm
                grateful to be a part of life's most meaningful moments.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-amber-500/50 transition-colors duration-300">
                <h4 className="text-3xl font-serif text-amber-500 font-bold mb-1">
                  {yearsOfExperience}+
                </h4>
                <p className="text-gray-400 text-sm uppercase tracking-wide">
                  Years of Experience
                </p>
              </div>
            </div>
            {/* Footer / Contact Info */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-6 text-gray-400">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <span className="p-2 bg-amber-500/10 rounded-full text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300 border border-amber-500/20">
                    <Phone className="w-5 h-5" />
                  </span>
                  <span className="font-medium group-hover:text-amber-400 transition-colors">
                    {social.phone}
                  </span>
                </div>

                <div className="flex items-center gap-2 group cursor-pointer">
                  <span className="p-2 bg-amber-500/10 rounded-full text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300 border border-amber-500/20">
                    <Mail className="w-5 h-5" />
                  </span>
                  <span className="font-medium group-hover:text-amber-400 transition-colors">
                    {social.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStorySection;
