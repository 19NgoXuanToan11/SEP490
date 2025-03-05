import React from "react";
import { Button, Box } from "@mui/material";
import { Google, Facebook, Twitter } from "@mui/icons-material";

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    // Here you would implement social login logic
    console.log(`Login with ${provider}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Google />}
        onClick={() => handleSocialLogin("Google")}
        sx={{
          borderColor: "#DB4437",
          color: "#DB4437",
          "&:hover": {
            borderColor: "#DB4437",
            backgroundColor: "rgba(219, 68, 55, 0.04)",
          },
        }}
      >
        Continue with Google
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Facebook />}
        onClick={() => handleSocialLogin("Facebook")}
        sx={{
          borderColor: "#4267B2",
          color: "#4267B2",
          "&:hover": {
            borderColor: "#4267B2",
            backgroundColor: "rgba(66, 103, 178, 0.04)",
          },
        }}
      >
        Continue with Facebook
      </Button>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Twitter />}
        onClick={() => handleSocialLogin("Twitter")}
        sx={{
          borderColor: "#1DA1F2",
          color: "#1DA1F2",
          "&:hover": {
            borderColor: "#1DA1F2",
            backgroundColor: "rgba(29, 161, 242, 0.04)",
          },
        }}
      >
        Continue with Twitter
      </Button>
    </Box>
  );
};

export default SocialLogin;
