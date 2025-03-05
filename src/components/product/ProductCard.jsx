import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FavoriteBorder, Favorite, CompareArrows } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={
            product.image || "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.name}
        />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            color={isFavorite ? "error" : "default"}
            size="small"
            sx={{ minWidth: "auto", borderRadius: "50%", p: 1 }}
            onClick={toggleFavorite}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </Button>

          {product.exchangeAvailable && (
            <Button
              variant="contained"
              color="info"
              size="small"
              sx={{ minWidth: "auto", borderRadius: "50%", p: 1 }}
            >
              <CompareArrows />
            </Button>
          )}
        </Box>

        {product.condition && (
          <Chip
            label={product.condition}
            color={
              product.condition === "New"
                ? "success"
                : product.condition === "Like New"
                ? "primary"
                : product.condition === "Good"
                ? "info"
                : product.condition === "Fair"
                ? "warning"
                : "default"
            }
            sx={{ position: "absolute", bottom: 10, left: 10 }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount || 0})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description?.substring(0, 100)}
          {product.description?.length > 100 ? "..." : ""}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${product.price?.toFixed(2)}
          </Typography>

          {product.originalPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ${product.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/products/${product.id}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
