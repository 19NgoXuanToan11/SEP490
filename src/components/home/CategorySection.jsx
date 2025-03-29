import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Camera,
  Cable,
  PhoneIphone,
  LaptopMac,
  TabletMac,
  HeadsetMic,
  CameraAlt,
  DevicesOther,
} from "@mui/icons-material";

const CategorySection = () => {
  const categories = [
    {
      name: "Smartphones",
      icon: <PhoneIphone />,
      secondaryIcon: <Smartphone />,
      color: "from-blue-600 to-indigo-700",
      description: "Find the latest models and best deals",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Laptops",
      icon: <LaptopMac />,
      secondaryIcon: <Laptop />,
      color: "from-purple-600 to-indigo-700",
      description: "Powerful machines for work and play",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tablets",
      icon: <TabletMac />,
      secondaryIcon: <Tablet />,
      color: "from-pink-600 to-rose-700",
      description: "Portable devices for every need",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Audio",
      icon: <HeadsetMic />,
      secondaryIcon: <Headphones />,
      color: "from-amber-500 to-orange-600",
      description: "Premium sound quality equipment",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Cameras",
      icon: <CameraAlt />,
      secondaryIcon: <Camera />,
      color: "from-emerald-600 to-teal-700",
      description: "Capture moments with clarity",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Accessories",
      icon: <DevicesOther />,
      secondaryIcon: <Cable />,
      color: "from-cyan-600 to-sky-700",
      description: "Essential add-ons for your devices",
      image:
        "https://i.pinimg.com/736x/da/60/3d/da603d7b92efbc40a9fc0626b076169e.jpg",
    },
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 px-4 bg-[#0a0f23]">
      {/* Animated particles/dots background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-indigo-500/10"
            style={{
              width: index % 2 === 0 ? "8px" : "6px",
              height: index % 2 === 0 ? "8px" : "6px",
            }}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              opacity: [
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.5,
                Math.random() * 0.5 + 0.3,
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true, amount: 0.1 }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 relative inline-block">
              <span
                className="relative text-white uppercase tracking-wider"
                style={{
                  textShadow:
                    "0 4px 20px rgba(101, 119, 255, 0.5), 0 2px 5px rgba(255, 255, 255, 0.2)",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  position: "relative",
                  transform: "perspective(500px)",
                }}
              >
                Browse by
              </span>{" "}
              <span
                className="bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-600 text-transparent bg-clip-text uppercase"
                style={{
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textShadow: "0 5px 20px rgba(125, 93, 255, 0.6)",
                  transform: "translateZ(20px)",
                }}
              >
                Category
              </span>
              {/* 3D glow effect under text */}
              <motion.div
                className="absolute left-0 right-0 bottom-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                style={{ boxShadow: "0 0 15px 2px rgba(99, 102, 241, 0.8)" }}
              />
              {/* Enhanced 3D glow effect under text */}
              <div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 h-10 bg-indigo-600/30 filter blur-xl rounded-full"
                style={{ zIndex: -1 }}
              ></div>
              <div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/5 h-6 bg-purple-600/20 filter blur-lg rounded-full"
                style={{ zIndex: -1 }}
              ></div>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto mt-10 text-lg font-light"
            style={{
              letterSpacing: "0.5px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(5px)",
            }}
          >
            Experience the future of electronics trading with our innovative
            platform
          </motion.p>

          {/* Enhanced 3D underline */}
          <motion.div
            className="h-1.5 w-24 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 mx-auto mt-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            style={{
              boxShadow: "0 0 15px 2px rgba(99, 102, 241, 0.6)",
              transform: "translateZ(5px)",
            }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Link
                to={`/products?category=${category.name}`}
                className="block h-full"
              >
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  {/* Category image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay with improved opacity for better text readability */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-75 group-hover:opacity-85 transition-opacity duration-300`}
                  ></div>

                  {/* Dark overlay at the bottom for better text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Content with improved positioning and text shadow */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex items-center">
                      {/* Icon container with glass effect */}
                      <div className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/20">
                        <motion.div
                          initial={{ opacity: 1 }}
                          whileHover={{ opacity: 0, rotateY: 90 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                        >
                          {category.icon}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, rotateY: -90 }}
                          whileHover={{ opacity: 1, rotateY: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute"
                        >
                          {category.secondaryIcon}
                        </motion.div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-3xl mb-2 text-white group-hover:text-white transition-colors duration-300 drop-shadow-md">
                        {category.name}
                      </h3>

                      <p className="text-white text-lg font-medium drop-shadow-md">
                        {category.description}
                      </p>

                      {/* Animated arrow that appears on hover */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-white text-sm font-medium flex items-center bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full w-fit">
                          Explore
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute -left-16 top-1/2 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-20 z-0"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
            className="absolute -right-16 bottom-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 z-0"
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
