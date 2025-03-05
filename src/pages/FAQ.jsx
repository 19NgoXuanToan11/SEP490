import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Paper,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  ExpandMore,
  Search,
  ShoppingCart,
  CompareArrows,
  Payment,
  LocalShipping,
  Security,
  Help,
  QuestionAnswer,
  ContactSupport,
  Person,
  Phone,
  AccessTime,
  Email
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPanel, setExpandedPanel] = useState(false);

  const faqCategories = [
    { id: "general", label: "General", icon: <Help /> },
    { id: "account", label: "Account & Profile", icon: <Person /> },
    { id: "buying", label: "Buying", icon: <ShoppingCart /> },
    { id: "selling", label: "Selling", icon: <LocalShipping /> },
    { id: "exchange", label: "Exchange", icon: <CompareArrows /> },
    { id: "payment", label: "Payment", icon: <Payment /> },
    { id: "security", label: "Security", icon: <Security /> },
  ];

  const faqItems = [
    {
      category: "general",
      question: "What is ReTech?",
      answer:
        "ReTech is a platform where users can buy, sell, and exchange used electronics. Our mission is to reduce electronic waste by extending the lifecycle of devices through reuse.",
    },
    {
      category: "general",
      question: "How does ReTech work?",
      answer:
        "Users can create an account, browse listings, purchase products, list their own items for sale, or propose exchanges with other users. We provide a secure platform for all transactions and communications.",
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        'Click on the "Sign Up" button in the top right corner of the page. Fill out the registration form with your details, and verify your email address to complete the process.',
    },
    {
      category: "account",
      question: "Can I change my username or email?",
      answer:
        "You can change your email address in your account settings. However, usernames cannot be changed once an account is created to maintain transaction history integrity.",
    },
    {
      category: "buying",
      question: "How do I purchase an item?",
      answer:
        'Browse the listings, select the item you want to purchase, and click "Add to Cart." Proceed to checkout, enter your shipping and payment information, and confirm your order.',
    },
    {
      category: "buying",
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, PayPal, and bank transfers. All payment processing is secure and complies with industry standards.",
    },
    {
      category: "selling",
      question: "How do I list an item for sale?",
      answer:
        'Click on "Sell" in the navigation menu, fill out the listing form with details about your item, upload photos, set a price, and publish your listing.',
    },
    {
      category: "selling",
      question: "What fees does ReTech charge for selling?",
      answer:
        "ReTech charges a 5% fee on successful sales. There are no listing fees or monthly subscription fees.",
    },
    {
      category: "exchange",
      question: "How does the exchange process work?",
      answer:
        'Find an item you want to exchange for, click "Propose Exchange," select one of your items to offer in exchange, and send the proposal. The other user can accept, decline, or counter your offer.',
    },
    {
      category: "exchange",
      question: "What happens if my exchange proposal is accepted?",
      answer:
        "Both parties will receive contact information to arrange the exchange. You can choose to meet in person or ship the items to each other.",
    },
    {
      category: "payment",
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers.",
    },
    {
      category: "payment",
      question: "What happens if I don't receive my item after payment?",
      answer:
        "We offer buyer protection. If you don't receive your item or it significantly differs from the description, you can file a claim within 14 days of the expected delivery date.",
    },
    {
      category: "security",
      question: "How does ReTech protect my personal information?",
      answer:
        "We use encryption, secure servers, and strict data access controls. We never share your personal information with third parties without your consent. See our Privacy Policy for more details.",
    },
    {
      category: "security",
      question: "What should I do if I suspect fraudulent activity?",
      answer:
        'Report it immediately through our "Report" feature or contact our support team. We investigate all reports of suspicious activity and take appropriate action.',
    },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setExpandedPanel(false);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const filteredFAQs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
          >
            Find answers to common questions about using ReTech. Can't find what
            you're looking for? Contact our support team.
          </Typography>

          <TextField
            fullWidth
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ maxWidth: 600, mx: "auto" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* FAQ Categories */}
        {!searchQuery && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {faqCategories.map((category) => (
              <Grid item xs={6} sm={4} md={3} lg={true} key={category.id}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => {
                    const firstFaqInCategory = faqItems.findIndex(
                      (item) => item.category === category.id
                    );
                    if (firstFaqInCategory !== -1) {
                      setExpandedPanel(`panel${firstFaqInCategory}`);
                      document
                        .getElementById(`panel${firstFaqInCategory}`)
                        .scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 1 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="subtitle1">{category.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {
                      faqItems.filter((item) => item.category === category.id)
                        .length
                    }{" "}
                    questions
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* FAQ Accordions */}
        <Box sx={{ mb: 6 }}>
          {searchQuery && filteredFAQs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                No results found
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We couldn't find any FAQs matching your search query.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/contact"
                startIcon={<ContactSupport />}
              >
                Contact Support
              </Button>
            </Paper>
          ) : (
            <>
              {searchQuery && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1">
                    {filteredFAQs.length}{" "}
                    {filteredFAQs.length === 1 ? "result" : "results"} found for
                    "{searchQuery}"
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setSearchQuery("")}
                    sx={{ ml: 1 }}
                  >
                    Clear Search
                  </Button>
                </Box>
              )}

              {filteredFAQs.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expandedPanel === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  id={`panel${index}`}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="subtitle1">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" paragraph>
                      {faq.answer}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Chip
                        label={
                          faqCategories.find((cat) => cat.id === faq.category)
                            ?.label || faq.category
                        }
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Was this helpful? <Button size="small">Yes</Button>
                        <Button size="small">No</Button>
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
        </Box>

        {/* Still Need Help Section */}
        <Paper
          sx={{ p: 4, bgcolor: "primary.light", color: "primary.contrastText" }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Still Need Help?
              </Typography>
              <Typography variant="body1" paragraph>
                Can't find the answer you're looking for? Our support team is
                here to help.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  to="/contact"
                  startIcon={<ContactSupport />}
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
                  }}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<QuestionAnswer />}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Live Chat
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <Email />
                  </ListItemIcon>
                  <ListItemText primary="support@retech.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText primary="+1 (555) 123-4567" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText primary="Mon-Fri, 9am-6pm EST" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default FAQ;
