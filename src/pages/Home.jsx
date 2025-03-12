import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import TabSection from "../components/home/TabSection";
import CallToAction from "../components/home/CallToAction";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentExchanges, setRecentExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Giả lập dữ liệu API
        const featuredProductsData = [
          {
            id: 1,
            name: "iPhone 13 Pro",
            price: 699.99,
            rating: 5,
            reviewCount: 128,
            condition: "Used",
            seller: "JohnDoe",
            description:
              "Used iPhone 13 Pro in excellent condition with 256GB storage.",
            category: "Smartphones",
            image:
              "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            fastDelivery: true,
          },
          {
            id: 2,
            name: "MacBook Air M1",
            price: 799.99,
            rating: 5,
            reviewCount: 95,
            condition: "Like New",
            seller: "TechStore",
            description: "MacBook Air with M1 chip, 8GB RAM, 256GB SSD",
            category: "Laptops",
            image:
              "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verified: true,
          },
          {
            id: 3,
            name: "Samsung Galaxy Tab S7",
            price: 449.99,
            rating: 4.5,
            reviewCount: 78,
            condition: "Good",
            seller: "ElectronicsHub",
            description:
              "Samsung Galaxy Tab S7 with 128GB storage and S Pen included",
            category: "Tablets",
            image:
              "https://i.pinimg.com/736x/e3/8e/2a/e38e2a736109bc8286c3c49693b47601.jpg",
          },
          {
            id: 4,
            name: "Sony WH-1000XM4",
            price: 249.99,
            rating: 5,
            reviewCount: 212,
            condition: "New",
            seller: "AudioPhile",
            description:
              "Wireless noise-cancelling headphones with excellent sound quality",
            category: "Audio",
            image:
              "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            fastDelivery: true,
          },
          {
            id: 5,
            name: "Canon EOS R5",
            price: 2999.99,
            rating: 5,
            reviewCount: 64,
            condition: "New",
            seller: "PhotoPro",
            description:
              "Professional mirrorless camera with 8K video recording",
            category: "Cameras",
            image:
              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verified: true,
          },
          {
            id: 6,
            name: "Apple Watch Series 7",
            price: 349.99,
            rating: 4.5,
            reviewCount: 156,
            condition: "New",
            seller: "WatchWorld",
            description: "GPS + Cellular, 45mm Aluminum Case with Sport Band",
            category: "Accessories",
            image:
              "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          },
          {
            id: 7,
            name: "Dell XPS 15",
            price: 1299.99,
            originalPrice: 1499.99,
            rating: 4.8,
            reviewCount: 89,
            condition: "New",
            seller: "TechDeals",
            description:
              "15.6-inch 4K UHD display, Intel Core i7, 16GB RAM, 512GB SSD",
            category: "Laptops",
            image:
              "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            fastDelivery: true,
            verified: true,
          },
          {
            id: 8,
            name: "DJI Mavic Air 2",
            price: 799.99,
            rating: 4.7,
            reviewCount: 112,
            condition: "Like New",
            seller: "DroneZone",
            description:
              "Foldable drone with 4K camera, 34-minute flight time, and obstacle sensing",
            category: "Drones",
            image:
              "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          },
        ];

        const trendingProductsData = [
          {
            id: 101,
            name: "iPad Pro 12.9",
            price: 999.99,
            rating: 4.9,
            reviewCount: 87,
            condition: "New",
            seller: "AppleStore",
            description:
              "Latest iPad Pro with M1 chip, 12.9-inch Liquid Retina XDR display",
            category: "Tablets",
            image:
              "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          },
          {
            id: 102,
            name: "Bose QuietComfort 45",
            price: 329.99,
            rating: 4.7,
            reviewCount: 56,
            condition: "New",
            seller: "SoundGear",
            description:
              "Premium noise cancelling headphones with up to 24 hours battery life",
            category: "Audio",
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          },
          {
            id: 103,
            name: "Samsung Galaxy S22 Ultra",
            price: 1199.99,
            rating: 4.8,
            reviewCount: 124,
            condition: "New",
            seller: "SamsungOfficial",
            description:
              "Latest flagship smartphone with S Pen support and 108MP camera",
            category: "Smartphones",
            image:
              "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          },
          {
            id: 104,
            name: "Microsoft Surface Laptop 4",
            price: 1299.99,
            rating: 4.6,
            reviewCount: 45,
            condition: "Like New",
            seller: "MicrosoftStore",
            description:
              "13.5-inch touchscreen laptop with AMD Ryzen processor",
            category: "Laptops",
            image:
              "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          },
        ];

        const recentExchangesData = [
          {
            id: 201,
            date: "2023-03-15",
            user1: {
              name: "Alex Johnson",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            user2: {
              name: "Sarah Williams",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            product1: {
              name: "iPhone 12 Pro",
              category: "Smartphones",
              image:
                "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
            product2: {
              name: "Samsung Galaxy S21",
              category: "Smartphones",
              image:
                "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
          },
          {
            id: 202,
            date: "2023-03-10",
            user1: {
              name: "Michael Brown",
              avatar: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            user2: {
              name: "Emily Davis",
              avatar: "https://randomuser.me/api/portraits/women/22.jpg",
            },
            product1: {
              name: "MacBook Pro 2020",
              category: "Laptops",
              image:
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
            product2: {
              name: "Dell XPS 13",
              category: "Laptops",
              image:
                "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
          },
          {
            id: 203,
            date: "2023-03-05",
            user1: {
              name: "David Wilson",
              avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            },
            user2: {
              name: "Olivia Taylor",
              avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            },
            product1: {
              name: "Apple Watch Series 6",
              category: "Accessories",
              image:
                "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
            product2: {
              name: "Fitbit Sense",
              category: "Accessories",
              image:
                "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            },
          },
        ];

        // Giả lập delay API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setFeaturedProducts(featuredProductsData);
        setTrendingProducts(trendingProductsData);
        setRecentExchanges(recentExchangesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  return (
    <Box sx={{ 
      width: '100%', 
      overflowX: 'hidden' // Thêm thuộc tính này để ngăn cuộn ngang
    }}>
      <Header scrolled={scrolled} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', overflowX: 'hidden' }} // Thêm style này cho motion.div
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 10,
            px: { xs: 2, sm: 3, md: 4 }, // Padding responsive
            width: '100%',
            boxSizing: 'border-box', // Đảm bảo padding không làm tăng chiều rộng
            overflow: 'hidden' // Ngăn cuộn ngang trong container
          }}
        >
          {/* Categories Section */}
          <CategorySection />

          {/* Featured Products */}
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <FeaturedProducts
              products={featuredProducts}
              loading={loading}
              error={error}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </Box>

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Trending Products & Recent Exchanges Tabs */}
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <TabSection
              trendingProducts={trendingProducts}
              recentExchanges={recentExchanges}
              loading={loading}
              error={error}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
            />
          </Box>

          {/* Call to Action */}
          <CallToAction />
        </Container>
      </motion.div>

      <Footer />
    </Box>
  );
};

export default Home;
