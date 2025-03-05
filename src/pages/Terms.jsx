import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Terms of Service</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last Updated: June 1, 2023
        </Typography>

        <Paper sx={{ p: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to ReTech. These Terms of Service ("Terms") govern your
            access to and use of the ReTech website, services, and applications
            (collectively, the "Service"). By accessing or using the Service,
            you agree to be bound by these Terms. If you do not agree to these
            Terms, you may not access or use the Service.
          </Typography>
          <Typography variant="body1" paragraph>
            ReTech provides a platform for users to buy, sell, and exchange used
            electronics. We do not own, sell, resell, furnish, provide, repair,
            or maintain any of the products offered through our Service.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            2. Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            You must be at least 18 years old to use the Service. By using the
            Service, you represent and warrant that you are 18 years of age or
            older and that your use of the Service does not violate any
            applicable laws or regulations.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            3. Accounts
          </Typography>
          <Typography variant="body1" paragraph>
            When you create an account with us, you must provide accurate,
            complete, and current information. Failure to do so constitutes a
            breach of the Terms, which may result in immediate termination of
            your account.
          </Typography>
          <Typography variant="body1" paragraph>
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password. We encourage you to use "strong" passwords (passwords that
            use a combination of upper and lower case letters, numbers, and
            symbols) with your account. You agree not to disclose your password
            to any third party. You must notify us immediately upon becoming
            aware of any breach of security or unauthorized use of your account.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            4. User Content
          </Typography>
          <Typography variant="body1" paragraph>
            Our Service allows you to post, link, store, share and otherwise
            make available certain information, text, graphics, videos, or other
            material ("Content"). You are responsible for the Content that you
            post on or through the Service, including its legality, reliability,
            and appropriateness.
          </Typography>
          <Typography variant="body1" paragraph>
            By posting Content on or through the Service, you represent and
            warrant that: (i) the Content is yours (you own it) or you have the
            right to use it and grant us the rights and license as provided in
            these Terms, and (ii) the posting of your Content on or through the
            Service does not violate the privacy rights, publicity rights,
            copyrights, contract rights or any other rights of any person.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            5. Buying and Selling
          </Typography>
          <Typography variant="body1" paragraph>
            ReTech provides a platform for users to buy, sell, and exchange used
            electronics. When you list an item for sale, you agree to provide
            accurate and complete information about the item, including its
            condition, specifications, and any defects or issues.
          </Typography>
          <Typography variant="body1" paragraph>
            When you purchase an item, you agree to complete the transaction as
            described in the listing, including paying the full amount agreed
            upon. ReTech is not responsible for transactions that occur outside
            of our platform.
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to remove any listing that violates our
            policies or that we determine, in our sole discretion, is
            inappropriate for our platform.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            6. Exchanges
          </Typography>
          <Typography variant="body1" paragraph>
            ReTech provides a platform for users to propose and accept exchanges
            of used electronics. When you propose an exchange, you agree to
            provide accurate and complete information about the item you are
            offering, including its condition, specifications, and any defects
            or issues.
          </Typography>
          <Typography variant="body1" paragraph>
            When you accept an exchange proposal, you agree to complete the
            exchange as described in the proposal. ReTech is not responsible for
            exchanges that occur outside of our platform.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            7. Fees
          </Typography>
          <Typography variant="body1" paragraph>
            ReTech charges a 5% fee on successful sales. There are no listing
            fees or monthly subscription fees. Fees are subject to change with
            notice to users.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            8. Prohibited Activities
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to engage in any of the following prohibited
            activities:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li">
              <Typography variant="body1">
                Using the Service for any illegal purpose or in violation of any
                local, state, national, or international law.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Harassing, threatening, or intimidating other users.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Posting false, misleading, or deceptive content.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Selling counterfeit, stolen, or illegal items.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Attempting to circumvent any security features of the Service.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Using the Service to send unsolicited communications,
                promotions, or advertisements.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            9. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </Typography>
          <Typography variant="body1" paragraph>
            Upon termination, your right to use the Service will immediately
            cease. If you wish to terminate your account, you may simply
            discontinue using the Service or contact us to request account
            deletion.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            10. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall ReTech, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the Service; (ii) any conduct or content
            of any third party on the Service; (iii) any content obtained from
            the Service; and (iv) unauthorized access, use or alteration of your
            transmissions or content, whether based on warranty, contract, tort
            (including negligence) or any other legal theory, whether or not we
            have been informed of the possibility of such damage.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            11. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </Typography>
          <Typography variant="body1" paragraph>
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            12. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at
            support@retech.com.
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Terms;
