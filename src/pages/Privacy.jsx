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

const Privacy = () => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last Updated: June 1, 2023
        </Typography>

        <Paper sx={{ p: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            At ReTech, we respect your privacy and are committed to protecting
            your personal data. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website or use our services.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read this Privacy Policy carefully. If you do not agree with
            the terms of this Privacy Policy, please do not access the site or
            use our services.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            2. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect several types of information from and about users of our
            website and services, including:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li">
              <Typography variant="body1">
                <strong>Personal Information:</strong> Name, email address,
                postal address, phone number, and other identifiers by which you
                may be contacted online or offline.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Account Information:</strong> Username, password,
                account preferences, and profile information.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Transaction Information:</strong> Details about
                purchases, exchanges, or other transactions you make through our
                services, including payment information.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Technical Information:</strong> Internet protocol (IP)
                address, browser type and version, time zone setting, browser
                plug-in types and versions, operating system and platform, and
                other technology on the devices you use to access our website.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Usage Information:</strong> Information about how you
                use our website and services, including browsing patterns,
                search queries, page views, and interactions with features and
                content.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            3. How We Collect Information
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information through:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li">
              <Typography variant="body1">
                <strong>Direct Interactions:</strong> Information you provide
                when you create an account, list products, make purchases,
                exchange items, communicate with other users, or contact our
                customer support.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Automated Technologies:</strong> As you navigate through
                our website, we may use cookies, web beacons, and other tracking
                technologies to collect information about your equipment,
                browsing actions, and patterns.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Third Parties:</strong> We may receive information about
                you from third parties, such as business partners, social media
                platforms, and payment processors.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            4. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect to:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li">
              <Typography variant="body1">
                Provide, maintain, and improve our services.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Process transactions and send related information, including
                confirmations, receipts, and invoices.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Communicate with you about products, services, offers,
                promotions, and events.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Respond to your comments, questions, and requests, and provide
                customer service.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Monitor and analyze trends, usage, and activities in connection
                with our services.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Detect, investigate, and prevent fraudulent transactions and
                other illegal activities.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                Personalize your experience and deliver content and product
                offerings relevant to your interests.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            5. Disclosure of Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We may disclose personal information that we collect or you provide:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li">
              <Typography variant="body1">
                <strong>To Other Users:</strong> When you list products, make
                purchases, or engage in exchanges, certain information may be
                shared with other users involved in the transaction.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>To Service Providers:</strong> We may share your
                information with third-party vendors, service providers, and
                other business partners who perform services on our behalf.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>For Legal Purposes:</strong> We may disclose your
                information to comply with legal obligations, enforce our terms
                and policies, protect our rights and safety, and respond to
                legal process or government requests.
              </Typography>
            </Box>
            <Box component="li">
              <Typography variant="body1">
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of all or a portion of our assets, your
                information may be transferred as part of the transaction.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            6. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We have implemented measures designed to secure your personal
            information from accidental loss and from unauthorized access, use,
            alteration, and disclosure. All information you provide to us is
            stored on secure servers behind firewalls.
          </Typography>
          <Typography variant="body1" paragraph>
            The safety and security of your information also depends on you.
            Where we have given you (or where you have chosen) a password for
            access to certain parts of our website, you are responsible for
            keeping this password confidential. We ask you not to share your
            password with anyone.
          </Typography>
          <Typography variant="body1" paragraph>
            Unfortunately, the transmission of information via the internet is
            not completely secure. Although we do our best to protect your
            personal information, we cannot guarantee the security of your
            personal information transmitted to our website. Any transmission of
            personal information is at your own risk.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            7. Your Choices
          </Typography>
          <Typography variant="body1" paragraph>
            You can review and change your personal information by logging into
            your account and visiting your account profile page.
          </Typography>
          <Typography variant="body1" paragraph>
            You may opt out of receiving promotional emails from us by following
            the instructions in those emails. If you opt out, we may still send
            you non-promotional emails, such as those about your account or our
            ongoing business relations.
          </Typography>
          <Typography variant="body1" paragraph>
            You can choose whether or not to allow our website to collect
            information through cookies. You can set your browser to refuse all
            or some browser cookies, or to alert you when cookies are being
            sent.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            8. Children's Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our services are not intended for children under 18 years of age. We
            do not knowingly collect personal information from children under
            18. If you are under 18, do not use or provide any information on
            this website or through any of its features. If we learn we have
            collected or received personal information from a child under 18
            without verification of parental consent, we will delete that
            information.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            9. Changes to Our Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. If we make
            material changes to how we treat our users' personal information, we
            will notify you through a notice on the website home page or by
            email.
          </Typography>
          <Typography variant="body1" paragraph>
            The date the Privacy Policy was last revised is identified at the
            top of the page. You are responsible for ensuring we have an
            up-to-date active and deliverable email address for you, and for
            periodically visiting our website and this Privacy Policy to check
            for any changes.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" gutterBottom>
            10. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            To ask questions or comment about this Privacy Policy and our
            privacy practices, contact us at:
          </Typography>
          <Typography variant="body1" paragraph>
            Email: privacy@retech.com
            <br />
            Phone: (123) 456-7890
            <br />
            Address: 123 Tech Street, San Francisco, CA 94105
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Privacy;
