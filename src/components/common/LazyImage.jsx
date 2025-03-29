import React, { useState, useEffect, useRef } from "react";
import { Box, Skeleton } from "@mui/material";

const LazyImage = React.memo(
  ({
    src,
    alt,
    width = "100%",
    height = "100%",
    objectFit = "cover",
    threshold = 0.1,
    placeholderColor = "#f0f0f0",
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }, [threshold]);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      console.warn(`Failed to load image: ${src}`);
      setIsLoaded(true); // Still mark as loaded to remove skeleton
    };

    return (
      <Box
        ref={imgRef}
        position="relative"
        width={width}
        height={height}
        bgcolor={placeholderColor}
        overflow="hidden"
        {...props}
      >
        {!isLoaded && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
          />
        )}

        {isInView && (
          <img
            src={src}
            alt={alt || ""}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: "100%",
              height: "100%",
              objectFit,
              display: isLoaded ? "block" : "none",
              transition: "opacity 0.3s ease",
              opacity: isLoaded ? 1 : 0,
            }}
          />
        )}
      </Box>
    );
  }
);

export default LazyImage;
