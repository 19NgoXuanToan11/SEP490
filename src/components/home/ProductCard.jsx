import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Info,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Camera,
  Watch,
  LocalShipping,
  Verified,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const ProductCard = ({ product, toggleFavorite, favorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (favorites && product) {
      setIsFavorite(favorites.some((fav) => fav.id === product.id));
    }
  }, [favorites, product]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (toggleFavorite) toggleFavorite(product.id);
  };

  // Map category to icon
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "smartphones":
        return <Smartphone fontSize="small" />;
      case "laptops":
        return <Laptop fontSize="small" />;
      case "tablets":
        return <Tablet fontSize="small" />;
      case "audio":
        return <Headphones fontSize="small" />;
      case "cameras":
        return <Camera fontSize="small" />;
      case "accessories":
        return <Watch fontSize="small" />;
      default:
        return <Smartphone fontSize="small" />;
    }
  };

  // Get condition color and label
  const getConditionBadge = (condition) => {
    switch (condition) {
      case "New":
        return { bg: "#4caf50", text: "white", label: "New" };
      case "Like New":
        return { bg: "#2196f3", text: "white", label: "Like New" };
      case "Good":
        return { bg: "#ff9800", text: "white", label: "Good" };
      case "Fair":
        return { bg: "#f44336", text: "white", label: "Fair" };
      default:
        return { bg: "#9e9e9e", text: "white", label: "Used" };
    }
  };

  // Get category image
  const getCategoryImage = (category) => {
    switch (category?.toLowerCase()) {
      case "smartphones":
        return "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop";
      case "laptops":
        return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop";
      case "tablets":
        return "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop";
      case "audio":
        return "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop";
      case "cameras":
        return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop";
      case "accessories":
        return "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop";
    }
  };

  // Get seller avatar color
  const getSellerAvatarColor = (seller) => {
    const colors = [
      "#3f51b5",
      "#f44336",
      "#4caf50",
      "#ff9800",
      "#9c27b0",
      "#2196f3",
      "#009688",
      "#673ab7",
      "#e91e63",
      "#cddc39",
    ];
    let hash = 0;
    for (let i = 0; i < seller?.length || 0; i++) {
      hash = seller.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Get seller initial
  const getSellerInitial = (seller) => {
    return seller?.charAt(0) || "U";
  };

  // Get seller display name
  const getSellerDisplayName = (seller) => {
    if (!seller) return "Unknown";
    if (seller.length > 10) return seller.substring(0, 10) + "...";
    return seller;
  };

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (
      product.originalPrice &&
      product.price &&
      product.originalPrice > product.price
    ) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return null;
  };

  const discountPercentage = getDiscountPercentage();

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const card = document.getElementById(`product-card-${product.id}`);
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <MotionCard
      id={`product-card-${product.id}`}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "24px",
        overflow: "visible",
        position: "relative",
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        boxShadow: isHovered
          ? "0 30px 60px rgba(0,0,0,0.25), 0 0 40px rgba(99, 102, 241, 0.2)"
          : "0 15px 35px rgba(0,0,0,0.1)",
        background: "transparent",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateY(${rotation}deg)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Card Content with Glass Effect */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #6366F1, #8B5CF6)",
            opacity: 0.5,
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(45deg, #EC4899, #F43F5E)",
            opacity: 0.5,
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        {/* Image Container with Perspective */}
        <Box
          sx={{
            position: "relative",
            height: 260,
            overflow: "hidden",
            borderRadius: "24px 24px 0 0",
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        >
          {/* Product Image */}
          <CardMedia
            component="img"
            image={product.image || getCategoryImage(product.category)}
            alt={product.name}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transition:
                "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />

          {/* Overlay with Gradient */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isHovered
                ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)"
                : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
              transition: "background 0.3s ease",
              zIndex: 1,
            }}
          />

          {/* Discount Badge - Top Left with Animation */}
          {discountPercentage && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 2,
                transformOrigin: "center",
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(45deg, #F43F5E, #EC4899)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(244, 63, 94, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "translateZ(30px)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, fontSize: "1rem" }}
                >
                  -{discountPercentage}%
                </Typography>
              </Box>
            </motion.div>
          )}

          {/* Condition Badge - Top Right */}
          {product.condition && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 2,
              }}
            >
              <Chip
                label={getConditionBadge(product.condition).label}
                sx={{
                  backgroundColor: getConditionBadge(product.condition).bg,
                  color: getConditionBadge(product.condition).text,
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  transform: "translateZ(30px)",
                  "& .MuiChip-label": {
                    px: 2,
                    py: 0.5,
                  },
                }}
              />
            </motion.div>
          )}

          {/* Category Badge - Bottom Left */}
          {product.category && (
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                zIndex: 2,
                transform: "translateZ(30px)",
              }}
            >
              <Chip
                icon={getCategoryIcon(product.category)}
                label={product.category}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(4px)",
                  color: "#1e293b",
                  fontWeight: "medium",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  "& .MuiChip-icon": {
                    color: "#6366F1",
                  },
                }}
              />
            </Box>
          )}

          {/* Favorite Button - Floating */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute",
              top: isHovered ? 70 : 16,
              right: 16,
              zIndex: 2,
              transition: "top 0.3s ease",
            }}
          >
            <IconButton
              onClick={handleToggleFavorite}
              sx={{
                backgroundColor: isFavorite
                  ? "rgba(244, 67, 54, 0.9)"
                  : "rgba(255, 255, 255, 0.9)",
                color: isFavorite ? "white" : "#f44336",
                width: 45,
                height: 45,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                "&:hover": {
                  backgroundColor: isFavorite ? "#e53935" : "white",
                  transform: "translateZ(40px)",
                },
                transform: "translateZ(30px)",
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </motion.div>

          {/* Fast Delivery Badge - Conditional */}
          {product.fastDelivery && (
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
                zIndex: 2,
                transform: "translateZ(30px)",
              }}
            >
              <Chip
                icon={<LocalShipping sx={{ fontSize: 16 }} />}
                label="Fast Delivery"
                sx={{
                  backgroundColor: "rgba(79, 70, 229, 0.9)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(79, 70, 229, 0.3)",
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
        </Box>

        {/* Content Section */}
        <CardContent
          sx={{
            p: 3,
            flexGrow: 1,
            position: "relative",
            zIndex: 1,
            transform: "translateZ(10px)",
          }}
        >
          {/* Product Name with Verified Badge if applicable */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#1e293b",
                lineHeight: 1.3,
                mr: 1,
              }}
            >
              {product.name}
            </Typography>

            {product.verified && (
              <Tooltip title="Verified Product">
                <Verified sx={{ color: "#4f46e5", fontSize: 20 }} />
              </Tooltip>
            )}
          </Box>

          {/* Seller and Rating Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {/* Seller Info */}
            {product.seller && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.8rem",
                    mr: 1,
                    bgcolor: getSellerAvatarColor(product.seller),
                  }}
                >
                  {getSellerInitial(product.seller)}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.85rem", color: "#64748b" }}
                >
                  {getSellerDisplayName(product.seller)}
                </Typography>
              </Box>
            )}

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                value={product.rating || 0}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#f59e0b",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{ ml: 0.5, fontSize: "0.75rem", color: "#64748b" }}
              >
                ({product.reviewCount || 0})
              </Typography>
            </Box>
          </Box>

          {/* Short Description */}
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: "#475569",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              height: "2.5rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description ||
              `${product.name} in ${product.condition || "used"} condition. ${
                product.category || "Electronics"
              } from ${product.seller || "trusted seller"}.`}
          </Typography>

          {/* Price Section with Original Price if Discounted */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              mt: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "#4f46e5",
                lineHeight: 1,
              }}
            >
              ${product.price?.toFixed(2)}
            </Typography>

            {discountPercentage && (
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                  fontSize: "0.9rem",
                  color: "#94a3b8",
                  textDecoration: "line-through",
                  fontWeight: 500,
                }}
              >
                ${product.originalPrice?.toFixed(2)}
              </Typography>
            )}
          </Box>
        </CardContent>

        {/* Action Buttons - Appear on Hover */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
            background:
              "linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0))",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.3s ease",
            zIndex: 3,
          }}
        >
          <Button
            component={Link}
            to={`/products/${product.id}`}
            variant="contained"
            startIcon={<Info />}
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(45deg, #4f46e5, #6366F1)",
              color: "white",
              fontWeight: "bold",
              px: 2,
              py: 1,
              flexGrow: 1,
              mr: 1,
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #4338ca, #4f46e5)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Details
          </Button>

          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            sx={{
              borderRadius: "12px",
              background: "#1e293b",
              color: "white",
              fontWeight: "bold",
              px: 2,
              py: 1,
              boxShadow: "0 4px 12px rgba(30, 41, 59, 0.3)",
              "&:hover": {
                background: "#0f172a",
                transform: "translateY(-2px)",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>

      {/* 3D Effect Shadow */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
          bottom: 0,
          borderRadius: "24px",
          background: "linear-gradient(45deg, #6366F1, #8B5CF6)",
          opacity: isHovered ? 0.2 : 0,
          filter: "blur(20px)",
          transform: "translateZ(-10px)",
          transition: "opacity 0.3s ease",
          zIndex: -1,
        }}
      />
    </MotionCard>
  );
};

export default ProductCard;
