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
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Layout from "../components/layout/Layout";

const About = () => {
  const milestones = [
    { title: "2015", description: "Company founded" },
    { title: "2018", description: "First major product launch" },
    { title: "2020", description: "Expansion into international markets" },
    { title: "2022", description: "Reaching 1 million active users" },
    { title: "2024", description: "Expected IPO" },
  ];

  return (
    <Layout>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>

        {/* Milestones */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Our Journey
          </Typography>
          <List>
            {milestones.map((milestone, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" component="span">
                        {milestone.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" component="span">
                        {milestone.description}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < milestones.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Why Choose ReTech
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                {[
                  "Quality assurance for all listed products",
                  "Secure payment processing and user protection",
                  "Verified user profiles to build trust",
                  "Detailed product descriptions and condition ratings",
                  "Easy-to-use platform for buying, selling, and exchanging",
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                {[
                  "Community-driven ratings and reviews",
                  "Dedicated customer support team",
                  "Environmentally friendly approach to technology",
                  "Competitive pricing compared to new products",
                  "Regular platform updates based on user feedback",
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                question:
                  "How does ReTech ensure the quality of listed products?",
                answer:
                  "All sellers are required to provide detailed information about the condition of their products, including photos. Our community-driven review system also helps maintain quality standards, as sellers with poor ratings are less likely to make successful sales.",
              },
              {
                question: "Is it safe to buy used electronics on ReTech?",
                answer:
                  "Yes, we have implemented several security measures to ensure safe transactions. We verify user identities, provide secure payment processing, and offer buyer protection policies. Additionally, our review system helps you identify trustworthy sellers.",
              },
              {
                question: "How does the exchange process work?",
                answer:
                  "Users can list items they want to exchange and specify what they're looking for in return. When a potential match is found, both parties can communicate through our platform to negotiate the terms. Once an agreement is reached, they can arrange the exchange.",
              },
              {
                question:
                  "What happens if I receive a product that doesn't match the description?",
                answer:
                  "If you receive a product that significantly differs from its description, you can report the issue to our customer support team within 48 hours of receipt. We'll review the case and may offer a refund or other resolution depending on the circumstances.",
              },
              {
                question: "Can I sell any type of electronic device on ReTech?",
                answer:
                  "We accept most consumer electronics in working condition. This includes smartphones, laptops, tablets, cameras, audio equipment, gaming consoles, and accessories. However, we do not allow the sale of counterfeit products, stolen goods, or items that violate our terms of service.",
              },
              {
                question:
                  "How does ReTech contribute to environmental sustainability?",
                answer:
                  "By facilitating the reuse of electronic devices, we help extend their lifecycle and reduce electronic waste. Each device that finds a new home through our platform is one less device in a landfill and one less new device that needs to be manufactured.",
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    {faq.question}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default About;
