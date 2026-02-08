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
          content={`Welcome to ${staticConfig.studioName}. We specialize in capturing your most precious wedding moments with elegance and style.`}
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
