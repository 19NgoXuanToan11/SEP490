import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Grid,
  Container,
  Divider,
  Avatar,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import {
  CheckCircle,
  Timeline,
  Business,
  People,
  Lightbulb,
  Public,
  EmojiEvents,
  ArrowForward,
  Mail,
} from "@mui/icons-material";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const About = () => {
  const milestones = [
    { title: "2015", description: "Company founded", icon: Business },
    {
      title: "2018",
      description: "First major product launch",
      icon: Lightbulb,
    },
    {
      title: "2020",
      description: "Expansion into international markets",
      icon: Public,
    },
    {
      title: "2022",
      description: "Reaching 1 million active users",
      icon: People,
    },
    { title: "2024", description: "Expected IPO", icon: EmojiEvents },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push the boundaries of what's possible in tech recycling",
      icon: Lightbulb,
      color: "#3B82F6",
    },
    {
      title: "Sustainability",
      description:
        "Every exchange reduces e-waste and extends the lifecycle of technology",
      icon: Public,
      color: "#10B981",
    },
    {
      title: "Community",
      description:
        "Building connections between tech enthusiasts around the world",
      icon: People,
      color: "#F59E0B",
    },
    {
      title: "Quality",
      description: "Ensuring every exchanged product meets our high standards",
      icon: CheckCircle,
      color: "#8B5CF6",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Tech enthusiast with 15+ years of experience in the industry",
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former Google engineer passionate about sustainable technology",
    },
    {
      name: "Michael Brown",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      bio: "Logistics expert with a background in supply chain management",
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      bio: "Creative strategist focused on building community-driven brands",
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(135deg, #1E293B, #0F172A)",
          color: "white",
          pt: 12,
          pb: 10,
          overflow: "hidden",
        }}
      >
        {/* Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background:
              "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.5) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.5) 0%, transparent 40%)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "#3B82F6",
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 1,
                    display: "block",
                  }}
                >
                  ABOUT RETECH
                </Typography>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: "linear-gradient(90deg, #fff, #94A3B8)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textFillColor: "transparent",
                  }}
                >
                  Revolutionizing Tech Exchange
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#CBD5E1",
                    fontWeight: 400,
                    mb: 4,
                    maxWidth: "90%",
                    lineHeight: 1.6,
                  }}
                >
                  We're on a mission to create a sustainable tech ecosystem
                  where devices find new homes instead of landfills. Join our
                  community of tech enthusiasts making a difference.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    background: "linear-gradient(90deg, #3B82F6, #2563EB)",
                    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(90deg, #2563EB, #1D4ED8)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 30px rgba(37, 99, 235, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Join Our Community
                </Button>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={5}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Tech Exchange"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "24px",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                    border: "4px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                sx={{
                  width: "100%",
                  borderRadius: "24px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
              />
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionBox
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#3B82F6",
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 1,
                  display: "block",
                }}
              >
                OUR STORY
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "#1E293B",
                }}
              >
                From Idea to Global Platform
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                ReTech began in 2015 with a simple idea: what if we could create
                a platform where tech enthusiasts could exchange their devices
                instead of discarding them? Our founder, Alex Johnson, noticed
                the growing problem of e-waste and saw an opportunity to build a
                community-driven solution.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                }}
              >
                Today, we've grown into a global platform with users in over 30
                countries, facilitating thousands of exchanges every month. Our
                mission remains the same: to extend the lifecycle of technology
                and reduce e-waste while building a community of like-minded
                individuals.
              </Typography>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#3B82F6",
                    mb: 1,
                  }}
                >
                  Our Impact
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1E293B" }}
                    >
                      30+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>
                      Countries
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1E293B" }}
                    >
                      1M+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>
                      Users
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1E293B" }}
                    >
                      500K+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>
                      Exchanges
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "#1E293B" }}
                    >
                      2K+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>
                      Tons of e-waste saved
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values Section */}
      <Box
        sx={{ py: 10, background: "linear-gradient(180deg, #F8FAFC, #F1F5F9)" }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#3B82F6",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: "block",
              }}
            >
              OUR VALUES
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#1E293B",
              }}
            >
              What Drives Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              Our core values shape everything we do, from product development
              to community engagement. They're the foundation of our culture and
              guide our decision-making process.
            </Typography>
          </MotionBox>

          <Grid
            container
            spacing={3}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionCard
                  variants={fadeIn}
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${value.color}, ${value.color}CC)`,
                        boxShadow: `0 8px 20px ${value.color}33`,
                        mb: 3,
                      }}
                    >
                      <value.icon sx={{ color: "white", fontSize: 30 }} />
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "#1E293B",
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.7,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Milestones Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          sx={{ textAlign: "center", mb: 6 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#3B82F6",
              fontWeight: 600,
              letterSpacing: 2,
              mb: 1,
              display: "block",
            }}
          >
            OUR JOURNEY
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#1E293B",
            }}
          >
            Key Milestones
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            Our growth journey has been filled with exciting achievements and
            challenges. Here are some of the key moments that have shaped our
            company.
          </Typography>
        </MotionBox>

        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: { xs: "20px", md: "50%" },
              width: "4px",
              background: "linear-gradient(180deg, #3B82F6, #1E40AF)",
              transform: { md: "translateX(-2px)" },
              borderRadius: "4px",
              zIndex: 0,
            },
          }}
        >
          {milestones.map((milestone, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                mb: 5,
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  pb: { xs: 2, md: 0 },
                  pr: { md: index % 2 === 0 ? 4 : 0 },
                  pl: { md: index % 2 === 0 ? 0 : 4 },
                  textAlign: {
                    xs: "left",
                    md: index % 2 === 0 ? "right" : "left",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#3B82F6",
                    mb: 1,
                  }}
                >
                  {milestone.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#475569",
                    fontSize: "1.1rem",
                  }}
                >
                  {milestone.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: { xs: "absolute", md: "static" },
                  left: { xs: 0 },
                  top: { xs: 0 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 40, md: 60 },
                    height: { xs: 40, md: 60 },
                    borderRadius: "50%",
                    background: "white",
                    border: "4px solid #3B82F6",
                    boxShadow:
                      "0 0 0 4px rgba(59, 130, 246, 0.3), 0 10px 20px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <milestone.icon
                    sx={{ color: "#3B82F6", fontSize: { xs: 20, md: 28 } }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
          ))}
        </MotionBox>
      </Container>

      {/* Team Section */}
      <Box
        sx={{ py: 10, background: "linear-gradient(135deg, #1E293B, #0F172A)" }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeIn}
            sx={{ textAlign: "center", mb: 6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#3B82F6",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 1,
                display: "block",
              }}
            >
              OUR TEAM
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "white",
              }}
            >
              Meet the People Behind ReTech
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#CBD5E1",
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              Our diverse team brings together expertise from technology,
              sustainability, and community building to create a platform that
              makes a difference.
            </Typography>
          </MotionBox>

          <Grid
            container
            spacing={4}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionCard
                  variants={fadeIn}
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", pt: "100%" }}>
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: "white",
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#3B82F6",
                        mb: 2,
                        fontWeight: 600,
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#94A3B8",
                        lineHeight: 1.6,
                      }}
                    >
                      {member.bio}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <MotionPaper
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "white",
            }}
          >
            Ready to Join Our Community?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
              lineHeight: 1.8,
              fontSize: "1.1rem",
            }}
          >
            Start exchanging your tech devices today and become part of a global
            movement to reduce e-waste and extend the lifecycle of technology.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.5,
                background: "white",
                color: "#2563EB",
                fontWeight: 600,
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Mail />}
              sx={{
                borderRadius: "12px",
                px: 4,
                py: 1.5,
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </MotionPaper>
      </Container>
    </Layout>
  );
};

export default About;
