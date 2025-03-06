import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  SwapHoriz,
  CalendarToday,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Camera,
  Cable,
  ArrowForward,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const ExchangeCard = ({ exchange }) => {
  // Map category to icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Smartphones":
        return <Smartphone />;
      case "Laptops":
        return <Laptop />;
      case "Tablets":
        return <Tablet />;
      case "Audio":
        return <Headphones />;
      case "Cameras":
        return <Camera />;
      case "Accessories":
        return <Cable />;
      default:
        return <Smartphone />;
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return {
          bg: "rgba(34, 197, 94, 0.1)",
          color: "#22c55e",
          border: "rgba(34, 197, 94, 0.3)",
        };
      case "Pending":
        return {
          bg: "rgba(245, 158, 11, 0.1)",
          color: "#f59e0b",
          border: "rgba(245, 158, 11, 0.3)",
        };
      default:
        return {
          bg: "rgba(59, 130, 246, 0.1)",
          color: "#3b82f6",
          border: "rgba(59, 130, 246, 0.3)",
        };
    }
  };

  const statusColors = exchange.status
    ? getStatusColor(exchange.status)
    : getStatusColor("default");

  return (
    <MotionCard
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        transition: "all 0.3s ease",
        maxWidth: "100%", // Ensure card doesn't exceed container width
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{
        y: -8,
        boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Card Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              boxShadow: "0 4px 10px rgba(59, 130, 246, 0.3)",
              mr: 1.5,
            }}
          >
            <SwapHoriz sx={{ color: "white", fontSize: 18 }} />
          </Box>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              fontSize: "0.95rem",
            }}
          >
            Exchange #{exchange.id}
          </Typography>
        </Box>
        <Chip
          size="small"
          label={exchange.status || "Active"}
          sx={{
            backgroundColor: statusColors.bg,
            color: statusColors.color,
            fontWeight: 600,
            borderRadius: "8px",
            border: `1px solid ${statusColors.border}`,
            px: 1,
            height: "24px",
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2, pt: 1.5 }}>
        {/* Date */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            p: 0.75,
            borderRadius: "8px",
            background: "rgba(241, 245, 249, 0.5)",
          }}
        >
          <CalendarToday sx={{ fontSize: 14, color: "#64748b", mr: 1 }} />
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              fontSize: "0.8rem",
            }}
          >
            {exchange.date}
          </Typography>
        </Box>

        {/* Exchange Users */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          {/* User 1 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "42%",
            }}
          >
            <Avatar
              src={exchange.user1.avatar}
              sx={{
                width: 48,
                height: 48,
                mb: 1,
                border: "2px solid white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                textAlign: "center",
                mb: 0.5,
                fontSize: "0.85rem",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {exchange.user1.name}
            </Typography>
            <Chip
              size="small"
              label={exchange.product1.category}
              icon={getCategoryIcon(exchange.product1.category)}
              sx={{
                backgroundColor: "rgba(59, 130, 246, 0.08)",
                color: "#3b82f6",
                fontWeight: 600,
                borderRadius: "6px",
                border: "1px solid rgba(59, 130, 246, 0.15)",
                "& .MuiChip-icon": {
                  color: "#3b82f6",
                  fontSize: "0.9rem",
                },
                height: "22px",
                fontSize: "0.65rem",
              }}
            />
          </Box>

          {/* Exchange Icon */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "16%",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)",
              }}
            >
              <SwapHoriz sx={{ color: "white", fontSize: 18 }} />
            </Box>
          </Box>

          {/* User 2 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "42%",
            }}
          >
            <Avatar
              src={exchange.user2.avatar}
              sx={{
                width: 48,
                height: 48,
                mb: 1,
                border: "2px solid white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#1e293b",
                textAlign: "center",
                mb: 0.5,
                fontSize: "0.85rem",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {exchange.user2.name}
            </Typography>
            <Chip
              size="small"
              label={exchange.product2.category}
              icon={getCategoryIcon(exchange.product2.category)}
              sx={{
                backgroundColor: "rgba(59, 130, 246, 0.08)",
                color: "#3b82f6",
                fontWeight: 600,
                borderRadius: "6px",
                border: "1px solid rgba(59, 130, 246, 0.15)",
                "& .MuiChip-icon": {
                  color: "#3b82f6",
                  fontSize: "0.9rem",
                },
                height: "22px",
                fontSize: "0.65rem",
              }}
            />
          </Box>
        </Box>

        {/* Products Exchanged */}
        <Box
          sx={{
            p: 1.5,
            borderRadius: "10px",
            background: "rgba(241, 245, 249, 0.5)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#1e293b",
              mb: 1.5,
              fontSize: "0.85rem",
            }}
          >
            Products Exchanged:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Product 1 with Tooltip */}
            <Tooltip title={exchange.product1.name} placement="top">
              <Box
                sx={{
                  flex: 1,
                  p: 1.25,
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#1e293b",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {exchange.product1.name}
                </Typography>
              </Box>
            </Tooltip>

            <SwapHoriz sx={{ color: "#64748b", fontSize: 16, flexShrink: 0 }} />

            {/* Product 2 with Tooltip */}
            <Tooltip title={exchange.product2.name} placement="top">
              <Box
                sx={{
                  flex: 1,
                  p: 1.25,
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#1e293b",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {exchange.product2.name}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>

      <Divider sx={{ opacity: 0.5 }} />

      {/* Card Footer */}
      <Box
        sx={{
          p: 1.5,
          textAlign: "center",
          background: "rgba(241, 245, 249, 0.3)",
        }}
      >
        <Button
          component={Link}
          to={`/exchanges/${exchange.id}`}
          variant="outlined"
          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
          sx={{
            borderRadius: "8px",
            px: 2,
            py: 0.5,
            borderColor: "rgba(59, 130, 246, 0.3)",
            color: "#3b82f6",
            fontWeight: 600,
            fontSize: "0.8rem",
            "&:hover": {
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.08)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(59, 130, 246, 0.15)",
            },
            transition: "all 0.3s ease",
          }}
        >
          View Exchange Details
        </Button>
      </Box>
    </MotionCard>
  );
};

export default ExchangeCard;
