import { config } from "../config";
import { Phone, Mail } from "lucide-react";
import { useConfig } from "../context/ConfigContext";

const AboutStorySection = () => {
  const { social } = useConfig();

  return (
    <section className="py-16 md:py-24 mx-4 my-12 md:mx-0">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Side: Image */}
          <div className="w-full lg:w-2/5 relative">
            <div className="relative aspect-3/4 w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
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
              It's All About My Story
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>
                Wedding Moments Studio is the creative vision of a passionate
                team led by an accomplished photographer with a zeal for
                capturing life's most memorable moments through the lens. With
                years of experience and a keen eye for detail, We specialize in
                various genres of photography, including weddings, portraits,
                events, and landscapes.
              </p>

              <p>
                Driven by a relentless pursuit of excellence, we combine
                technical expertise with artistic flair to deliver stunning
                images that evoke emotion and tell captivating stories. Whether
                it's freezing a fleeting expression, immortalizing a
                breathtaking landscape, or documenting the intimacy of a special
                occasion, we excel in creating timeless visual masterpieces.
              </p>

              <p>
                Dedicated to exceeding client expectations, we prioritize
                communication and collaboration, ensuring that each photo
                session is tailored to reflect the unique personalities and
                preferences of the individuals involved. From the initial
                consultation to the final delivery of images, we strive to
                provide a seamless and enjoyable experience, characterized by
                professionalism, reliability, and creativity.
              </p>

              <p className="hidden md:block">
                With a commitment to continuous growth and innovation, we stay
                abreast of the latest trends and techniques in photography,
                constantly refining skills and experimenting with new ideas to
                push the boundaries of creativity. Whether it's a traditional
                wedding ceremony, a candid family portrait, or a corporate
                event, Wedding Moments Studio promises to capture moments that
                will be cherished for a lifetime.
              </p>
            </div>

            {/* Footer / Contact Info */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-serif text-amber-400 capitalize">
                  {config.studioName}
                </h3>
              </div>

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
