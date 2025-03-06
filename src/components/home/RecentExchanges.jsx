import React from "react";
import { Grid, Paper, Typography, Button, Box, Chip } from "@mui/material";
import { Skeleton } from "@mui/material";
import { SwapHoriz, Refresh, ErrorOutline, History } from "@mui/icons-material";
import { motion } from "framer-motion";
import ExchangeCard from "./ExchangeCard";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const ExchangeSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          p: 3,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          sx={{ borderRadius: "12px", mb: 2, alignSelf: "flex-end" }}
        />

        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton
              variant="rectangular"
              width={80}
              height={24}
              sx={{ borderRadius: "12px", mt: 1 }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="text" width="60%" height={20} />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="circular"
              width={50}
              height={50}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton
              variant="rectangular"
              width={80}
              height={24}
              sx={{ borderRadius: "12px", mt: 1 }}
            />
          </Grid>
        </Grid>

        <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />

        <Skeleton
          variant="rectangular"
          width={180}
          height={36}
          sx={{ borderRadius: "20px", alignSelf: "center", mt: "auto" }}
        />
      </Paper>
    </Grid>
  );
};

const RecentExchanges = ({ exchanges, loading, error }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ position: "relative", overflow: "hidden", py: 2 }}
    >
      {/* Section Header */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <MotionBox
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
            mr: 2,
          }}
        >
          <SwapHoriz sx={{ fontSize: 30, color: "white" }} />
        </MotionBox>

        <Box>
          <MotionTypography
            variant="overline"
            sx={{
              fontWeight: 600,
              color: "#3B82F6",
              letterSpacing: 1.5,
              display: "block",
              mb: 0.5,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            LATEST ACTIVITY
          </MotionTypography>

          <MotionTypography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #3B82F6, #2563EB)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textFillColor: "transparent",
              position: "relative",
              mb: 0,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Recent Exchanges
            {/* Underline animation */}
            <MotionBox
              sx={{
                position: "absolute",
                bottom: -5,
                left: 0,
                height: 3,
                background: "linear-gradient(90deg, #3B82F6, transparent)",
                borderRadius: "2px",
              }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </MotionTypography>
        </Box>

        {!loading && !error && exchanges && exchanges.length > 0 && (
          <Chip
            label={`${exchanges.length} Exchanges`}
            sx={{
              ml: "auto",
              background: "rgba(59, 130, 246, 0.1)",
              color: "#3B82F6",
              fontWeight: 600,
              borderRadius: "12px",
              px: 1,
            }}
          />
        )}
      </Box>

      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <ExchangeSkeleton key={index} />
          ))}
        </Grid>
      ) : error ? (
        <Paper
          sx={{
            textAlign: "center",
            py: 6,
            px: 4,
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ErrorOutline sx={{ fontSize: 60, color: "#3B82F6", mb: 2 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
          >
            Oops! Something went wrong
          </Typography>
          <Typography sx={{ color: "#64748b", mb: 3 }}>
            We couldn't load the recent exchanges. Please try again later.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            sx={{
              borderRadius: "14px",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563EB, #3B82F6)",
              },
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Paper>
      ) : (
        <Grid
          container
          spacing={3}
          component={motion.div}
          variants={containerVariants}
        >
          {exchanges.map((exchange, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={exchange.id}
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <ExchangeCard exchange={exchange} />
            </Grid>
          ))}
        </Grid>
      )}
    </MotionBox>
  );
};

export default RecentExchanges;
