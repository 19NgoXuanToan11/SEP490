import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyboardArrowDown, Explore, ShoppingCart } from "@mui/icons-material";
import heroImage from "../../assets/pictures/hero-bg.jpg";

const HeroSection = () => {
  const heroRef = useRef(null);

  const scrollToContent = () => {
    window.scrollTo({
      top: heroRef.current.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center text-white text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.h1
          className="font-extrabold text-4xl md:text-6xl mb-6 leading-tight"
          style={{
            background: "linear-gradient(90deg, #fff, #e0e7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            letterSpacing: "-0.02em",
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Buy, Sell & Exchange <br />
          <motion.span
            className="inline-block"
            style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Used Electronics
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join our community and find the best deals on used devices. Reduce
          electronic waste while saving money.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="flex items-center px-6 py-3 text-base md:text-lg font-bold rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Explore className="mr-2" />
            Browse Products
          </motion.button>

          <motion.button
            className="flex items-center px-6 py-3 text-base md:text-lg font-bold rounded-full border-2 border-white/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white hover:-translate-y-1 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="mr-2" />
            Join Our Community
          </motion.button>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { value: "10K+", label: "Products" },
            { value: "5K+", label: "Users", highlight: true },
            { value: "8K+", label: "Transactions" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
            >
              <motion.h3
                className={`text-4xl font-bold mb-1 ${
                  stat.highlight ? "text-indigo-400" : "text-white"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
        }}
      >
        <p className="mb-1 text-white/80 text-sm">Scroll Down</p>
        <KeyboardArrowDown className="text-white/80" />
      </motion.div>

      {/* Gradient overlay at the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0))",
        }}
      />
    </motion.div>
  );
};

export default HeroSection;
