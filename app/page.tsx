import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServiceSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="overflow-clip">
      <Navbar type="home" />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
