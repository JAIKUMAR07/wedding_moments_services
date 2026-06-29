import { Helmet } from "react-helmet-async";
import HeroSection from "../components/HeroSection";
import WelcomeSection from "../components/WelcomeSection";
import ExclusiveWorkSection from "../components/ExclusiveWorkSection";
import BookingStepsSection from "../components/BookingStepsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { config as staticConfig } from "../config";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>
          {staticConfig.studioName} | Professional Wedding Photography
        </title>
        <meta
          name="description"
          content={`${staticConfig.studioName} offers wedding, pre-wedding, baby shoot, birthday, and commercial photography services in Raipur. Capture your special moments with professional photography and cinematic storytelling.`}
        />
        <meta
          name="keywords"
          content="wedding photography, professional photographer, wedding moments, pre-wedding shoot, birthday photography, event photography, wedding videography, candid photography"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${staticConfig.studioName} | Professional Wedding Photography`}
        />
        <meta
          property="og:description"
          content={`${staticConfig.studioName} offers wedding, pre-wedding, baby shoot, birthday, and commercial photography services in Raipur. Capture your special moments with professional photography and cinematic storytelling.`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content={`${staticConfig.studioName} | Professional Wedding Photography`}
        />
        <meta
          name="twitter:description"
          content={`${staticConfig.studioName} offers wedding, pre-wedding, baby shoot, birthday, and commercial photography services in Raipur. Capture your special moments with professional photography and cinematic storytelling.`}
        />
      </Helmet>
      {/* Hero Section */}
      <HeroSection />

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
