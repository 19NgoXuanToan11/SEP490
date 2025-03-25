import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Hiệu ứng cho dấu chấm đang nhập
const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.8;
  }
`;

const TypingIndicator = ({ user }) => {
  return (
    <Box
      sx={{
    display: "flex",
        alignItems: "center",
        ml: 2,
        mb: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" mr={1}>
        {user.name} is typing
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "grey.400",
              mx: 0.25,
              animation: `${pulse} 1s infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TypingIndicator;
