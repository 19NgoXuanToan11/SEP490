import React from "react";
import { Grid, Paper, Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{
            transform: "scale(1.01)",
            transformOrigin: "center",
          }}
        />
        <Box sx={{ p: 3 }}>
          <Skeleton
            variant="text"
            width="70%"
            height={30}
            sx={{
              borderRadius: "4px",
            }}
          />
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            sx={{
              mb: 1,
              borderRadius: "4px",
            }}
          />
          <Skeleton
            variant="text"p
            width="100%"
            height={20}
            sx={{
              borderRadius: "4px",
            }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{
              mb: 1,
              borderRadius: "4px",
            }}
          />
          <Box sx={{ display: "flex", mb: 1 }}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={24}
              sx={{ borderRadius: "12px", mr: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={60}
              height={24}
              sx={{ borderRadius: "12px" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Skeleton
              variant="rectangular"
              width={100}
              height={20}
              sx={{
                borderRadius: "4px",
              }}
            />
          </Box>
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            sx={{
              borderRadius: "4px",
            }}
          />
        </Box>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Skeleton
            variant="rectangular"
            width={100}
            height={36}
            sx={{ borderRadius: "18px" }}
          />
          <Box sx={{ display: "flex" }}>
            <Skeleton
              variant="circular"
              width={36}
              height={36}
              sx={{ mr: 1 }}
            />
            <Skeleton variant="circular" width={36} height={36} />
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProductSkeleton;
