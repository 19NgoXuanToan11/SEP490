import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import Blog from "../components/home/Blog";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <Blog />
      </main>
      <Footer />
    </>
  );
};

export default Home;
